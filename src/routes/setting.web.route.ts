import express, { Request, Response } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import settingController from '../controllers/setting.controller';
import Joi, { ObjectSchema } from 'joi';
import joiToSwagger from 'joi-to-swagger';
// import rateLimit from '../helpers/ratelimit.helper';
import meta from '../helpers/meta.helper';
import validateMiddleware from '../middlewares/validate.middleware';

import authValidate from '../validates/auth.validate';
// import { secretKey } from "../config/app";
const router = express.Router();
/**
 * @swagger
 * /web/setting:
 *    get:
 *      tags:
 *        - Web_Setting
 *      description: หน้าหลัก setting
 *      summary: หน้าหลัก setting
 *      responses:
 *        200:
 *          description: Successfully created data
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  description:
 *                    type: string
 *                    example: Successfully created data!
 *
 */

router.get('/web/setting', async (req: Request, res: Response) => {
    // Define your Joi schema

    await settingController.setting(req, res);
});

export default router;
