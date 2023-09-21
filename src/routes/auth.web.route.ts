import express, { Request, Response } from 'express';
import Joi, { ObjectSchema } from 'joi';
import authTokenMiddleware from '../middlewares/authToken.middleware';
import validateMiddleware from '../middlewares/validate.middleware';
import authValidate from '../validates/auth.validate';
import authController from '../controllers/auth.controller';

const router = express.Router();
/**
 * @swagger
 * /web/auth:
 *    post:
 *      tags:
 *        - Web_Authorize
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
    '/web/auth',
    validateMiddleware(authValidate.login),
    async (req: Request, res: Response) => {
        const { username, password } = req.body;
        await authController.login(req, res);
    },
);
/**
 * @swagger

 * /web/logout:
 *   get:
 *     summary: logout backend
  *     tags:
 *       - Web_Authorize
 *     responses:
 *       200:
 *         description: Successful response
 */

router.get('/web/logout', authController.logout);
// /**
//  * @swagger
//  * /web/getToken:
//  *    post:
//  *      tags:
//  *        - Web_Authorize
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
// //  *                    example: Successfully created data!
//  *
//  */
router.post(
    '/web/getToken',
    validateMiddleware(authValidate.key),
    (req: Request, res: Response) => {
        authController.getToken(req, res);
    },
);

/**
 * @swagger

 * /web/checkToken:
 *   get:
 *     summary: check token
 *     tags:
 *       - Web_Authorize
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 */

router.get('/web/checkToken', authTokenMiddleware, authController.checkToken);
export default router;
