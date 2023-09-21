/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import config from '../config';
import axios from 'axios';
import { encodeDataBodyToBase64 } from '../helpers/dataBodytoBase64.helper';
import { axiosHandleResponse } from '../helpers/axiosHandleResponse.helper';
import { axiosHandleError } from '../helpers/axiosHandleError.helper';
import { setCommonErrorResponse } from '../interfaces/commonErrorResponse.interface';
const apiService = config.backApiBackend;

const AboutController = {
    async submenu(req: any, res: any) {
        try {
            const token_backend = req.token_backend;

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token_backend}`,
            };

            const data = req.query;
            const urlParams = new URLSearchParams(data).toString();

            const apiEndpoint = `${apiService}/aboutus/list?${urlParams}`;
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
    async getsubmenu(req: any, res: any) {
        try {
            const token_backend = req.token_backend;

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token_backend}`,
            };

            const data = req.query;
            const urlParams = new URLSearchParams(data).toString();

            const apiEndpoint = `${apiService}/aboutus/get?${urlParams}`;
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
    async mainmenu(req: any, res: any) {
        try {
            const token_backend = req.token_backend;

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token_backend}`,
            };

            const data = req.query;
            const urlParams = new URLSearchParams(data).toString();

            const apiEndpoint = `${apiService}/aboutus/mainmenu?${urlParams}`;

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

    async updateView(req: Request, res: Response, next: NextFunction) {
        try {
            const token_backend = req.token_backend;

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token_backend}`,
            };

            const requestData = {
                data: req.body.data,
                dataType: req.body.dataType,
            };

            // const encodedData = JSON.stringify(
            //     encodeDataBodyToBase64(requestData),
            // );

            // console.log(encodedData);

            axios
                .post(`${apiService}/aboutus/views`, requestData, { headers })
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
};
export default AboutController;
