/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import config from '../config';
import axios from 'axios';
import { tokenBackendApi } from '../helpers/tokenBackendApi.helper';
const apiService = config.backApiBackend;

import { encodeDataBodyToBase64 } from '../helpers/dataBodytoBase64.helper';
const termController = {
    async term(req: Request, res: Response) {
        try {
            const authHeader = req.get('Authorization');

            if (!authHeader) {
                return res
                    .status(400)
                    .json({ error: 'Please input token in header' });
            }

            const [bearer, token] = authHeader.split(' ');

            if (!token || bearer.toLowerCase() !== 'bearer') {
                return res
                    .status(400)
                    .json({ error: 'Please input valid token in header' });
            }

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const cardno = req.body.cardno;

            const apiEndpoint = `${apiService}/terms_conditions/get?cardno=${cardno}`;

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
    async accept(req: Request, res: Response) {
        try {
            const authHeader = req.get('Authorization');

            if (!authHeader) {
                return res
                    .status(400)
                    .json({ error: 'Please input token in header' });
            }

            const [bearer, token] = authHeader.split(' ');

            if (!token || bearer.toLowerCase() !== 'bearer') {
                return res
                    .status(400)
                    .json({ error: 'Please input valid token in header' });
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

            console.log(encodedData);

            axios
                .post(`${apiService}/terms_conditions/accept`, requestData, {
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
export default termController;
