import express, { Request, Response, NextFunction } from 'express';
import authTokenMiddleware from '../middlewares/authToken.middleware';
import authTokenBackendMiddleware from '../middlewares/authTokenBackend.middleware';
import CourseController from '../controllers/course.controller';

const router = express.Router();

/**
 * @swagger
 * /web/courseList:
 *    get:
 *      tags:
 *        - Web_Course
 *      security:
 *        - BearerAuth: []
 *      summary: แสดงรายการหลักสูตร
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
 *          description: Successful
 */
router.get(
    '/web/courseList',
    async (req: Request, res: Response, next: NextFunction) => {
        await CourseController.courseList(req, res, next);
    },
);

/**
 * @swagger
 * /web/courseById:
 *   get:
 *     summary: แสดงรายละเอียดหลักสูตรตาม course_id
 *     tags:
 *       - Web_Course
 *     security:
 *        - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: course_id
 *         required: true
 *         schema:
 *           type: string
 *         description:
 *     responses:
 *       200:
 *         description: Successful
 */
router.get(
    '/web/courseById',
    async (req: Request, res: Response, next: NextFunction) => {
        await CourseController.courseById(req, res);
    },
);

/**
 * @swagger
 * tags:
 *   - Web_Course
 * /web/courseCategory:
 *   get:
 *     summary: แสดงหมวดหมู่กรพัฒนา
 *     tags:
 *       - Web_Course
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
router.get('/web/courseCategory', CourseController.categoryList);

/**
 * @swagger
 * /web/generationList:
 *    get:
 *      tags:
 *        - Web_Course
 *      security:
 *        - BearerAuth: []
 *      summary: แสดงรายการรุ่นในหลักสูตร
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
 *         name: course_id
 *         required: true
 *         schema:
 *           type: string
 *         description:
 *      responses:
 *        200:
 *          description: Successful
 */
router.get(
    '/web/generationList',
    async (req: Request, res: Response, next: NextFunction) => {
        await CourseController.generationList(req, res, next);
    },
);

/**
 * @swagger
 * /web/generationCheckRegister:
 *   get:
 *     summary: ตรวจสอบข้อมูลการลงทะเบียนในรุ่น
 *     tags:
 *       - Web_Course
 *     security:
 *        - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: generation_id
 *         required: true
 *         schema:
 *           type: string
 *         description:
 *     responses:
 *       200:
 *         description: Successful
 */
router.get(
    '/web/generationCheckRegister',
    async (req: Request, res: Response, next: NextFunction) => {
        await CourseController.generationCheckRegister(req, res);
    },
);

/**
 * @swagger
 * /web/generationRegisterInsert:
 *    post:
 *      tags:
 *        - Web_Course
 *      security:
 *        - BearerAuth: []
 *      description: generationRegisterInsert
 *      summary: บันทึกลงทะเบียนเป็นสามาชิกในรุ่น
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
 *                    generation_id:
 *                      type: integer
 *                      example: "MQ=="
 *                    register_type_id:
 *                      type: integer
 *                      example: "MA=="
 *                dataType:
 *                  type: object
 *                  properties:
 *                    generation_id:
 *                      type: string
 *                      example: "int"
 *                    register_type_id:
 *                      type: string
 *                      example: "int"
 *
 *      responses:
 *        200:
 *          description: Successful
 */

router.post(
    '/web/generationRegisterInsert',
    authTokenMiddleware,
    async (req: Request, res: Response) => {
        await CourseController.generationRegisterInsert(req, res);
    },
);

/**
 * @swagger
 * /web/generationById:
 *   get:
 *     summary: แสดงรายละเอียดรุ่นตาม generation_id
 *     tags:
 *       - Web_Course
 *     security:
 *        - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: generation_id
 *         required: true
 *         schema:
 *           type: string
 *         description:
 *     responses:
 *       200:
 *         description: Successful
 */
router.get(
    '/web/generationById',
    async (req: Request, res: Response, next: NextFunction) => {
        await CourseController.generationById(req, res);
    },
);

