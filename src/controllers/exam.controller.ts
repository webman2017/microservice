import { Request, Response, NextFunction } from 'express';
import config from '../config';
import axios from 'axios';
import { tokenBackendApi } from '../helpers/tokenBackendApi.helper';
import { encodeDataBodyToBase64 } from '../helpers/dataBodytoBase64.helper';
const apiService = config.backApiBackend;

const ExamController = {
    async examList(req: any, res: any, next: any) {
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

            const data = req.query;
            const urlParams = new URLSearchParams(data).toString();

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const apiEndpoint = `${apiService}/exam/list?${urlParams}`;

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
    async examTopicList(req: any, res: any, next: any) {
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

            const data = req.query;
            const urlParams = new URLSearchParams(data).toString();

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const apiEndpoint = `${apiService}/exam/list_topic?${urlParams}`;

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
    async examData(req: any, res: any, next: any) {
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

            const data = req.query;
            const urlParams = new URLSearchParams(data).toString();

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const apiEndpoint = `${apiService}/exam/exam_data?${urlParams}`;

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
    async examTopicData(req: Request, res: Response) {
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

            console.log('exam', encodedData);

            axios
                .post(`${apiService}/exam/exam_topic_data`, requestData, {
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
    async examSave(req: Request, res: Response) {
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

            console.log('exam', encodedData);

            axios
                .post(`${apiService}/exam/exam_save`, requestData, {
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

export default ExamController;
