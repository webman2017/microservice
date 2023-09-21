import { Response } from 'express';
import { AxiosError } from 'axios';
import { setCommonErrorResponse } from '../interfaces/commonErrorResponse.interface';

const axiosHandleError = (error: AxiosError, res: Response): void => {
    if (error.response) {
        const { data, status, headers } = error.response;

        console.log('response.data: ', data);
        console.log('response.status: ', status);
        console.log('error.response.headers: ', headers);

        try {
            let parsedData = data;
            if (typeof data === 'string') {
                parsedData = JSON.parse(data);
            }
            res.status(status).json(parsedData);
        } catch (e) {
            const commonErrorResponse = setCommonErrorResponse(
                status,
                'Data is not in valid JSON format from error.response',
            );
            res.status(status).json(commonErrorResponse);
        }
    } else if (error.request) {
        const commonErrorResponse = setCommonErrorResponse(
            500,
            'Data is not in valid JSON format from error.request',
        );
        res.status(500).json(commonErrorResponse);
    } else {
        console.log('Error: ', error.message);
        const commonErrorResponse = setCommonErrorResponse(500, error.message);
        res.status(500).json(commonErrorResponse);
    }
};

export { axiosHandleError };
