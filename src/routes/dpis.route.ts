import express, { Request, Response, NextFunction } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import dpisController from '../controllers/dpis.controller';
import authController from '../controllers/auth.controller';
import Joi, { ObjectSchema } from 'joi';
import convertSchema from 'joi-to-swagger';
// import rateLimit from '../helpers/ratelimit.helper';
import validateMiddleware from '../middlewares/validate.middleware';
import authValidate from '../validates/auth.validate';
// import { secretKey } from "../config/app";
const router = express.Router();
/**
 * @swagger
 * /dpisTest:
 *    post:
 *      tags:
 *        - Dpis
 *      description: call api test
 *      summary: call api test
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  description: enter your username
 *                  example: hrd@md.go.th
 *                password:
 *                  type: string
 *                  description: enter your password
 *                  example: mdHRD_Elearning!
 *
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
router.post('/dpisTest', async (req: Request, res: Response) => {
    console.log(req.body);
    await dpisController.login(req, res);
});

export default router;
