import { Request, Response, NextFunction } from 'express';
import config from '../config';
import axios from 'axios';
import { tokenBackendApi } from '../helpers/tokenBackendApi.helper';

const apiService = config.backApiBackend;

const BannerControler = {
    async getBanner(req: any, res: any) {
        try {
            const data = req.query;
            console.log(data);
            const urlParams = new URLSearchParams(data).toString();
            const token = await tokenBackendApi();

            if (!token) {
                return res.status(404).json({ error: 'Token not available' });
            }

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const apiEndpoint = `${apiService}/banner/list?${urlParams}`;

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
export default BannerControler;
