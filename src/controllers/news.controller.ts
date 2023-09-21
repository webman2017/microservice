import axios from 'axios';
import config from '../config';
import { tokenBackendApi } from '../helpers/tokenBackendApi.helper';
import { encodeDataBodyToBase64 } from '../helpers/dataBodytoBase64.helper';
const apiService = config.backApiBackend;
const news = {
    async getList(req: any, res: any) {
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

            const apiEndpoint = `${apiService}/news/list?${urlParams}`;

            axios
                .get(apiEndpoint, { headers })
                .then((response) => {
                    res.send(response.data);
                })
                .catch((error) => {
                    res.status(error.response.status).json(error.response.data);
                });
        } catch (error) {
            res.status(500).json({ error: 'Failed to call the API' });
        }
    },
    async getById(req: any, res: any) {
        try {
            const id = req.query;
            const urlParams = new URLSearchParams(id).toString();
            const token = await tokenBackendApi();

            console.log(urlParams);

            if (!token) {
                return res.status(404).json({ error: 'Token not available' });
            }

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const apiEndpoint = `${apiService}/news/get?${urlParams}`;

            const response = await axios.get(apiEndpoint, { headers });
            res.json(response.data);
        } catch (error) {
            // console.error('Error while calling the API:', error.message);
            res.status(500).json({ error: 'Failed to call the API' });
        }
    },
    async newsViews(req: any, res: any) {
        try {
            const token = await tokenBackendApi();

            if (!token) {
                return res.status(404).json({ error: 'Token not available' });
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

            // const encodedData = JSON.stringify(
            //     encodeDataBodyToBase64(requestData),
            // );

            axios
                .post(`${apiService}/news/views`, requestData, {
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
            const apiEndpoint = `${apiService}/news/category_list?${urlParams}`;

            const response = await axios.get(apiEndpoint, { headers });
            res.json(response.data);
        } catch (error) {
            // console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
};
export default news;
