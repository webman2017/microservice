import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi, { Schema } from 'joi';

function validateMiddleware(schema: Schema): RequestHandler {
    return async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        const validationOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        };

        try {
            console.log(req.params);
            if (
                req.params &&
                Object.keys(req.params).length > 0 &&
                req.params.toString() == ','
            ) {
                req.body = req.params;
            }
            const value = await schema.validateAsync(
                req.body,
                validationOptions,
            );
            req.body = value;
            next();
        } catch (e: any) {
            const errors: string[] = [];
            e.details.forEach(
                (error: Joi.ValidationErrorItem, index: number) => {
                    console.log(e.details[index].context.label);
                    console.log({ message: e.details[index].message });
                    errors.push(error.message.replace(/"/g, ''));
                },
            );
            res.status(400).send({ errors: errors });
        }
    };
}

export default validateMiddleware;
