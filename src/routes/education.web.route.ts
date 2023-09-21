import express, { Request, Response, NextFunction } from 'express';
import authTokenMiddleware from '../middlewares/authToken.middleware';
import EducationController from '../controllers/education.controller';

const router = express.Router();
/**
 * @swagger
 * /web/educationList:
 *    get:
 *      tags:
 *        - Web_Education
 *      security:
 *        - BearerAuth: []
 *      summary: แสดงการศึกษาตาม filter parameter
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
    '/web/educationList',
    authTokenMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        await EducationController.educationList(req, res, next);
    },
);

/**
 * @swagger
 * /web/educationLevelList:
 *    get:
 *      tags:
 *        - Web_Education
 *      security:
 *        - BearerAuth: []
 *      summary: แสดงระดับการศึกษาตาม filter parameter
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
    '/web/educationLevelList',
    authTokenMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        await EducationController.educationLevelList(req, res, next);
    },
);

/**
 * @swagger
 * /web/educationById:
 *    get:
 *      tags:
 *        - Web_Education
 *      security:
 *        - BearerAuth: []
 *      summary: แสดงการศึกษาตาม id
 *      parameters:
 *       - in: query
 *         name: id
 *         required: false
 *         schema:
 *           type: string
 *         description:
 *      responses:
 *        200:
 *          description: Successful
 */
router.get(
    '/web/educationById',
    async (req: Request, res: Response, next: NextFunction) => {
        await EducationController.educationById(req, res);
    },
);

/**
 * @swagger
 * /web/educationInsert:
 *    post:
 *      tags:
 *        - Web_Education
 *      security:
 *        - BearerAuth: []
 *      description: Education Insert
 *      summary: บันทึกการศึกษา
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
 *                    per_cardno:
 *                      type: string
 *                      example: MzA0MDc2MjQxNzIwNA==
 *                    education_name:
 *                      type: string
 *                      example: WldSMVkyRjBhVzl1WDI1aGJXVT0=
 *                    educmajor_name:
 *                      type: string
 *                      example: WldSMVkyMWhhbTl5WDI1aGJXVT0=
 *                    educlevel_name:
 *                      type: string
 *                      example: WldSMVkyeGxkbVZzWDI1aGJXVT0=
 *                    other_institute:
 *                      type: string
 *                      example: YjNSb1pYSmZhVzV6ZEdsMGRYUmw=
 *                    edu_endyear:
 *                      type: string
 *                      example: TWpVMU9BPT0=
 *                    edu_grade:
 *                      type: string
 *                      example: TXk0Mk5BPT0=
 *                    attach_id:
 *                      type: string
 *                      example: ""
 *                dataType:
 *                  type: object
 *                  properties:
 *                    per_cardno:
 *                      type: string
 *                      example: "varchar"
 *                    education_name:
 *                      type: string
 *                      example: "varchar"
 *                    educmajor_name:
 *                      type: string
 *                      example: "varchar"
 *                    educlevel_name:
 *                      type: string
 *                      example: "varchar"
 *                    other_institute:
 *                      type: string
 *                      example: "varchar"
 *                    edu_endyear:
 *                      type: string
 *                      example: "varchar"
 *                    edu_grade:
 *                      type: string
 *                      example: "varchar"
 *                    attach_id:
 *                      type: string
 *                      example: "varchar"
 *      responses:
 *        200:
 *          description: Successful
 */

router.post(
    '/web/educationInsert',
    authTokenMiddleware,
    async (req: Request, res: Response) => {
        await EducationController.educationInsert(req, res);
    },
);

/**
 * @swagger
 * /web/educationUpdate:
 *    post:
 *      tags:
 *        - Web_Education
 *      security:
 *        - BearerAuth: []
 *      description: Education Update
 *      summary: แก้ไขการศึกษา
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
 *                    id:
 *                      type: int
 *                      example: Njg3NQ==
 *                    per_cardno:
 *                      type: string
 *                      example: MzA0MDc2MjQxNzIwNA==
 *                    education_name:
 *                      type: string
 *                      example: ZWR1Y2F0aW9uX25hbWUgZWR1Y2F0aW9uX25hbWU=
 *                    educmajor_name:
 *                      type: string
 *                      example: WldSMVkyMWhhbTl5WDI1aGJXVT0=
 *                    educlevel_name:
 *                      type: string
 *                      example: WldSMVkyeGxkbVZzWDI1aGJXVT0=
 *                    other_institute:
 *                      type: string
 *                      example: YjNSb1pYSmZhVzV6ZEdsMGRYUmw=
 *                    edu_endyear:
 *                      type: string
 *                      example: TWpVMU9BPT0=
 *                    edu_grade:
 *                      type: string
 *                      example: TXk0Mk5BPT0=
 *                    attach_id:
 *                      type: string
 *                      example: ""
 *                dataType:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: int
 *                      example: "id"
 *                    per_cardno:
 *                      type: string
 *                      example: "varchar"
 *                    education_name:
 *                      type: string
 *                      example: "varchar"
 *                    educmajor_name:
 *                      type: string
 *                      example: "varchar"
 *                    educlevel_name:
 *                      type: string
 *                      example: "varchar"
 *                    other_institute:
 *                      type: string
 *                      example: "varchar"
 *                    edu_endyear:
 *                      type: string
 *                      example: "varchar"
 *                    edu_grade:
 *                      type: string
 *                      example: "varchar"
 *                    attach_id:
 *                      type: string
 *                      example: "varchar"
 *      responses:
 *        200:
 *          description: Successful
 */

router.post(
    '/web/educationUpdate',
    authTokenMiddleware,
    async (req: Request, res: Response) => {
        await EducationController.educationUpdate(req, res);
    },
);

/**
 * @swagger
 * /web/educationDelete:
 *    post:
 *      tags:
 *        - Web_Education
 *      security:
 *        - BearerAuth: []
 *      description: Education Delete
 *      summary: ลบการศึกษา
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
 *                    id:
 *                      type: int
 *                      example: Njg4Mw==
 *                dataType:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: int
 *                      example: "id"
 *      responses:
 *        200:
 *          description: Successful
 */

router.post(
    '/web/educationDelete',
    authTokenMiddleware,
    async (req: Request, res: Response) => {
        await EducationController.educationDelete(req, res);
    },
);

export default router;