/**
 * @swagger
 * /web/learningList:
 *    get:
 *      tags:
 *        - Web_Course
 *      security:
 *        - BearerAuth: []
 *      summary: แสดงรายการบทเรียนในรุ่น
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
 *         name: generation_id
 *         required: true
 *         schema:
 *           type: string
 *         description:
 *      responses:
 *        200:
 *          description: Successful
 */
router.get(
    '/web/learningList',
    async (req: Request, res: Response, next: NextFunction) => {
        await CourseController.learningList(req, res, next);
    },
);

/**
 * @swagger
 * /web/learningCheckSelected:
 *   get:
 *     summary: ตรวจสอบการเข้าเรียนในบทเรียน
 *     tags:
 *       - Web_Course
 *     security:
 *        - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: learn_id
 *         required: true
 *         schema:
 *           type: string
 *         description:
 *     responses:
 *       200:
 *         description: Successful
 */
router.get(
    '/web/learningCheckSelected',
    async (req: Request, res: Response, next: NextFunction) => {
        await CourseController.learningCheckSelected(req, res);
    },
);

/**
 * @swagger
 * /web/learningById:
 *   get:
 *     summary: แสดงรายละเอียดรบทเรียนตาม learn_id
 *     tags:
 *       - Web_Course
 *     security:
 *        - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: learn_id
 *         required: true
 *         schema:
 *           type: string
 *         description:
 *     responses:
 *       200:
 *         description: Successful
 */
router.get(
    '/web/learningById',
    async (req: Request, res: Response, next: NextFunction) => {
        await CourseController.learningById(req, res);
    },
);

/**
 * @swagger
 * /web/learningPlayerAction:
 *    post:
 *      tags:
 *        - Web_Course
 *      security:
 *        - BearerAuth: []
 *      description: learningPlayerAction
 *      summary: บันทึก Player Action
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
 *                    learn_id:
 *                      type: integer
 *                      example: "MQ=="
 *                    player_action:
 *                      type: varchar
 *                      example: "cGxheQ=="
 *                    player_seeked_time:
 *                      type: integer
 *                      example: "MA=="
 *                dataType:
 *                  type: object
 *                  properties:
 *                    learn_id:
 *                      type: string
 *                      example: "int"
 *                    player_action:
 *                      type: string
 *                      example: "varchar"
 *                    player_seeked_time:
 *                      type: string
 *                      example: "int"
 *
 *      responses:
 *        200:
 *          description: Successful
 */

router.post(
    '/web/learningPlayerAction',
    authTokenMiddleware,
    async (req: Request, res: Response) => {
        await CourseController.learningPlayerAction(req, res);
    },
);

/**
 * @swagger
 * /web/yearList:
 *    get:
 *      tags:
 *        - Web_Course
 *      security:
 *        - BearerAuth: []
 *      summary: แสดงรายการปีงบประมาณ
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
 *          description: Successful
 */
router.get(
    '/web/yearList',
    async (req: Request, res: Response, next: NextFunction) => {
        await CourseController.yearList(req, res, next);
    },
);

/**
 * @swagger
 * /web/courseLearningHistoryList:
 *    get:
 *      tags:
 *        - Web_Course
 *      security:
 *        - BearerAuth: []
 *      summary: แสดงรายการประวัติการเรียน
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
 *         name: year_id
 *         required: false
 *         schema:
 *           type: string
 *         description:
 *      responses:
 *        200:
 *          description: Successful
 */
router.get(
    '/web/courseLearningHistoryList',
    async (req: Request, res: Response, next: NextFunction) => {
        await CourseController.courseLearningHistoryList(req, res, next);
    },
);

/**
 * @swagger
 * /web/cancelRegister:
 *    post:
 *      tags:
 *        - Web_Course
 *      security:
 *        - BearerAuth: []
 *      description: cancelRegister
 *      summary: ยกเลิกการเป็นสมาชิก
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
 *                    generation_id:
 *                      type: integer
 *                      example: "MQ=="
 *                dataType:
 *                  type: object
 *                  properties:
 *                    generation_id:
 *                      type: string
 *                      example: "int"
 *      responses:
 *        200:
 *          description: Successful
 */
router.post(
    '/web/cancelRegister',
    authTokenMiddleware,
    async (req: Request, res: Response) => {
        await CourseController.cancelRegister(req, res);
    },
);

export default router;
