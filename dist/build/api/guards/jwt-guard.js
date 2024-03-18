"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtGuard = void 0;
const winston_logger_1 = __importDefault(require("../../utils/winston-logger"));
const supabase_1 = require("../../supabase");
const SUPABASE_ANON_PUBLIC = process.env.SUPABASE_ANON_PUBLIC || '';
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE || '';
const NODE_ENV = process.env.NODE_ENV || 'development';
const jwtGuard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (NODE_ENV === 'development') {
            winston_logger_1.default.log('info', 'dashboardApi-jwtGuard() | SUCCESS');
            next();
            return req;
        }
        let auth = req.headers.authorization || '';
        if (auth) {
            const jwt = auth.split(' ')[1];
            const { data: user, error } = yield supabase_1.supabase.auth.getUser(jwt);
            if (error) {
                winston_logger_1.default.log('error', 'dashboardApi-jwtGuard() | ERROR | ' + error.message);
                error.status
                    ? res.status(error.status).send(error)
                    : res.status(500).send(error);
            }
            else {
                winston_logger_1.default.log('info', 'dashboardApi-jwtGuard() | SUCCESS');
                req.body.user = user;
                next();
                return req;
            }
        }
        else {
            const errorMsg = 'Forbidden - no jwt';
            winston_logger_1.default.log('error', 'dashboardApi-jwtGuard | Error | ' + errorMsg);
            return res.status(403).send({ error: errorMsg });
        }
    }
    catch (e) {
        if (e instanceof Error) {
            const errorMsg = String(e.message);
            winston_logger_1.default.log('error', 'dashboardApi-jwtGuard | Error | ' + errorMsg);
            return res.status(500).send({ error: errorMsg });
        }
        else {
            const errorMsg = String(e);
            winston_logger_1.default.log('error', 'dashboardApi-jwtGuard | Error | ' + errorMsg);
            return res.status(500).send({ error: errorMsg });
        }
    }
});
exports.jwtGuard = jwtGuard;
