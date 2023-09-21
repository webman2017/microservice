import { Request, Response, NextFunction } from 'express';
import config from '../config';
import axios from 'axios';
import { tokenBackendApi } from '../helpers/tokenBackendApi.helper';
import { encodeDataBodyToBase64 } from '../helpers/dataBodytoBase64.helper';
import { axiosHandleResponse } from '../helpers/axiosHandleResponse.helper';
import { axiosHandleError } from '../helpers/axiosHandleError.helper';
import { setCommonErrorResponse } from '../interfaces/commonErrorResponse.interface';
const apiService = config.backApiBackend;

const CoachController = {
    async coachScheduleList(req: any, res: any, next: any) {
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

            const apiEndpoint = `${apiService}/coach/list_schedule?${urlParams}`;

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
    async coachScheduleById(req: any, res: any) {
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

            const apiEndpoint = `${apiService}/coach/get_schedule?${urlParams}`;

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
    async coachScheduleOndemand(req: any, res: any) {
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
            const apiEndpoint = `${apiService}/coach/get_vdo_ondemand?${urlParams}`;

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
    async coachScheduleMemos(req: any, res: any) {
        try {
            const token_backend = req.token_backend;

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token_backend}`,
            };

            const data = req.query;
            const urlParams = new URLSearchParams(data).toString();

            const apiEndpoint = `${apiService}/coach/list_memos?${urlParams}`;

            axios
                .get(apiEndpoint, { headers })
                .then((response) => {
                    axiosHandleResponse(res, response);
                })
                .catch(function (error) {
                    axiosHandleError(error, res);
                });
        } catch (error) {
            const commonErrorResponse = setCommonErrorResponse(
                500,
                'Internal Server Error',
            );
            res.status(commonErrorResponse.status).json(commonErrorResponse);
        }
    },
    async coachScheduleMemosById(req: any, res: any) {
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

            const apiEndpoint = `${apiService}/coach/get_schedule_memos?${urlParams}`;

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
    async coachList(req: any, res: any, next: any) {
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

            const apiEndpoint = `${apiService}/coach/list?${urlParams}`;

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
    async coachById(req: any, res: any) {
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

            const apiEndpoint = `${apiService}/coach/get?${urlParams}`;

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
    async coachInsertMemos(req: Request, res: Response) {
        try {
            const token = req.token;

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            //const data = JSON.stringify(req.body);
            const requestData = {
                data: req.body.data,
                dataType: req.body.dataType,
            };

            axios
                .post(`${apiService}/coach/insert_memos`, requestData, {
                    headers,
                })
                .then((response) => {
                    axiosHandleResponse(res, response);
                })
                .catch(function (error) {
                    axiosHandleError(error, res);
                });
        } catch (error) {
            const commonErrorResponse = setCommonErrorResponse(
                500,
                'Internal Server Error',
            );
            res.status(500).json(commonErrorResponse);
        }
    },
    async coachUpdateMemos(req: Request, res: Response) {
        try {
            const token = req.token;

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            //const data = JSON.stringify(req.body);
            const requestData = {
                data: req.body.data,
                dataType: req.body.dataType,
            };

            axios
                .post(`${apiService}/coach/update_memos`, requestData, {
                    headers,
                })
                .then((response) => {
                    axiosHandleResponse(res, response);
                })
                .catch(function (error) {
                    axiosHandleError(error, res);
                });
        } catch (error) {
            const commonErrorResponse = setCommonErrorResponse(
                500,
                'Internal Server Error',
            );
            res.status(500).json(commonErrorResponse);
        }
    },
    async coachDeleteMemos(req: Request, res: Response) {
        try {
            const token = req.token;

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            //const data = JSON.stringify(req.body);
            const requestData = {
                data: req.body.data,
                dataType: req.body.dataType,
            };

            axios
                .post(`${apiService}/coach/delete_memos`, requestData, {
                    headers,
                })
                .then((response) => {
                    axiosHandleResponse(res, response);
                })
                .catch(function (error) {
                    axiosHandleError(error, res);
                });
        } catch (error) {
            const commonErrorResponse = setCommonErrorResponse(
                500,
                'Internal Server Error',
            );
            res.status(500).json(commonErrorResponse);
        }
    },
    async coachScheduleUpdateSelfAttend(req: Request, res: Response) {
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

            console.log('poll', encodedData);

            axios
                .post(`${apiService}/coach/self_attend_status`, requestData, {
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

export default CoachController;
