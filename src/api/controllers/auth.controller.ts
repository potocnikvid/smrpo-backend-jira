import logger from '../../utils/winston-logger';
import e, { Request, Response } from 'express'
import { AuthService } from '../services/auth.service';
import { supabase } from '../../supabase';
import { supabaseAdmin } from '../../supabase';
import { AuthResponse } from '@supabase/supabase-js';
import { UserLoginResponse, UserSignupResponse } from '../models/auth.model';
import { UserService } from '../services/user.service';
import { UserModel } from '../models/user.model';

export class AuthController {
    public static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
              });

            if (error) {
                logger.log('error', 'api-AuthController-login() | ERROR | ' + error.message)
                error.status 
                    ? res.status(error.status).send(error)
                    : res.status(500).send(error)
            } else {
                const authUser = await UserService.getUserByEmail(email);
                if (authUser && data?.session?.access_token && data?.session?.refresh_token) {
                    const userLoginResponse: UserLoginResponse = {
                        user: authUser,
                        access_token: data.session.access_token,
                        refresh_token: data.session.refresh_token,
                    }
    
                    logger.log('info', 'api-AuthController-login() | SUCCESS')
                    res.status(200).send(userLoginResponse)   
                } else {
                    logger.log('error', 'api-AuthController-login() | ERROR | User not found')
                    res.status(404).send({error: 'User not found'})
                }
            }
  
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-AuthController-login() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async signup(req: Request, res: Response) {
        try {
            const { email, password, username, first_name, last_name, is_admin } = req.body;

            const allUsers = await UserService.getUsers();
            const userExists = allUsers?.find((user: UserModel) => user.email === email || user.username === username);

            if (userExists) {
                logger.log('error', 'api-AuthController-signup() | ERROR | User already exists')
                res.status(400).send({error: 'User already exists'})
                return;
            }

            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
              });

            if (error) {
                logger.log('error', 'api-AuthController-signup() | ERROR | ' + error.message)
                error.status 
                    ? res.status(error.status).send(error)
                    : res.status(500).send(error)
            } else {
                const authUser = await UserService.getUserByEmail(email);
                if (authUser && data?.session?.access_token && data?.session?.refresh_token) {
                    const updatedUser = await UserService.updateUser(authUser.id, username, first_name, last_name);
                    const updatedUserWithRole = await UserService.setRole(authUser.id, is_admin);
                    if (!updatedUser || !updatedUserWithRole) {
                        logger.log('error', 'api-AuthController-signup() | ERROR | User not updated')
                        res.status(500).send({error: 'User not updated'})
                        return;
                    }
                    const userSignupResponse: UserSignupResponse = {
                        user: updatedUserWithRole,
                        access_token: data.session.access_token,
                        refresh_token: data.session.refresh_token,
                    }
                    logger.log('info', 'api-AuthController-signup() | SUCCESS')
                    res.status(200).send(userSignupResponse)   
                } else {
                    logger.log('error', 'api-AuthController-signup() | ERROR | User not found')
                    res.status(404).send({error: 'User not found'})
                }
            }

        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-AuthController-signup() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async refreshToken(req: Request, res: Response) {
        try {
            const { refresh_token } = req.body;
            const { data, error } = await supabase.auth.refreshSession({ refresh_token })
            const { session, user } = data

            if (error) {
                logger.log('error', 'api-AuthController-refreshToken() | ERROR | ' + error.message)
                error.status 
                    ? res.status(error.status).send(error)
                    : res.status(500).send(error)
            } else if (user?.email) {
                const authUser = await UserService.getUserByEmail(user?.email);
                if (authUser && session?.access_token && session?.refresh_token) {
                    const userSignupResponse: UserSignupResponse = {
                        user: authUser,
                        access_token: session.access_token,
                        refresh_token: session.refresh_token,
                    }
                    logger.log('info', 'api-AuthController-refreshToken() | SUCCESS')
                    res.status(200).send(userSignupResponse)   
                } else {
                    logger.log('error', 'api-AuthController-refreshToken() | ERROR | User not found')
                    res.status(404).send({error: 'User not found'})
                }
            } else {
                logger.log('error', 'api-AuthController-refreshToken() | ERROR | User not found')
                res.status(404).send({error: 'User not found'})
            }

        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-AuthController-refreshToken() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async changePasswordAdmin(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { password, confirmPassword } = req.body;
            const user = await UserService.getUserById(id);

            if (user) {
                // Invoke an edge function called reset-password
                const { data, error } = await supabase.functions.invoke('reset-password', {
                    body: JSON.stringify({
                        userId: id,
                        password: password,
                        confirmPassword: confirmPassword
                    })
                });           

                if (error) {
                    logger.log('error', 'api-AuthController-changePasswordAdmin() | ERROR | ' + error.message)
                    error.status 
                        ? res.status(error.status).send(error)
                        : res.status(500).send(error)
                } else {
                    logger.log('info', 'api-AuthController-changePasswordAdmin() | SUCCESS')
                    res.status(200).send(data)
                }
            } else {
                res.status(404).send({error: 'User not found'});
            }

        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-AuthController-changePasswordAdmin() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async changePassword(req: Request, res: Response) {
        try {
            const { password, confirmPassword } = req.body;
            const supabaseUser = await AuthService.authenticateUser(req.headers.authorization || '');
            if (supabaseUser && supabaseUser.email) {
                const user = await UserService.getUserByEmail(supabaseUser.email);
                if (user) {
                    // Invoke an edge function called reset-password
                    const { data, error } = await supabase.functions.invoke('reset-password', {
                        body: JSON.stringify({
                            userId: user.id,
                            password: password,
                            confirmPassword: confirmPassword
                        })
                    });           

                    if (error) {
                        logger.log('error', 'api-AuthController-changePassword() | ERROR | ' + error.message)
                        error.status 
                            ? res.status(error.status).send(error)
                            : res.status(500).send(error)
                    } else {
                        logger.log('info', 'api-AuthController-changePassword() | SUCCESS')
                        res.status(200).send(data)
                    } 
                } else {
                    logger.log('error', 'api-AuthController-changePassword() | ERROR | User not found')
                    res.status(404).send({error: 'User not found'});
                }
            } else {
                logger.log('error', 'api-AuthController-changePassword() | ERROR | Forbidden')
                res.status(403).send({error: 'Forbidden'});
            }

        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-AuthController-changePassword() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }

    public static async deleteUserAdmin(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await UserService.getUserById(id);

            if (user) {
                // Invoke an edge function called reset-password
                const { data, error } = await supabase.functions.invoke('delete-user', {
                    body: JSON.stringify({
                        userId: id
                    })
                });           

                if (error) {
                    logger.log('error', 'api-AuthController-deleteUserAdmin() | ERROR | ' + error.message)
                    error.status 
                        ? res.status(error.status).send(error)
                        : res.status(500).send(error)
                } else {
                    logger.log('info', 'api-AuthController-deleteUserAdmin() | SUCCESS')
                    res.status(200).send(data)
                }
            } else {
                res.status(404).send({error: 'User not found'});
            }

        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-AuthController-deleteUserAdmin() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async deleteUser(req: Request, res: Response) {
        try {
            logger.log('info', 'api-AuthController-deleteUser() | START' + req.headers['Authorization'] || '')
            const supabaseUser = await AuthService.authenticateUser(req.headers.authorization || '');
            if (supabaseUser && supabaseUser.email) {
                const user = await UserService.getUserByEmail(supabaseUser.email);
                if (user) {
                    // Invoke an edge function called reset-password
                    const { data, error } = await supabase.functions.invoke('delete-user', {
                        body: JSON.stringify({
                            userId: user.id
                        })
                    });

                    if (error) {
                        logger.log('error', 'api-AuthController-deleteUser() | ERROR | ' + error.message)
                        error.status 
                            ? res.status(error.status).send(error)
                            : res.status(500).send(error)
                    } else {
                        logger.log('info', 'api-AuthController-deleteUser() | SUCCESS')
                        res.status(200).send(data)
                    }      
                } else {
                    logger.log('error', 'api-AuthController-deleteUser() | ERROR | User not found')
                    res.status(404).send({error: 'User not found'});
                }
            } else {
                logger.log('error', 'api-AuthController-deleteUser() | ERROR | Forbidden')
                res.status(403).send({error: 'Forbidden'});
            }

        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-AuthController-deleteUser() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }

    public static async logout(req: Request, res: Response) {
        try {
            const { access_token } = req.body;
            const { error } = await supabase.auth.signOut(access_token);
            if (error) {
                logger.log('error', 'api-AuthController-logout() | ERROR | ' + error.message)
                error.status 
                    ? res.status(error.status).send(error)
                    : res.status(500).send(error)
            } else {
                logger.log('info', 'api-AuthController-logout() | SUCCESS')
                res.status(200).send()
            }

        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-AuthController-logout() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }

    public static async authenticateUser(req: Request, res: Response) {
        try {
            let auth: string = req.headers.authorization || '';
            const jwt = auth.split(' ')[1];

            const supabaseUser = await AuthService.authenticateUser(jwt);

            if (supabaseUser?.email) {
                const user = await UserService.getUserByEmail(supabaseUser.email);
                if (user) {
                    logger.log('info', 'api-AuthController-authenticateUser() | SUCCESS')
                    res.status(200).send({user: user, supabaseUser: supabaseUser})
                } else {
                    logger.log('error', 'api-AuthController-authenticateUser() | ERROR | User not found')
                    res.status(404).send({error: 'User not found'})
                }
            } else {
                logger.log('error', 'api-AuthController-authenticateUser() | ERROR | User not found')
                res.status(404).send({error: 'User not found'})
                return;
            }

        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-AuthController-authenticateUser() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
}