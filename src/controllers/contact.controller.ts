import { Request, Response, NextFunction } from 'express';
import { NewExpression } from 'typescript';
import config from '../config';
import axios from 'axios';
import { tokenBackendApi } from '../helpers/tokenBackendApi.helper';
import { encodeDataBodyToBase64 } from '../helpers/dataBodytoBase64.helper';
const apiService = config.backApiBackend;

const contact = {
    async getById(req: any, res: any) {
        try {
            const token = await tokenBackendApi();
            const data = req.query;
            const urlParams = new URLSearchParams(data).toString();
            if (!token) {
                return res.status(404).json({ error: 'Token not available' });
            }

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const { limit, page, keyword } = req.body;
            const apiEndpoint = `${apiService}/contact/list?${urlParams}`;

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
    async categoryList(req: any, res: any) {
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

            const { limit, page } = req.body;
            const apiEndpoint = `${apiService}/contact/category_list?${urlParams}`;

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
    async requestContact(req: Request, res: Response) {
        try {
            const token = await tokenBackendApi();

            if (!token) {
                return res.status(404).json({ error: 'Token not available' });
            }

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            //const data = JSON.stringify(req.body);
            const requestData = {
                data: req.body.data,
                dataType: req.body.dataType,
            };

            const encodedData = JSON.stringify(
                encodeDataBodyToBase64(requestData),
            );

            // console.log(encodedData);

            axios
                .post(`${apiService}/contact/request`, requestData, {
                    headers,
                })
                .then((response: any) => {
                    res.send(response.data);
                })
                .catch((error: any) => {
                    res.status(error.response.status).json(error.response.data);
                });
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },
};

export default contact;
