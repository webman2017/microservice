import { Request, Response, NextFunction } from 'express';
import { tokenBackendApi } from '../helpers/tokenBackendApi.helper';
import { setCommonErrorResponse } from '../interfaces/commonErrorResponse.interface';

declare module 'express' {
    interface Request {
        token_backend?: string;
    }
}

const authTokenBackendMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const token = await tokenBackendApi();
        if (!token) {
            const commonErrorResponse = setCommonErrorResponse(
                500,
                'Token not available',
            );
            return res
                .status(commonErrorResponse.status)
                .json(commonErrorResponse);
        }
        req.token_backend = token;
        next();
    } catch (error) {
        const commonErrorResponse = setCommonErrorResponse(
            500,
            'Internal Server Error',
        );
        res.status(commonErrorResponse.status).json(commonErrorResponse);
    }
};

export default authTokenBackendMiddleware;
