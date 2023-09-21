import express, { Request, Response, NextFunction } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import AuthenticateController from '../controllers/authenticate.controller';
import validateMiddleware from '../middlewares/validate.middleware';
import authValidate from '../validates/auth.validate';
const router = express.Router();
/**
 * @swagger
 * /authenticate:
 *    post:
 *      tags:
 *        - Authenticate
 *      description: Create users API
 *      summary: Authenticate
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  description: enter your password
 *                  example: administrator@gmail.com
 *                password:
 *                  type: string
 *                  description: enter your username
 *                  example: gatewayapi@12345
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
    '/authenticate',
    validateMiddleware(authValidate.authenticatedata),
    (req: Request, res: Response, next: NextFunction) => {
        AuthenticateController.authenticateToken(req, res, next);
    },
);
/**
 * @swagger
 * /checkAuthenticate:
 *   post:
 *     summary: Check authenticate
 *     tags:
 *       - Authenticate
 *     parameters:
 *       - in: body
 *         name: example
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 */
router.post(
    '/checkAuthenticate',
    authMiddleware,
    (req: Request, res: Response) => {
        AuthenticateController.checkAuthenticate(req, res);
    },
);
export default router;
