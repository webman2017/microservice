import { Request, Response, NextFunction } from 'express';
import { setCommonErrorResponse } from '../interfaces/commonErrorResponse.interface';

declare module 'express' {
    interface Request {
        token?: string;
    }
}

const authTokenMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        const commonErrorResponse = setCommonErrorResponse(
            400,
            'Please input token in header',
        );
        return res.status(400).json(commonErrorResponse);
    }

    const [bearer, token] = authHeader.split(' ');

    if (!token || bearer.toLowerCase() !== 'bearer') {
        const commonErrorResponse = setCommonErrorResponse(
            400,
            'Please input valid token in header',
        );
        return res.status(400).json(commonErrorResponse);
    }

    req.token = token;

    next();
};

export default authTokenMiddleware;
