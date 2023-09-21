import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
// import ExampleModel from '../models/example.model';
import axios from 'axios';
import FormData from 'form-data';
import config from '../config';
import database from '../config/database';
import { DemoCrudOne, IModelDemoCrudOne } from '../models/demoCrudOne.model';
import mongoose from 'mongoose';
import users from '../data/auth.json';
const apiService = config.backApiBackend;
const ExampleController = {
    async login(req: any, res: any) {
        try {
            const user = req.body;
            const postData = new FormData();
            postData.append('username', `${user.username}`);
            postData.append('password', `${user.password}`);
            axios
                .post(`${apiService}/auth/login`, postData, {
                    headers: postData.getHeaders(),
                })
                .then((response: any) => {
                    res.send(response.data);
                })
                .catch((error: any) => {
                    res.send({ error });
                });
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },
    async logout(req: any, res: any) {
        try {
            axios
                .get(`${apiService}/auth/logout`)
                .then((response) => {
                    res.send(response.data);
                })
                .catch((error) => {
                    console.error(error);
                    res.send(error);
                });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
    async getToken(req: any, res: any) {
        try {
            const { clientKey, clientSecret } = req.body;
            const postData = new FormData();
            postData.append('clientKey', `${clientKey}`);
            postData.append('clientSecret', `${clientSecret}`);
            axios
                .post(`${apiService}/auth/get_token`, postData, {
                    headers: postData.getHeaders(),
                })
                .then((response) => {
                    console.log(response.data);
                    res.send(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
    async createExample(req: any, res: any) {
        try {
            console.log('create succcess');
            res.send({ ddd: 'Example created successfully' });
            return;
            // const exampleData = await ExampleModel.findAll();
            // res.json(exampleData);
        } catch (error) {
            // res.status(201).json({ message: 'Example created successfully' });
        }
    },
    async updateExample(req: any, res: any) {
        const id = req.params.id;
        // const { name, description } = req.body;
        console.log(req.body);
        // res.send({"id":id})
        try {
            res.status(200).json({ message: 'Example updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    async deleteExample(req: any, res: any) {
        try {
            const { id } = req.params;
            console.log(id);
            res.status(200).json({ message: 'Example deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    async authenticateToken(req: Request, res: Response, next: NextFunction) {
        try {
            const session = req.session as { token?: string };

            console.log(session.token);

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

            const expiresIn = '1h'; // Set the expiration time
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
    async testMiddleware(req: any, res: any) {
        try {
            const { id } = req.params;
            console.log(id);
            res.status(200).json({
                message: 'Test auth middleware successfully',
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};

export default ExampleController;
