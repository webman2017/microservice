/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import config from '../config';
import axios from 'axios';
import { tokenBackendApi } from '../helpers/tokenBackendApi.helper';
const apiService = 'https://dpis-md.aitproject.com/oapi/login';

const aboutController = {
    async login(req: Request, res: Response) {
        try {
            const postData = req.body;
            axios
                .post(`${apiService}`, postData)
                .then((response: any) => {
                    res.send(response.data);
                })
                .catch((error: any) => {
                    res.status(error.response.status).json(error.response.data);
                });
        } catch (error) {}
    },

    async getsubmenu(req: Request, res: Response) {
        try {
            const token = await tokenBackendApi();

            if (!token) {
                return res.status(404).json({ error: 'Token not available' });
            }

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const aboutId = req.params.aboutId;
            const apiEndpoint = `${apiService}/aboutus/get?about_id=${aboutId}`;

            axios
                .get(apiEndpoint, { headers })
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
    async mainmenu(req: Request, res: Response) {
        try {
            const token = await tokenBackendApi();

            if (!token) {
                return res.status(404).json({ error: 'Token not available' });
            }

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const apiEndpoint = `${apiService}/aboutus/mainmenu`;

            axios
                .get(apiEndpoint, { headers })
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
    async updateView(req: Request, res: Response, next: NextFunction) {
        try {
            const token = await tokenBackendApi();

            if (!token) {
                return res.status(404).json({ error: 'Token not available' });
            }

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const data = JSON.stringify(req.body);

            axios
                .post(`${apiService}/aboutus/views`, data, {
                    headers,
                })
                .then((response: any) => {
                    res.send(response.data);
                })
                .catch((error: any) => {
                    res.status(error.response.status).json(error.response.data);
                });
        } catch (error) {}
    },
};
export default aboutController;
