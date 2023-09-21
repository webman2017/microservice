import express, { Request, Response, NextFunction } from 'express';
import authTokenMiddleware from '../middlewares/authToken.middleware';
import authTokenBackendMiddleware from '../middlewares/authTokenBackend.middleware';
import CoachController from '../controllers/coach.controller';

const router = express.Router();
/**
 * @swagger
 * /web/coachScheduleList:
 *    get:
 *      tags:
 *        - Web_Coach
 *      security:
 *        - BearerAuth: []
 *      summary: แสดงแผนการสอนของพี่เลี้ยง
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
 *         name: coach_id
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
 *         name: startdate
 *         required: false
 *         schema:
 *           type: string
 *         description:
 *       - in: query
 *         name: enddate
 *         required: false
 *         schema:
 *           type: string
 *         description:
 *      responses:
 *        200:
 *          description: Successful
 */

router.get(
    '/web/coachScheduleList',
    async (req: Request, res: Response, next: NextFunction) => {
        await CoachController.coachScheduleList(req, res, next);
    },
);

/**
 * @swagger
 * /web/coachScheduleById:
 *   get:
 *     summary: แสดงแผนการสอนของพี่เลี้ยงตาม schedule id
 *     tags:
 *       - Web_Coach
 *     security:
 *        - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: coach_schedule_id
 *         required: true
 *         schema:
 *           type: string
 *         description:
 *     responses:
 *       200:
 *         description: Successful
 */
router.get(
    '/web/coachScheduleById',
    async (req: Request, res: Response, next: NextFunction) => {
        await CoachController.coachScheduleById(req, res);
    },
);

/**
 * @swagger
 * /web/coachScheduleOndemand:
 *   get:
 *     summary: แสดงวีดีโอย้อนหลังแผนการสอนของพี่เลี้ยงตาม schedule id
 *     tags:
 *       - Web_Coach
 *     security:
 *        - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: coach_schedule_id
 *         required: true
 *         schema:
 *           type: string
 *         description:
 *     responses:
 *       200:
 *         description: Successful
 */
router.get(
    '/web/coachScheduleOndemand',
    async (req: Request, res: Response, next: NextFunction) => {
        await CoachController.coachScheduleOndemand(req, res);
    },
);

/**
 * @swagger
 * /web/coachScheduleMemos:
 *   get:
 *     summary: แสดงบันทึกสนทนาแผนการสอนของพี่เลี้ยงตาม schedule id
 *     tags:
 *       - Web_Coach
 *     security:
 *        - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: coach_schedule_id
 *         required: true
 *         schema:
 *           type: string
 *         description:
 *     responses:
 *       200:
 *         description: Successful
 */
router.get(
    '/web/coachScheduleMemos',
    authTokenBackendMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        await CoachController.coachScheduleMemos(req, res);
    },
);

/**
 * @swagger
 * /web/coachScheduleMemosById:
 *   get:
 *     summary: แสดงบันทึกสนทนาแผนการสอนของพี่เลี้ยงตาม memo id
 *     tags:
 *       - Web_Coach
 *     security:
 *        - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: memo_id
 *         required: true
 *         schema:
 *           type: string
 *         description:
 *     responses:
 *       200:
 *         description: Successful
 */
router.get(
    '/web/coachScheduleMemosById',
    async (req: Request, res: Response, next: NextFunction) => {
        await CoachController.coachScheduleMemosById(req, res);
    },
);

/**
 * @swagger
 * /web/coachList:
 *    get:
 *      tags:
 *        - Web_Coach
 *      security:
 *        - BearerAuth: []
 *      summary: แสดงข้อมูลลงทะเบียนพี่เลี้ยง
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
 *         name: startdate
 *         required: false
 *         schema:
 *           type: string
 *         description:
 *       - in: query
 *         name: enddate
 *         required: false
 *         schema:
 *           type: string
 *         description:
 *       - in: query
 *         name: list_type
 *         required: false
 *         schema:
 *           type: string
 *         description:
 *      responses:
 *        200:
 *          description: Successful
 */

router.get(
    '/web/coachList',
    async (req: Request, res: Response, next: NextFunction) => {
        await CoachController.coachList(req, res, next);
    },
);

/**
 * @swagger
 * /web/coachById:
 *   get:
 *     summary: แสดงข้อมูลลงทะเบียนพี่เลี้ยงตาม coach id
 *     tags:
 *       - Web_Coach
 *     security:
 *        - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: coach_id
 *         required: true
 *         schema:
 *           type: string
 *         description:
 *     responses:
 *       200:
 *         description: Successful
 */
