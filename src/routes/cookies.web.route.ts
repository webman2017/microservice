import express, { Request, Response } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import CookieController from '../controllers/cookie.controller';
import Joi, { ObjectSchema } from 'joi';

const router = express.Router();
/**
 * @swagger
 * /web/getCookies:
 *   get:
 *     summary: get cookies from cardno
 *     tags:
 *       - Web_Cookie
 *     parameters:
 *       - in: query
 *         name: cardno
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Example updated successfully
 */
router.get('/web/getCookies', async (req: Request, res: Response) => {
    await CookieController.getCookies(req, res);
    // res.sendStatus(200);
});

/**
 * @swagger
 * /web/acceptCookie:
 *    post:
 *      tags:
 *        - Web_Cookie
 *      description: accept cookies
 *      summary: accept cookies
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties :
 *                     cookies_consent_id :
 *                        type : integer
 *                        example : MTg=
 *                     cardno:
 *                        type: string
 *                        example: ZGV2ZWxvcGVy
 *                dataType:
 *                   type : object
 *                   properties:
 *                     cookies_consent_id :
 *                      type : string
 *                      example : int
 *                     cardno:
 *                      example: varchar
 *      responses:
 *        200:
 *          description: Successfully created data
 */
router.post('/web/acceptCookie', async (req: Request, res: Response) => {
    await CookieController.accept(req, res);
});
export default router;
