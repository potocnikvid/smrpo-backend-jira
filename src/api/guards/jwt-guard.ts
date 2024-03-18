import { AuthService } from '../services/auth.service';
import logger from '../../utils/winston-logger';
import type { Request, Response, NextFunction, RequestHandler } from "express";
import { supabase } from '../../supabase';
import { supabaseAdmin } from '../../supabase';
import { AuthResponse } from '@supabase/supabase-js';

const SUPABASE_ANON_PUBLIC = process.env.SUPABASE_ANON_PUBLIC || ''
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE || ''
const NODE_ENV = process.env.NODE_ENV || 'development'

export const jwtGuard: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (NODE_ENV === 'development') {
            logger.log('info', 'dashboardApi-jwtGuard() | SUCCESS')
            next()
            return req
        }
        let auth: string = req.headers.authorization || '';
        if (auth) {
            const jwt = auth.split(' ')[1];
            const { data: user, error } = await supabase.auth.getUser(jwt);
            if (error) {
                logger.log('error', 'dashboardApi-jwtGuard() | ERROR | ' + error.message)
                error.status 
                    ? res.status(error.status).send(error)
                    : res.status(500).send(error)
            } else {
                logger.log('info', 'dashboardApi-jwtGuard() | SUCCESS')
                req.body.user = user
                next()
                return req
            }
        } else {
            const errorMsg = 'Forbidden - no jwt'
            logger.log('error', 'dashboardApi-jwtGuard | Error | ' + errorMsg) 
            return res.status(403).send({error: errorMsg})
        }
    } catch (e) {
        if (e instanceof Error) {
            const errorMsg = String(e.message)
            logger.log('error', 'dashboardApi-jwtGuard | Error | ' + errorMsg)
            return res.status(500).send({error: errorMsg})
        } else {   
            const errorMsg = String(e)
            logger.log('error', 'dashboardApi-jwtGuard | Error | ' + errorMsg)
            return res.status(500).send({error: errorMsg})
        }
    }
}