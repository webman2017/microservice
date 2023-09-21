import express, { NextFunction, Request, Response } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import authController from '../controllers/auth.controller';

import activityController from '../controllers/activity.controller';
import Joi, { ObjectSchema } from 'joi';
import convertSchema from 'joi-to-swagger';
// import rateLimit from '../helpers/ratelimit.helper';
import validateMiddleware from '../middlewares/validate.middleware';
import authValidate from '../validates/auth.validate';
// import { secretKey } from "../config/app";

const router = express.Router();

/**
 * @swagger
 * /web/activityList:
 *    get:
 *      tags:
 *        - Web_Activity
 *      description: banner
 *      summary: แสดงรายการ activity
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
 */
router.get('/web/activityList', async (req: Request, res: Response) => {
    await activityController.getList(req, res);
});

/**
 * @swagger
 * /web/activityCalendarActivityCourseList:
 *    get:
 *      tags:
 *        - Web_Activity
 *      security:
 *        - BearerAuth: []
 *      description: banner
 *      summary: แสดงรายการปฎิทินกิจกรรมกับปฎิทินหลักสูตร
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
 *         name: keyword
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
 *       - in: query
 *         name: calendar_type
 *         required: false
 *         schema:
 *           type: string
 *           format:
 *         description: live=ตารางถ่ายทอดสด course=คอสเรียน coach=พี่เลี้ยง
 *      responses:
 *        200:
 *          description: Successful
 */
router.get(
    '/web/activityCalendarActivityCourseList',
    async (req: Request, res: Response) => {
        await activityController.activityCalendarActivityCourse(req, res);
    },
);

/**
 * @swagger
 * /web/activityById:
 *   get:
 *     summary: แสดงรายการ activity ตาม activity_id
 *     tags:
 *       - Web_Activity
 *     parameters:
 *       - in: query
 *         name: activity_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful
 *       404:
 *         description: Not found
 */
router.get('/web/activityById', async (req: Request, res: Response) => {
    await activityController.getActivityById(req, res);
});

/**
 * @swagger
 * /web/activityCategory:
 *   get:
 *     summary: แสดงรายการหมวดหมู่ activity
 *     tags:
 *       - Web_Activity
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
 *     responses:
 *       200:
 *         description: Successful
 *       404:
 *         description: Not found
 */
router.get('/web/activityCategory', async (req: Request, res: Response) => {
    await activityController.categoryActivity(req, res);
});

/**
 * @swagger
 * /web/activityViews:
 *    post:
 *      tags:
 *        - Web_Activity
 *      description: อัพเดทยอดวิว activity
 *      summary: อัพเดทยอดวิว activity
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
 *                     activity_id :
 *                        type : integer
 *                        example : MQ==
 *                dataType:
 *                   type : object
 *                   properties:
 *                     activity_id :
 *                      type : string
 *                      example : int
 *      responses:
 *        200:
 *          description: Successful
 *
 */
router.post(
    '/web/activityViews',
    async (req: Request, res: Response, next: NextFunction) => {
        await activityController.activityView(req, res, next);
    },
);

export default router;
