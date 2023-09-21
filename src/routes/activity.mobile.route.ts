import express, { NextFunction, Request, Response } from 'express';
import authTokenMiddleware from '../middlewares/authToken.middleware';
import authTokenBackendMiddleware from '../middlewares/authTokenBackend.middleware';
import activityController from '../controllers/activity.controller';

const router = express.Router();

/**
 * @swagger
 * /mobile/activityList:
 *    get:
 *      tags:
 *        - Mobile_Activity
 *      description: activity
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
router.get('/mobile/activityList', async (req: Request, res: Response) => {
    await activityController.getList(req, res);
});

/**
 * @swagger
 * /mobile/activityCalendarActivityCourseList:
 *    get:
 *      tags:
 *        - Mobile_Activity
 *      security:
 *        - BearerAuth: []
 *      description: activity
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
    '/mobile/activityCalendarActivityCourseList',
    async (req: Request, res: Response) => {
        await activityController.activityCalendarActivityCourse(req, res);
    },
);

/**
 * @swagger
 * /mobile/activityById:
 *   get:
 *     summary: แสดง activity ตาม id
 *     tags:
 *       - Mobile_Activity
 *     parameters:
 *       - in: query
 *         name: activity_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully
 *       404:
 *         description: Not found
 */
router.get('/mobile/activityById', async (req: Request, res: Response) => {
    await activityController.getActivityById(req, res);
});

/**
 * @swagger
 * /mobile/activityCategory:
 *   get:
 *     summary: แสดงรายการหมวดหมู่ activity
 *     tags:
 *       - Mobile_Activity
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: true
 *         schema:
 *           type: string

 *         description: limit
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: string
 *         description: page
 *     responses:
 *       200:
 *         description: Successful
 *       404:
 *         description: Not found
 */
router.get('/mobile/activityCategory', async (req: Request, res: Response) => {
    await activityController.categoryActivity(req, res);
});

/**
 * @swagger
 * /mobile/activityViews:
 *    post:
 *      tags:
 *        - Mobile_Activity
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
 *                        type : string
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
    '/mobile/activityViews',
    async (req: Request, res: Response, next: NextFunction) => {
        await activityController.activityView(req, res, next);
    },
);

export default router;
