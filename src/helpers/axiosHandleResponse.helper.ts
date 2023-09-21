import { Response } from 'express';
import { AxiosResponse } from 'axios';
import { setCommonErrorResponse } from '../interfaces/commonErrorResponse.interface';

const axiosHandleResponse = (res: Response, response: AxiosResponse) => {
    try {
        let parsedData = response.data;
        if (typeof response.data === 'string') {
            parsedData = JSON.parse(response.data);
        }
        res.status(200).json(parsedData);
    } catch (error) {
        const commonErrorResponse = setCommonErrorResponse(
            500,
            'Data is not in valid JSON format',
        );
        res.status(commonErrorResponse.status).json(commonErrorResponse);
    }
};

export { axiosHandleResponse };
