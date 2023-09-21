import express, { Request, Response } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import newsController from '../controllers/news.controller';
import Joi, { ObjectSchema } from 'joi';
import convertSchema from 'joi-to-swagger';
// import rateLimit from '../helpers/ratelimit.helper';
import validateMiddleware from '../middlewares/validate.middleware';
import authValidate from '../validates/auth.validate';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   - Web_News
 * /web/newsList:
 *   get:
 *     summary: แสดงข่าวสารตาม filter parameter
 *     tags:
 *       - Web_News
 *     parameters:
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
 *       - in: query
 *         name: keyword
 *         required: false
 *         schema:
 *           type: string
 *         description:
 *       - in: query
 *         name: tags
 *         required: false
 *         schema:
 *           type: string
 *         description:
 *       - in: query
 *         name: relate_news_id
 *         required: false
 *         schema:
 *           type: string
 *         description:
 *
 *     responses:
 *       200:
 *         description: Example updated successfully
 */
router.get('/web/newsList', newsController.getList);
/**
 * @swagger
 * tags:
 *   - Web_News
 * /web/newsById:
 *   get:
 *     summary: แสดงข่าวสารตาม news id
 *     tags:
 *       - Web_News
 *     parameters:
 *       - in: query
 *         name: news_id
 *         required: true
 *         schema:
 *           type: string
 *         description:
 *     responses:
 *       200:
 *         description: Example updated successfully
 */
router.get('/web/newsById', newsController.getById);
/**
 * @swagger
 * tags:
 *   - Web_News
 * /web/newsCategory:
 *   get:
 *     summary: แสดงหมวดหมู่ของข่าวสาร
 *     tags:
 *       - Web_News
 *     parameters:
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
 *     responses:
 *       200:
 *         description: Example updated successfully
 */
router.get('/web/newsCategory', newsController.categoryList);

/**
 * @swagger
 * /web/newsViews:
 *    post:
 *      tags:
 *        - Web_News
 *      description: update
 *      summary: อัพเดทยอด วิวของข่าวสาร
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
 *                     news_id :
 *                        type : string
 *                        example : MQ==
 *                dataType:
 *                   type : object
 *                   properties:
 *                     news_id :
 *                      type : string
 *                      example : int
 *      responses:
 *        200:
 *          description: Successfully created data
 */
router.post('/web/newsViews', (req: Request, res: Response) => {
    newsController.newsViews(req, res);
});

export default router;
