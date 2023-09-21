import express, { NextFunction, Request, Response } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import liveController from '../controllers/live.controller';

const router = express.Router();

/**
 * @swagger
 * /mobile/liveList:
 *    get:
 *      tags:
 *        - Mobile_Live
 *      description: live
 *      summary: แสดงรายการถ่ายทอดสด
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
 *           format:
 *         description:
 *       - in: query
 *         name: keyword
 *         required: false
 *         schema:
 *           type: string
 *           format:
 *         description:
 *       - in: query
 *         name: lang
 *         required: false
 *         schema:
 *           type: string
 *           format:
 *         description:
 *       - in: query
 *         name: startdate
 *         required: false
 *         schema:
 *           type: string
 *           format:
 *         description:
 *       - in: query
 *         name: enddate
 *         required: false
 *         schema:
 *           type: string
 *           format:
 *         description:
 *      responses:
 *        200:
 *          description: Successful
 *        404:
 *         description: Not found
 */
router.get('/mobile/liveList', async (req: Request, res: Response) => {
    await liveController.liveList(req, res);
});

/**
 * @swagger
 * /mobile/liveById:
 *   get:
 *     summary: แสดงรายการรายการถ่ายอดสด ตาม schedule_id
 *     tags:
 *       - Mobile_Live
 *     parameters:
 *       - in: query
 *         name: schedule_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful
 *       404:
 *         description: Not found
 */
router.get('/mobile/liveById', async (req: Request, res: Response) => {
    await liveController.liveById(req, res);
});

/**
 * @swagger
 * /mobile/liveCategory:
 *   get:
 *     summary: แสดงรายการหมวดหมู่ถ่ายทอดสด
 *     tags:
 *       - Mobile_Live
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *         description: limit
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         description: page
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *         description: page
 *     responses:
 *       200:
 *         description: Successful
 *       404:
 *         description: Not found
 */
router.get('/mobile/liveCategory', async (req: Request, res: Response) => {
    await liveController.liveCategory(req, res);
});

/**
 * @swagger
 * /mobile/liveView:
 *    post:
 *      tags:
 *        - Mobile_Live
 *      description: อัพเดทยอดวิวถ่ายทอดสด
 *      summary: อัพเดทยอดวิวถ่ายทอดสด
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
 *                     schedule_id :
 *                        type : string
 *                        example : NA==
 *                dataType:
 *                   type : object
 *                   properties:
 *                     schedule_id :
 *                      type : string
 *                      example : int
 *      responses:
 *        200:
 *          description: Successful
 *
 */
router.post(
    '/mobile/liveView',
    async (req: Request, res: Response, next: NextFunction) => {
        await liveController.liveView(req, res, next);
    },
);

export default router;
