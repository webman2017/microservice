import express, { Request, Response } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import authController from '../controllers/auth.controller';
import social from '../controllers/socialLink.controller';
import Joi, { ObjectSchema } from 'joi';
import convertSchema from 'joi-to-swagger';
// import rateLimit from '../helpers/ratelimit.helper';
import validateMiddleware from '../middlewares/validate.middleware';
import authValidate from '../validates/auth.validate';
// import { secretKey } from "../config/app";

const router = express.Router();
/**
 * @swagger
 * /upload:
 *   post:
 *     tags:
 *       - Upload
 *     summary: Uploads a file
 *     description:
 *     requestBody:
 *     content:
 *      multipart/form-data:
 *        schema:
 *         type: object
 *         required:
 *         - content:
 *        properties:
 *         content:
 *         type: string
 *         format: binary
 *        required: true
 *     responses:
 *       200:
 *         description: File uploaded successfully
 */
router.post('/upload', (req: Request, res: Response) => {
    console.log(req.body);
    social.social(req, res);
    // res.sendStatus(200);
});

export default router;
