import { Request, Response } from 'express';
import config from '../config';
import axios from 'axios';
import FormData from 'form-data';
import { axiosHandleResponse } from '../helpers/axiosHandleResponse.helper';
import { axiosHandleError } from '../helpers/axiosHandleError.helper';
import { setCommonErrorResponse } from '../interfaces/commonErrorResponse.interface';
const apiService = config.backApiBackend;

const AuthController = {
    async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const postData = new FormData();
            postData.append('username', `${username}`);
            postData.append('password', `${password}`);

            axios
                .post(`${apiService}/auth/login`, postData, {
                    headers: postData.getHeaders(),
                })
                .then((response) => {
                    axiosHandleResponse(res, response);
                })
                .catch(function (error) {
                    axiosHandleError(error, res);
                });
        } catch (error) {
            const commonErrorResponse = setCommonErrorResponse(
                500,
                'Internal Server Error',
            );
            res.status(commonErrorResponse.status).json(commonErrorResponse);
        }
    },

    async logout(req: Request, res: Response) {
        try {
            axios
                .get(`${apiService}/auth/logout`)
                .then((response) => {
                    res.send(response.data);
                })
                .catch((error) => {
                    res.send(error);
                });
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },
    async getToken(req: Request, res: Response) {
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
                    res.send(response.data);
                })
                .catch((error) => {
                    res.status(error.response.status).json(error.response.data);
                });
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },
    async checkToken(req: Request, res: Response) {
        try {
            const token = req.token;

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            await axios
                .get(`${apiService}/auth/check_token`, {
                    headers,
                })
                .then((response) => {
                    res.send(response.data);
                })
                .catch((error) => {
                    res.status(error.response.status).json(error.response.data);
                });
        } catch (error) {
            const commonErrorResponse = setCommonErrorResponse(
                500,
                'Internal Server Error',
            );
            res.status(500).json(commonErrorResponse);
        }
    },
};
export default AuthController;
