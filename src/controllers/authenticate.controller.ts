import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import users from '../data/auth.json';

const AuthenticateController = {
    async authenticateToken(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, username, firstname, lastname } = req.body;

            const user = {
                email: email,
                username: username,
                firstname: firstname,
                lastname: lastname,
                password: password,
            };

            const matchingUser = users.find(
                (u) =>
                    u.username === user.username &&
                    u.password === user.password,
            );

            if (!matchingUser) {
                return res.status(401).json({
                    status: 'error',
                    message:
                        'The username and password do not match. Please try again.',
                });
            }

            const expiresIn = '24h'; // Set the expiration time
            const token = jwt.sign(
                { user },
                config.tokenSecret as unknown as string,
                { expiresIn },
            );
            const refreshToken = jwt.sign(
                { user },
                config.tokenSecretRefresh as unknown as string,
                { expiresIn: '10h' },
            );

            return res.json({
                status: 'success',
                data: { ...user, token, refreshToken },
                message: 'User authenticated successfully',
            });
        } catch (err) {
            return next(err);
        }
    },
    async checkAuthenticate(req: any, res: any) {
        try {
            res.status(200).json({
                message: 'Check token successfully',
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};
export default AuthenticateController;
