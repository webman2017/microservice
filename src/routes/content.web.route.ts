import express, { Request, Response } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import contentController from '../controllers/content.controller';
import Joi, { ObjectSchema } from 'joi';
import convertSchema from 'joi-to-swagger';
// import rateLimit from '../helpers/ratelimit.helper';
import validateMiddleware from '../middlewares/validate.middleware';
import authValidate from '../validates/auth.validate';
const router = express.Router();

/**
 * @swagger
 * /web/contentList:
 *    get:
 *      tags:
 *        - Web_Content
 *      description: แสดงรายการคลังสื่อวิดีโอ
 *      summary: แสดงรายการคลังสื่อวิดีโอ
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
 *         name: type
 *         required: false
 *         schema:
 *           type: string
 *         description:
 *       - in: query
 *         name: category_id
 *         required: false
 *         schema:
 *           type: string
 *         description:
 *      responses:
 *        200:
 *          description: Successful
 */
router.get('/web/contentList', async (req: Request, res: Response) => {
    console.log(req.body);
    await contentController.contentList(req, res);
});

/**
 * @swagger
 * /web/contentCategory:
 *    get:
 *      tags:
 *        - Web_Content
 *      description: แสดงรายการหมวดหมู่คลังสื่อวิดีโอ
 *      summary: แสดงรายการหมวดหมู่คลังสื่อวิดีโอ
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
 *      responses:
 *        200:
 *          description: Successful
 */
router.get('/web/contentCategory', async (req: Request, res: Response) => {
    await contentController.contentCategory(req, res);
});

/**
 * @swagger
 * /web/contentById:
 *   get:
 *     summary: แสดงคลังสื่อวิดีโอตาม content id
 *     tags:
 *       - Web_Content
 *     parameters:
 *       - in: query
 *         name: content_id
 *         required: true
 *         schema:
 *           type: string
 *         description: contentId
 *     responses:
 *       200:
 *         description: Successful
 *       404:
 *         description: Not found
 */
router.get('/web/contentById', async (req: Request, res: Response) => {
    await contentController.contentById(req, res);
});

/**
 * @swagger
 * /web/contentViews:
 *    post:
 *      tags:
 *        - Web_Content
 *      description: อัพเดทยอดวิวคลังสื่อวิดีโอ
 *      summary: อัพเดทยอดวิวคลังสื่อวิดีโอ
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
 *                     content_id :
 *                        type : integer
 *                        example : Mzg=
 *                dataType:
 *                   type : object
 *                   properties:
 *                     content_id :
 *                      type : string
 *                      example : int
 *      responses:
 *        200:
 *          description: Successfully created data
 */
router.post('/web/contentViews', async (req: Request, res: Response) => {
    await contentController.contentView(req, res);
});

/**
 * @swagger
 * /web/contentViewsEpisode:
 *    post:
 *      tags:
 *        - Web_Content
 *      description: อัพเดทยอดวิว Episode
 *      summary: อัพเดทยอดวิว Episode
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
 *                     episode_id :
 *                        type : integer
 *                        example : Mj0=
 *                dataType:
 *                   type : object
 *                   properties:
 *                     episode_id :
 *                      type : string
 *                      example : int
 *      responses:
 *        200:
 *          description: Successful
 */
router.post('/web/contentViewsEpisode', async (req: Request, res: Response) => {
    await contentController.contentViewEpisode(req, res);
});

export default router;
