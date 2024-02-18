import { Request, Response } from 'express';
import {loginSchema, registerSchema, createPropertySchema, emailUserSchema, updatePropertySchema} from './validation_schema';
export function loginMiddleware(req: Request, res: Response, next: () => void) {
    validateMiddleware(loginSchema)(req, res, next);
}

export function registerMiddleware(req: Request, res: Response, next: () => void){
    validateMiddleware(registerSchema)(req, res, next);
}
export function createPropertyMiddleware(req: Request, res: Response, next: () => void) {
    validateMiddleware(createPropertySchema)(req, res, next);
}
export function isEmailValidMiddleware(req: Request, res: Response, next: () => void){
    validateMiddleware(emailUserSchema)(req, res, next);
}
export function updatePropertyMiddleware(req: Request, res: Response, next: () => void){
    validateMiddleware(updatePropertySchema)(req, res, next);
}
function validateMiddleware(schema: any) {

    return (req: Request, res: Response, next: () => void) => {
        const {error, value} = schema.validate(req.body);
        if (error) {
            return res.status(400).json({message: 'Failed', error: error.details[0].message});
        }
        next();
    }
}
