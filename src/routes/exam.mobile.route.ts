import express, { Request, Response, NextFunction } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import authController from '../controllers/auth.controller';
import ExamController from '../controllers/exam.controller';
import Joi, { ObjectSchema } from 'joi';
import convertSchema from 'joi-to-swagger';
import validateMiddleware from '../middlewares/validate.middleware';
import authValidate from '../validates/auth.validate';
// import { secretKey } from "../config/app";

const router = express.Router();
/**
 * @swagger
 * /mobile/examList:
 *    get:
 *      tags:
 *        - Mobile_Exam
 *      security:
 *        - BearerAuth: []
 *      summary: แสดงข้อสอบตาม filter parameter (***** หมายเหตุอันนี้ไม่ใช้แล้ว)
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
router.get(
    '/mobile/examList',
    async (req: Request, res: Response, next: NextFunction) => {
        await ExamController.examList(req, res, next);
    },
);

/**
 * @swagger
 * /mobile/examTopicList:
 *    get:
 *      tags:
 *        - Mobile_Exam
 *      security:
 *        - BearerAuth: []
 *      summary: แสดงหัวข้อ/รายการข้อสอบ filter parameter (***** หมายเหตุอันนี้ไม่ใช้แล้ว)
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
 *       - in: query
 *         name: exam_id
 *         required: true
 *         schema:
 *           type: string
 *         description:
 *      responses:
 *        200:
 *          description: Successfully created data
 */
router.get(
    '/mobile/examTopicList',
    async (req: Request, res: Response, next: NextFunction) => {
        await ExamController.examTopicList(req, res, next);
    },
);

/**
 * @swagger
 * /mobile/examData:
 *    get:
 *      tags:
 *        - Mobile_Exam
 *      security:
 *        - BearerAuth: []
 *      summary: แสดงรายละเอียดข้อมูลข้อสอบตาม exam_id
 *      parameters:
 *       - in: query
 *         name: exam_id
 *         required: true
 *         schema:
 *           type: string
 *         description:
 *      responses:
 *        200:
 *          description: Successful
 */
router.get(
    '/mobile/examData',
    async (req: Request, res: Response, next: NextFunction) => {
        await ExamController.examData(req, res, next);
    },
);

/**
 * @swagger
 * /mobile/examTopicData:
 *    post:
 *      tags:
 *        - Mobile_Exam
 *      security:
 *        - BearerAuth: []
 *      description: Exam Topic Data
 *      summary: ส่งข้อยืนยันการทำข้อสอบพร้อมบันทึกเวลาเริ่มทำ และ บันทึก quiz เพื่อรับค่า quiz_id (*** เมื่อมี quiz_id เดิมส่งไป จะเป็นการ get เพื่อ return exam_topic เดิม)
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
 *                    exam_id:
 *                      type: int
 *                      example: MQ==
 *                    quiz_id:
 *                      type: int
 *                      example: MQ==
 *                    module_type:
 *                      type: string
 *                      example: Y291cnNl
 *                    content_id:
 *                      type: int
 *                      example: MQ==
 *                dataType:
 *                  type: object
 *                  properties:
 *                    exam_id:
 *                      type: string
 *                      example: "int"
 *                    quiz_id:
 *                      type: string
 *                      example: "int"
 *                    module_type:
 *                      type: string
 *                      example: "varchar"
 *                    content_id:
 *                      type: string
 *                      example: "int"
 *      responses:
 *        200:
 *          description: Successful
 */

router.post('/mobile/examTopicData', async (req: Request, res: Response) => {
    await ExamController.examTopicData(req, res);
});
/**
 * @swagger
 * /mobile/examSave:
 *    post:
 *      tags:
 *        - Mobile_Exam
 *      security:
 *        - BearerAuth: []
 *      description: Exam Save
 *      summary: บันทึกข้อสอบ
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
 *                    exam_id:
 *                      type: int
 *                      example: MQ==
 *                    quiz_id:
 *                      type: int
 *                      example: MQ==
 *                    exam_topic:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          exam_topic_id:
 *                            type: integer
 *                            example: MQ==
 *                          exam_type_id:
 *                            type: integer
 *                            example: Mg==
 *                          exam_answer_id:
 *                            type: integer
 *                            example: MQ==
 *                          exam_answer_text:
 *                            type: string
 *                            example:
 *                dataType:
 *                  type: object
 *                  properties:
 *                    exam_id:
 *                      type: string
 *                      example: "int"
 *                    quiz_id:
 *                      type: string
 *                      example: "int"
 *                    exam_topic:
 *                      type: object
 *                      properties:
 *                        exam_topic_id:
 *                          type: string
 *                          example: "int"
 *                        exam_type_id:
 *                          type: string
 *                          example: "int"
 *                        exam_answer_id:
 *                          type: string
 *                          example: "int"
 *                        exam_answer_text:
 *                          type: string
 *                          example: "varchar"
 *      responses:
 *        200:
 *          description: Successful
 */

router.post('/mobile/examSave', async (req: Request, res: Response) => {
    await ExamController.examSave(req, res);
});

export default router;
