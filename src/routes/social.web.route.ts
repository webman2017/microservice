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
 * /web/socialList:
 *    get:
 *      tags:
 *        - Web_Social
 *      description: social
 *      summary: หน้าแรก Social
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
router.get('/web/socialList', (req: Request, res: Response) => {
    social.social(req, res);
    // res.sendStatus(200);
});

/**
 * @swagger
 * tags:
 *   - Web_Social
 * /web/socialById:
 *   get:
 *     summary: หน้าแรก Social by id
 *     tags:
 *       - Web_Social
 *     parameters:
 *       - in: query
 *         name: social_id
 *         required: true
 *         schema:
 *           type: string
 *         description: socialId
 *     responses:
 *       200:
 *         description: Example updated successfully
 *       404:
 *         description: Example not found
 */
router.get('/web/socialById', async (req: Request, res: Response) => {
    await social.socialById(req, res);
});
export default router;
