import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import config from '../config';
import { tokenBackendApi } from '../helpers/tokenBackendApi.helper';
const apiService = config.backApiBackend;

const setting = {
    async setting(req: any, res: any) {
        try {
            const token = await tokenBackendApi();

            if (!token) {
                return res.status(404).json({ error: 'Token not available' });
            }

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const apiEndpoint = `${apiService}/setting_web/get`;

            axios
                .get(apiEndpoint, { headers })
                .then((response) => {
                    // console.log(response.data);
                    res.send(response.data);
                })
                .catch((error) => {
                    // console.error(error);
                    res.status(error.response.status).json(error.response.data);
                });
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },
};

export default setting;
