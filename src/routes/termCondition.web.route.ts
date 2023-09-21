import express, { Request, Response } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import termsController from '../controllers/terms.controller';
import Joi, { ObjectSchema } from 'joi';
import convertSchema from 'joi-to-swagger';
// import rateLimit from '../helpers/ratelimit.helper';
import validateMiddleware from '../middlewares/validate.middleware';
import authValidate from '../validates/auth.validate';
// import { secretKey } from "../config/app";
const router = express.Router();
/**
 * @swagger
 * /web/getTermsAndCondition:
 *   get:
 *     summary: แสดง TermAndCondition
 *     tags:
 *       - Web_TermsAndCondition
 *     parameters:
 *       - in: query
 *         name: cardno
 *         example: developer
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Example updated successfully
 */
router.get('/web/getTermsAndCondition', async (req: Request, res: Response) => {
    await termsController.term(req, res);
});

/**
 * @swagger
 * /web/acceptTermsAndCondition:
 *    post:
 *      tags:
 *        - Web_TermsAndCondition
 *      description: accept term and condition
 *      summary: accept term and condition
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
 *                     terms_conditions_id :
 *                        type : integer
 *                        example : MTA=
 *                     cardno:
 *                       type: string
 *                       example : ZGV2ZWxvcGVy
 *                dataType:
 *                   type : object
 *                   properties:
 *                     terms_conditions_id :
 *                      type : string
 *                      example : int
 *                     cardno:
 *                       type: string
 *                       example : varchar
 *      security:
 *        - BearerAuth: []
 *      responses:
 *        200:
 *          description: Successfully created data
 *          example: Successfully created data!
 *
 */
router.post(
    '/web/acceptTermsAndCondition',
    async (req: Request, res: Response) => {
        await termsController.accept(req, res);
    },
);
export default router;
