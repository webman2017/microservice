import { Request, Response, NextFunction } from 'express';
import config from '../config';
import axios from 'axios';
import { tokenBackendApi } from '../helpers/tokenBackendApi.helper';
import { encodeDataBodyToBase64 } from '../helpers/dataBodytoBase64.helper';
import { axiosHandleResponse } from '../helpers/axiosHandleResponse.helper';
import { axiosHandleError } from '../helpers/axiosHandleError.helper';
import { setCommonErrorResponse } from '../interfaces/commonErrorResponse.interface';
const apiService = config.backApiBackend;

const CourseController = {
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
            const apiEndpoint = `${apiService}/course/category_list?${urlParams}`;

            const response = await axios.get(apiEndpoint, { headers });
            res.json(response.data);
        } catch (error) {
            // console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
    async courseList(req: any, res: any, next: any) {
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

            const apiEndpoint = `${apiService}/course/list?${urlParams}`;

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
    async courseById(req: any, res: any) {
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

            const apiEndpoint = `${apiService}/course/get?${urlParams}`;

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
    async generationList(req: any, res: any, next: any) {
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

            const apiEndpoint = `${apiService}/course/generation_list?${urlParams}`;

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
    async generationCheckRegister(req: any, res: any) {
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

            const apiEndpoint = `${apiService}/course/generation_check_register?${urlParams}`;

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
    async generationRegisterInsert(req: Request, res: Response) {
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

            const encodedData = JSON.stringify(
                encodeDataBodyToBase64(requestData),
            );

            console.log('data', encodedData);

            axios
                .post(
                    `${apiService}/course/generation_register_insert`,
                    requestData,
                    {
                        headers,
                    },
                )
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
    async generationById(req: any, res: any) {
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

            const apiEndpoint = `${apiService}/course/generation_get?${urlParams}`;

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
    async learningList(req: any, res: any, next: any) {
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

            const apiEndpoint = `${apiService}/course/learning_list?${urlParams}`;

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
    async learningCheckSelected(req: any, res: any) {
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

            const apiEndpoint = `${apiService}/course/learning_check_selected?${urlParams}`;

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
    async learningById(req: any, res: any) {
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

            const apiEndpoint = `${apiService}/course/learning_get?${urlParams}`;

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
    async learningPlayerAction(req: Request, res: Response) {
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

            const encodedData = JSON.stringify(
                encodeDataBodyToBase64(requestData),
            );

            console.log('data', encodedData);

            axios
                .post(
                    `${apiService}/course/learning_player_action`,
                    requestData,
                    {
                        headers,
                    },
                )
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
    async yearList(req: any, res: any, next: any) {
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

            const apiEndpoint = `${apiService}/course/year_list?${urlParams}`;

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
    async courseLearningHistoryList(req: any, res: any, next: any) {
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

            const apiEndpoint = `${apiService}/course/course_learning_history_list?${urlParams}`;

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
    async cancelRegister(req: Request, res: Response) {
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

            const encodedData = JSON.stringify(
                encodeDataBodyToBase64(requestData),
            );

            console.log('data', encodedData);

            axios
                .post(`${apiService}/course/remove_register`, requestData, {
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
};
export default CourseController;
