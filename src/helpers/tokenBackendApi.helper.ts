import config from '../config';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';

const apiService = config.backApiBackend;
const clientKey = config.backendApiClientKey;
const clientSecret = config.backendApiClientSecret;

const tokenBackendApiService = async () => {
    const form = new FormData();
    form.append('clientKey', `${clientKey}`);
    form.append('clientSecret', `${clientSecret}`);

    try {
        const response = await axios.post(
            `${apiService}/auth/get_token`,
            form,
            {
                headers: form.getHeaders(),
            },
        );

        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = response.data;
        return data.data.token || '';
    } catch (error) {
        console.error('Error fetching token:', error);
        return null;
    }
};

const isTokenExpired = (tokenData: { token?: string; createdAt?: number }) => {
    const { createdAt } = tokenData;
    const tokenDuration = 60 * 60 * 1000; // Token expiration duration in milliseconds (1 hour)

    return Date.now() - (createdAt || 0) >= tokenDuration;
};

const getTokenFilePath = () => {
    const tokensFolderPath = path.join(__dirname, '../../', 'tokens');
    const tokenFilePath = path.join(tokensFolderPath, 'token.json');

    if (!fs.existsSync(tokensFolderPath)) {
        fs.mkdirSync(tokensFolderPath);
    }

    if (!fs.existsSync(tokenFilePath)) {
        fs.writeFileSync(
            tokenFilePath,
            JSON.stringify({ token: '', createdAt: 0 }),
        );
    }

    return tokenFilePath;
};

const readTokenData = (): { token?: string; createdAt?: number } => {
    const tokenFilePath = getTokenFilePath();
    let tokenData: { token?: string; createdAt?: number } = {};

    if (fs.existsSync(tokenFilePath)) {
        const fileContent = fs.readFileSync(tokenFilePath, 'utf8');
        tokenData = JSON.parse(fileContent);
    } else {
        writeTokenData(tokenData); // Create the token file
    }

    return tokenData;
};

const writeTokenData = (tokenData: { token?: string; createdAt?: number }) => {
    const tokenFilePath = getTokenFilePath();
    fs.writeFileSync(tokenFilePath, JSON.stringify(tokenData));
};

const tokenBackendApi = async (): Promise<string> => {
    const tokenData = readTokenData();
    let token = tokenData.token || '';

    if (!token || isTokenExpired(tokenData)) {
        const newToken = await tokenBackendApiService();
        token = newToken;

        writeTokenData({ token, createdAt: Date.now() });
    }

    return token;
};

export { tokenBackendApi };
