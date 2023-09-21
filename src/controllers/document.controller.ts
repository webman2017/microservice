import { Request, Response, NextFunction } from 'express';
import { encodeDataBodyToBase64 } from '../helpers/dataBodytoBase64.helper';
import axios from 'axios';
import config from '../config';
import { tokenBackendApi } from '../helpers/tokenBackendApi.helper';
const apiService = config.backApiBackend;

const DocumentController = {
    async getDocument(req: any, res: any) {
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

            const limit = req.params.limit;
            console.log(limit);
            const apiEndpoint = `${apiService}/document/list?${urlParams}`;

            axios
                .get(apiEndpoint, { headers })
                .then((response) => {
                    console.log(response.data);
                    res.send(response.data);
                })
                .catch((error) => {
                    console.error(error);
                    res.status(error.response.status).json(error.response.data);
                });
        } catch (error) {
            res.status(500).json({ error: 'Failed to call the API' });
        }
    },
    async documentById(req: any, res: any) {
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
            const apiEndpoint = `${apiService}/document/get?${urlParams}`;
            axios
                .get(apiEndpoint, { headers })
                .then((response) => {
                    console.log(response.data);
                    res.send(response.data);
                })
                .catch((error) => {
                    console.error(error);
                    res.status(error.response.status).json(error.response.data);
                });
        } catch (error) {
            res.status(500).json({ error: 'Failed to call the API' });
        }
    },
    async getCategory(req: any, res: any) {
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

            const apiEndpoint = `${apiService}/document/category_list?${urlParams}`;

            axios
                .get(apiEndpoint, { headers })
                .then((response) => {
                    // console.log(response.data);
                    res.send(response.data);
                })
                .catch((error) => {
                    console.error(error);
                    res.status(error.response.status).json(error.response.data);
                });
        } catch (error) {
            res.status(500).json({ error: 'Failed to call the API' });
        }
    },
    async documentViews(req: Request, res: Response) {
        try {
            const token = await tokenBackendApi();

            if (!token) {
                return res.status(404).json({ error: 'Token not available' });
            }

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };
            const requestData = {
                data: req.body.data,
                dataType: req.body.dataType,
            };
            // const encodedData = JSON.stringify(
            //     encodeDataBodyToBase64(requestData),
            // );
            axios
                .post(`${apiService}/document/views`, requestData, {
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
export default DocumentController;
