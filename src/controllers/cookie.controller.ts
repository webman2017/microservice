import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import config from '../config';
import { tokenBackendApi } from '../helpers/tokenBackendApi.helper';
import { encodeDataBodyToBase64 } from '../helpers/dataBodytoBase64.helper';
const apiService = config.backApiBackend;

const CookieController = {
    async getCookies(req: any, res: any) {
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

            const cardno = req.params.cardno;
            // return
            const apiEndpoint = `${apiService}/cookies_consent/get?${urlParams}`;

            axios
                .get(apiEndpoint, { headers })
                .then((response) => {
                    res.send(response.data);
                })
                .catch((error) => {
                    if (error.response.status === 404) {
                        const errorResponse = {
                            status: error.response.status,
                            message: error.response.data,
                        };
                        return res
                            .status(error.response.status)
                            .json(errorResponse);
                    }
                    res.status(error.response.status).json(error.response.data);
                });
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },
    async accept(req: Request, res: Response) {
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

            const encodedData = JSON.stringify(
                encodeDataBodyToBase64(requestData),
            );

            console.log(encodedData);

            // const requestOptions = {
            //     method: 'POST',
            //     headers: headers,
            //     body: encodedData,
            // };

            // const response = await fetch(
            //     `${apiService}cookies_consent/accept`,
            //     requestOptions,
            // );
            // if (!response.ok) {
            //     const errorResponse = {
            //         status: response.status,
            //         message: response.statusText,
            //     };
            //     return res.status(response.status).json(errorResponse);
            // }

            // const responseData = await response.json();

            // res.send(responseData);

            axios
                .post(`${apiService}/cookies_consent/accept`, requestData, {
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
export default CookieController;