router.get(
    '/web/coachById',
    async (req: Request, res: Response, next: NextFunction) => {
        await CoachController.coachById(req, res);
    },
);

/**
 * @swagger
 * /web/coachInsertMemos:
 *    post:
 *      tags:
 *        - Web_Coach
 *      security:
 *        - BearerAuth: []
 *      description: coachInsertMemos
 *      summary: บันทึกข้อมูลสนทนา
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    coach_schedule_id:
 *                      type: integer
 *                      example: "NQ=="
 *                    memo_type:
 *                      type: integer
 *                      example: "MQ=="
 *                    title:
 *                      type: string
 *                      example: "4Liq4Lit4Lia4LiW4Liy4Lih4LiC4LmJ4Lit4Lih4Li54Lil4LmA4Lie4Li04LmI4Lih4LmA4LiV4Li04Lih"
 *                    details:
 *                      type: string
 *                      example: "4LiX4LiU4Liq4Lit4LiaIGFwaQ=="
 *                dataType:
 *                  type: object
 *                  properties:
 *                    coach_schedule_id:
 *                      type: string
 *                      example: "int"
 *                    memo_type:
 *                      type: string
 *                      example: "int"
 *                    title:
 *                      type: string
 *                      example: "varchar"
 *                    details:
 *                      type: string
 *                      example: "varchar"
 *
 *      responses:
 *        200:
 *          description: Successful
 */

router.post(
    '/web/coachInsertMemos',
    authTokenMiddleware,
    async (req: Request, res: Response) => {
        await CoachController.coachInsertMemos(req, res);
    },
);

/**
 * @swagger
 * /web/coachUpdateMemos:
 *    post:
 *      tags:
 *        - Web_Coach
 *      security:
 *        - BearerAuth: []
 *      description: coachUpdateMemos
 *      summary: แก้ไขข้อมูลสนทนา
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    memo_id:
 *                      type: integer
 *                      example: "Mg=="
 *                    memo_type:
 *                      type: integer
 *                      example: "MQ=="
 *                    title:
 *                      type: string
 *                      example: "4Liq4Lit4Lia4LiW4Liy4Lih4LiC4LmJ4Lit4Lih4Li54Lil4LmA4Lie4Li04LmI4Lih4LmA4LiV4Li04Lih"
 *                    details:
 *                      type: string
 *                      example: "4LiX4LiU4Liq4Lit4LiaIGFwaQ=="
 *                dataType:
 *                  type: object
 *                  properties:
 *                    memo_id:
 *                      type: string
 *                      example: "int"
 *                    memo_type:
 *                      type: string
 *                      example: "int"
 *                    title:
 *                      type: string
 *                      example: "varchar"
 *                    details:
 *                      type: string
 *                      example: "varchar"
 *
 *      responses:
 *        200:
 *          description: Successful
 */

router.post(
    '/web/coachUpdateMemos',
    authTokenMiddleware,
    async (req: Request, res: Response) => {
        await CoachController.coachUpdateMemos(req, res);
    },
);

/**
 * @swagger
 * /web/coachDeleteMemos:
 *    post:
 *      tags:
 *        - Web_Coach
 *      security:
 *        - BearerAuth: []
 *      description: coachDeleteMemos
 *      summary: ลบข้อมูลสนทนา
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    memo_id:
 *                      type: integer
 *                      example: "Mg=="
 *                dataType:
 *                  type: object
 *                  properties:
 *                    memo_id:
 *                      type: string
 *                      example: "int"
 *
 *      responses:
 *        200:
 *          description: Successful
 */

router.post(
    '/web/coachDeleteMemos',
    authTokenMiddleware,
    async (req: Request, res: Response) => {
        await CoachController.coachDeleteMemos(req, res);
    },
);

/**
 * @swagger
 * /web/coachScheduleUpdateSelfAttend:
 *    post:
 *      tags:
 *        - Web_Coach
 *      security:
 *        - BearerAuth: []
 *      description: coachScheduleUpdateSelfAttend
 *      summary: บันทึกข้อมูลสถานะการเข้าเรียนของประเภทการสอนด้วยตนเอง
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    coach_schedule_id:
 *                      type: integer
 *                      example: "NQ=="
 *                dataType:
 *                  type: object
 *                  properties:
 *                    coach_schedule_id:
 *                      type: string
 *                      example: "int"
 *
 *      responses:
 *        200:
 *          description: Successful
 */

router.post(
    '/web/coachScheduleUpdateSelfAttend',
    async (req: Request, res: Response) => {
        await CoachController.coachScheduleUpdateSelfAttend(req, res);
    },
);
export default router;
