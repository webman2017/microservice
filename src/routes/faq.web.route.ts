import express, { Request, Response } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import faqController from '../controllers/faq.controller';
import Joi, { ObjectSchema } from 'joi';
import convertSchema from 'joi-to-swagger';
// import rateLimit from '../helpers/ratelimit.helper';
import validateMiddleware from '../middlewares/validate.middleware';
import authValidate from '../validates/auth.validate';
const router = express.Router();
/**
 * @swagger
 * /web/faqList:
 *    get:
 *      tags:
 *        - Web_Faq
 *      description: แสดงรายการคำถามที่พบบ่อย
 *      summary: แสดงรายการคำถามที่พบบ่อย
 *      parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: string
 *           format:
 *         description:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: string
 *           format:
 *         description:
 *       - in: query
 *         name: category_id
 *         required: false
 *         schema:
 *           type: string
 *         description:
 *       - in: query
 *         name: keyword
 *         required: false
 *         schema:
 *           type: string
 *         description:
 *      responses:
 *        200:
 *          description: Successfully created data
 */
router.get('/web/faqList', async (req: Request, res: Response) => {
    await faqController.faqList(req, res);
});
/**
 * @swagger
 * /web/faqCategory:
 *    get:
 *      tags:
 *        - Web_Faq
 *      description: แสดงรายการคำถามที่พบบ่อย
 *      summary: แสดงรายการคำถามที่พบบ่อย
 *      parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: string
 *         description:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: string

 *         description:
 *      responses:
 *        200:
 *          description: Successfully created data
 */
router.get('/web/faqCategory', async (req: Request, res: Response) => {
    await faqController.faqCategory(req, res);
});
export default router;
