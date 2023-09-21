/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import config from '../config';
import axios from 'axios';
import { tokenBackendApi } from '../helpers/tokenBackendApi.helper';
const apiService = config.backApiBackend;

const faq = {
    async faqCategory(req: any, res: any) {
        try {
            const data = req.query;
            const urlParams = new URLSearchParams(data).toString();
            const token = await tokenBackendApi();
            if (!token) {
                return res.status(404).json({ error: 'Token not available' });
            }
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };
            const apiEndpoint = `${apiService}/faq/category_list?${urlParams}`;
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
    async faqList(req: any, res: any) {
        try {
            const data = req.query;
            const urlParams = new URLSearchParams(data).toString();
            const token = await tokenBackendApi();

            if (!token) {
                return res.status(404).json({ error: 'Token not available' });
            }

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const apiEndpoint = `${apiService}/faq/list?${urlParams}`;

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
};
export default faq;
