import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import moment from 'moment-timezone';
import config from './config';
import errorMiddleware from './middlewares/error.middleware';
import rateLimit from './helpers/ratelimit.helper';
import mongoose from './services/mongoose';
import { Logger } from './services/logger';
import routes from './routes/index';
import * as swaggerJson from './swagger.json';
import path from 'path';

const PORT = config.port || 9090;
// Create an instance server
const app: Application = express();
// Middleware to parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());
app.use(helmet());
app.use(rateLimit);
app.set('view engine', 'ejs');
app.set('views', 'src/views');
// app.use(express.static('public'));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(bodyParser.json());

// Set the timezone to Asia/Bangkok
const desiredTimezone = 'Asia/Bangkok';
moment.tz.setDefault(desiredTimezone);

// enable this if you run behind a proxy (e.g. nginx)
app.set('trust proxy', 1);
app.use('/', routes);
// Mount the routes

app.use(Logger.getHttpLoggerInstance());
const logger = Logger.getInstance();

// Test mongodb connect
mongoose.connectMongodb();

// Configure Swagger options
const swaggerOptions = {
    swaggerDefinition: swaggerJson,
    apis: ['./routes/*.js', './src/routes/*.ts', './dist/routes/*.js'],
};

const spec = swaggerJsdoc(swaggerOptions);

// console.log(spec);

// Cast the Swagger specification object to 'any' type
const swaggerSpec = spec as any;

// Get all the tags used in the paths โดยเช็คจาก paths แล้วหา tags ภายใต้ method อีกที
const tags = new Set<string>();
Object.keys(swaggerSpec.paths).forEach((path: string) => {
    Object.keys(swaggerSpec.paths[path]).forEach((method: string) => {
        const operation = swaggerSpec.paths[path][method];
        if (operation.tags) {
            operation.tags.forEach((tag: string) => {
                tags.add(tag);
            });
        }
    });
});

// Sort the tags alphabetically
const sortedTags = Array.from(tags).sort((a, b) => a.localeCompare(b));

// Update the Swagger configuration tags based on the sorted tags
swaggerSpec.tags = sortedTags.map((tag: string) => ({ name: tag }));

// Determine the current server based on the base URL
interface ServerConfig {
    url: string;
    description: string;
}

let currentServer: ServerConfig[] = [];
switch (process.env.NODE_ENV) {
    case 'production':
        currentServer = [
            {
                url: 'https://hrd.md.go.th/api',
                description: 'Production Server',
            },
        ];
        break;
    case 'development':
        currentServer = [
            {
                url: 'http://localhost:9090',
                description: 'Development Server',
            },
        ];
        break;
    case 'testing':
        currentServer = [
            {
                url: 'https://hrd-md.aitproject.com/api',
                description: 'Testing Server',
            },
        ];
        break;
    default:
        break;
}

// Update the Swagger configuration servers based on the current server
swaggerSpec.servers = currentServer;

// Create Swagger UI configuration object
const swaggerUiConfig = {
    // explorer: true,
    customSiteTitle: 'MD Swagger UI',
    swaggerOptions: {
        docExpansion: 'none',
        persistAuthorization: true,
    },
};

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, swaggerUiConfig),
);

app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.get('/logs', function (req, res) {
    res.render('log.ejs');
});
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        message: 'Ohh you are lost 😂',
    });
});

// error handler middleware
app.use(errorMiddleware);

// start express server
app.listen(PORT, () => {
    const date = new Date();
    console.log(`new Date()`, date);
    console.log(`new Date() toString`, date.toString());
    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(`Current time in ${desiredTimezone}: ${currentTime}`);
    console.log(`Server is starting at env:${process.env.NODE_ENV}`);
    console.log(`Server is starting at port:${PORT}`);
    console.log(`swagger http://localhost:${PORT}/api-docs`);
    logger.info(`Server is up and running @ http://localhost:${PORT}`);
});
export default app;
