/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import bannerController from '../controllers/banner.controller';
import Joi, { ObjectSchema } from 'joi';
import convertSchema from 'joi-to-swagger';
// import rateLimit from '../helpers/ratelimit.helper';
import validateMiddleware from '../middlewares/validate.middleware';
import authValidate from '../validates/auth.validate';
const router = express.Router();
/**
 * @swagger
 * /web/bannerList:
 *    get:
 *      tags:
 *        - Web_Banner
 *      description: banner
 *      summary: แสดงรายการ banner
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
 *         name: position
 *         required: false
 *         schema:
 *           type: string
 *           enum: [bottom, top]
 *         description:
 *      responses:
 *        200:
 *          description: Successfully created data
 */
router.get('/web/bannerList', async (req: Request, res: Response) => {
    await bannerController.getBanner(req, res);
});
export default router;
