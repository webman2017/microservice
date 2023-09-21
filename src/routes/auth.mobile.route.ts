import express, { Request, Response } from 'express';
import Joi, { ObjectSchema } from 'joi';
import authTokenMiddleware from '../middlewares/authToken.middleware';
import validateMiddleware from '../middlewares/validate.middleware';
import authValidate from '../validates/auth.validate';
import authController from '../controllers/auth.controller';

const router = express.Router();
/**
 * @swagger
 * /mobile/auth:
 *    post:
 *      tags:
 *        - Mobile_Authorize
 *      description: authorize
 *      summary: authorize
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
 *                  example: developer
 *                password:
 *                  type: string
 *                  description: enter your password
 *                  example: P@ssw0rd
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
router.post(
    '/mobile/auth',
    validateMiddleware(authValidate.login),
    async (req: Request, res: Response) => {
        const { username, password } = req.body;
        await authController.login(req, res);
    },
);
/**
 * @swagger

 * /mobile/logout:
 *   get:
 *     summary: logout backend
  *     tags:
 *       - Mobile_Authorize
 *     responses:
 *       200:
 *         description: Successful response
 */

router.get('/mobile/logout', authController.logout);
// /**
//  * @swagger
//  * /mobile/getToken:
//  *    post:
//  *      tags:
//  *        - Mobile_Authorize
//  *      description: get Token
//  *      summary: get Token
//  *      requestBody:
//  *        required: true
//  *        content:
//  *          application/json:
//  *            schema:
//  *              type: object
//  *              properties:
//  *                clientKey:
//  *                  type: string
//  *                  description: enter your username
//  *                  example: afe9bddd131c11e9b3cfd481d7c87a31
//  *                clientSecret:
//  *                  type: string
//  *                  description: enter your password
//  *                  example: afe9c40c131c11e9b3cfd481d7c87a33
//  *
//  *      responses:
//  *        200:
//  *          description: Successfully created data
//  *          content:
//  *            application/json:
//  *              schema:
//  *                type: object
//  *                properties:
//  *                  description:
//  *                    type: string
//  *                    example: Successfully created data!
//  *
//  */
router.post(
    '/mobile/getToken',
    validateMiddleware(authValidate.key),
    (req: Request, res: Response) => {
        authController.getToken(req, res);
    },
);

/**
 * @swagger

 * /mobile/checkToken:
 *   get:
 *     summary: check token
 *     tags:
 *       - Mobile_Authorize
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 */

router.get(
    '/mobile/checkToken',
    authTokenMiddleware,
    authController.checkToken,
);
export default router;
