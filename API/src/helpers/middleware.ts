import { Request, Response } from 'express';
import {loginSchema, registerSchema, createPropertySchema, emailUserSchema} from './validation_schema';
import { func } from 'joi';
export function loginMiddleware() {
    validateMiddleware(loginSchema);
}

export function registerMiddleware() {
    validateMiddleware(registerSchema);
}
export function createPropertyMiddleware() {
    validateMiddleware(createPropertySchema);
}
export function isEmailValidMiddleware(){
    validateMiddleware(emailUserSchema);
}
export function updatePropertyMiddleware(){
    validateMiddleware(createPropertySchema);
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