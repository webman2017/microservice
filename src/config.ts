import dotenv from 'dotenv';

dotenv.config();

const {
    NODE_ENV,
    PORT,
    TOKEN_SECRET,
    TOKEN_SECRET_REFRESH,
    BASEAPIBACKEND,
    BACKEND_API_CLIENT_KEY,
    BACKEND_API_CLIENT_SECRET,
    MONGO_DB_HOST,
    MONGO_DB_PORT,
    MONGO_DB_DATABASE,
    MONGO_DB_USERNAME,
    MONGO_DB_PASSWORD,
} = process.env;

export default {
    nodeEnv: NODE_ENV,
    port: PORT,
    // host: POSTGRES_HOST,
    // dbPort: POSTGRES_PORT,
    // database: NODE_ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
    // user: POSTGRES_USER,
    // password: POSTGRES_PASSWORD,
    // pepper: BCRYPT_PASSWORD,
    // salt: SALT_ROUNDS,
    tokenSecret: TOKEN_SECRET,
    tokenSecretRefresh: TOKEN_SECRET_REFRESH,
    backApiBackend: BASEAPIBACKEND,
    backendApiClientKey: BACKEND_API_CLIENT_KEY,
    backendApiClientSecret: BACKEND_API_CLIENT_SECRET,
    mongoDbHost: MONGO_DB_HOST,
    mongoDbPort: MONGO_DB_PORT,
    mongoDbDatabase: MONGO_DB_DATABASE,
    mongoDbUsername: MONGO_DB_USERNAME,
    mongoDbPassword: MONGO_DB_PASSWORD,
};
