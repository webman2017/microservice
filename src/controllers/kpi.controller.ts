import { Request, Response, NextFunction } from 'express';
import config from '../config';
import axios from 'axios';
import { encodeDataBodyToBase64 } from '../helpers/dataBodytoBase64.helper';
import { axiosHandleResponse } from '../helpers/axiosHandleResponse.helper';
import { axiosHandleError } from '../helpers/axiosHandleError.helper';
import { setCommonErrorResponse } from '../interfaces/commonErrorResponse.interface';
const apiService = config.backApiBackend;

const KpiController = {
    async getKpi(req: any, res: any, next: any) {
        try {
            const token = req.token;

            const data = req.query;
            const urlParams = new URLSearchParams(data).toString();

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const apiEndpoint = `${apiService}/kpi/list?${urlParams}`;

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
};

export default KpiController;
