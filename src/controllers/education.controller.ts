import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { encodeDataBodyToBase64 } from '../helpers/dataBodytoBase64.helper';
import config from '../config';
const apiService = config.backApiBackend;

const EducationController = {
    async educationList(req: any, res: any, next: any) {
        try {
            const token = req.token;

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const data = req.query;
            const urlParams = new URLSearchParams(data).toString();
            const apiEndpoint = `${apiService}/education/list?${urlParams}`;

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
    async educationLevelList(req: any, res: any, next: any) {
        try {
            const token = req.token;

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const data = req.query;
            const urlParams = new URLSearchParams(data).toString();
            const apiEndpoint = `${apiService}/education/education_level_list?${urlParams}`;

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
    async educationById(req: any, res: any) {
        try {
            const token = req.token;

            const data = req.query;
            const urlParams = new URLSearchParams(data).toString();

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const apiEndpoint = `${apiService}/education/get?${urlParams}`;

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
    async educationInsert(req: Request, res: Response) {
        try {
            const token = req.token;

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const requestData = {
                data: req.body.data,
                dataType: req.body.dataType,
            };

            axios
                .post(`${apiService}/education/education_insert`, requestData, {
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
    async educationUpdate(req: Request, res: Response) {
        try {
            const token = req.token;

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const requestData = {
                data: req.body.data,
                dataType: req.body.dataType,
            };

            axios
                .post(`${apiService}/education/education_update`, requestData, {
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
    async educationDelete(req: Request, res: Response) {
        try {
            const token = req.token;

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

            // console.log('education_delete', encodedData);

            axios
                .post(`${apiService}/education/education_delete`, requestData, {
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

export default EducationController;
