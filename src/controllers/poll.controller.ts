import { Request, Response, NextFunction } from 'express';
import config from '../config';
import axios from 'axios';
import { encodeDataBodyToBase64 } from '../helpers/dataBodytoBase64.helper';
import { axiosHandleResponse } from '../helpers/axiosHandleResponse.helper';
import { axiosHandleError } from '../helpers/axiosHandleError.helper';
import { setCommonErrorResponse } from '../interfaces/commonErrorResponse.interface';
const apiService = config.backApiBackend;

const PollController = {
    async getPoll(req: any, res: any, next: any) {
        try {
            const token = req.token;

            const data = req.query;
            const urlParams = new URLSearchParams(data).toString();

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const apiEndpoint = `${apiService}/poll/list?${urlParams}`;

            axios
                .get(apiEndpoint, { headers })
                .then((response) => {
                    axiosHandleResponse(res, response);
                })
                .catch((error) => {
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
    async getPollById(req: any, res: any) {
        try {
            const token = req.token;

            const data = req.query;
            const urlParams = new URLSearchParams(data).toString();

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const apiEndpoint = `${apiService}/poll/get?${urlParams}`;

            axios
                .get(apiEndpoint, { headers })
                .then((response) => {
                    axiosHandleResponse(res, response);
                })
                .catch((error) => {
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
    async getChoice(req: any, res: any) {
        try {
            const token = req.token;

            const data = req.query;
            const urlParams = new URLSearchParams(data).toString();

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };
            const apiEndpoint = `${apiService}/poll/getchoice?${urlParams}`;

            axios
                .get(apiEndpoint, { headers })
                .then((response) => {
                    axiosHandleResponse(res, response);
                })
                .catch((error) => {
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
    async pollCategory(req: any, res: any) {
        try {
            const token_backend = req.token_backend;

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token_backend}`,
            };

            const apiEndpoint = `${apiService}/poll/category_list`;

            axios
                .get(apiEndpoint, { headers })
                .then((response) => {
                    axiosHandleResponse(res, response);
                })
                .catch((error) => {
                    axiosHandleError(error, res);
                });
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },
    async pollVote(req: Request, res: Response) {
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

            // const encodedData = JSON.stringify(
            //     encodeDataBodyToBase64(requestData),
            // );

            // console.log('poll', encodedData);

            axios
                .post(`${apiService}/poll/vote`, requestData, {
                    headers,
                })
                .then((response: any) => {
                    axiosHandleResponse(res, response);
                })
                .catch((error: any) => {
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
};

export default PollController;
