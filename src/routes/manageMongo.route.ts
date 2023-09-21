/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import manage from '../controllers/managementUrl.controller';
import Joi, { ObjectSchema } from 'joi';
import convertSchema from 'joi-to-swagger';
// import rateLimit from '../helpers/ratelimit.helper';
import validateMiddleware from '../middlewares/validate.middleware';
import authValidate from '../validates/auth.validate';
// import { secretKey } from "../config/app";
const router = express.Router();

/**
 * @swagger
 * /departmentMongo:
 *    get:
 *      tags:
 *        - Mongo
 *      description: แสดงรายการแผนกทั้งหมด
 *      summary: แสดงรายการแผนกทั้งหมด
 *      parameters:
 *       - in: query
 *         name: fontendName
 *         required: true
 *         schema:
 *           type: string
 *           enum: [bumb, berm,brand]
 *           format:
 *         description: endpoint
 *      responses:
 *        200:
 *          description: Successfully created data
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  description:
 *                    type: string
 *                    example: Successfully created data!
 */
router.get('/departmentMongo', async (req: Request, res: Response) => {
    await manage.getDepartment(req, res);
});
/**
 * @swagger
 * /createDepartmentMongo:
 *    post:
 *      tags:
 *        - Mongo
 *      description: สร้างแผนกใหม่
 *      summary: สร้างแผนกใหม่
 *      parameters:
 *       - in: query
 *         name: fontendName
 *         required: true
 *         schema:
 *           type: string
 *           enum: [bumb, berm,brand]
 *           format:
 *         description: endpoint
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                departmentName:
 *                  type: string
 *                  example: PM
 *                  description: enter your username
 *                departmentCode:
 *                  type: string
 *                  description: project name
 *                  example: 1
 *      responses:
 *        200:
 *          description: Successfully created data
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  description:
 *                    type: string
 *                    example: Successfully created data!
 */
router.post('/createDepartmentMongo', async (req: Request, res: Response) => {
    await manage.createDepartmentMongo(req, res);
});

/**
 * @swagger
 * /getDepartmentByIdMongo/{departmentId}:
 *   get:
 *     summary: แสดงรายการแผนกตาม id
 *     tags:
 *       - Mongo
 *     parameters:
 *       - in: query
 *         name: fontendName
 *         required: true
 *         schema:
 *           type: string
 *           enum: [bumb, berm,brand]
 *       - in: path
 *         name: departmentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Example updated successfully
 */
router.get(
    '/getDepartmentByIdMongo/:departmentId',
    async (req: Request, res: Response) => {
        await manage.getDepartmentByIdMongo(req, res);
    },
);

/**
 * @swagger
 * /updateDepartmentMongo:
 *    put:
 *      tags:
 *        - Mongo
 *      description: อัพเดทชื่อแผนก
 *      summary: อัพเดทชื่อแผนก
 *      parameters:
 *       - in: query
 *         name: fontendName
 *         required: true
 *         schema:
 *           type: string
 *           enum: [bumb, berm,brand]
 *       - in: query
 *         name: departmentId
 *         required: true
 *         schema:
 *           type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                departmentName:
 *                  type: string
 *                  example: p1
 *                departmentCode:
 *                  type: string
 *
 *      responses:
 *        200:
 *          description: Successfully created data
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  description:
 *                    type: string
 *                    example: Successfully created data!
 *
 */
router.put('/updateDepartmentMongo', async (req: Request, res: Response) => {
    await manage.updateDepartmentDB(req, res);
});

/**
 * @swagger
 * /removeDepartmentMongo/{departmentId}:
 *   delete:
 *     summary: ลบข้อมูล department
 *     tags:
 *       - Mongo
 *     parameters:
 *       - in: query
 *         name: fontendName
 *         required: true
 *         schema:
 *           type: string
 *           enum: [bumb, berm,brand]
 *       - in: path
 *         name: departmentId
 *         required: true
 *         schema:
 *           type: string
 *         description:
 *     responses:
 *       200:
 *         description: Example updated successfully
 */

router.delete(
    '/removeDepartmentMongo/:departmentId',
    async (req: Request, res: Response) => {
        console.log(req.params.departmentId);
        await manage.deleteDepartmentDB(req, res);
    },
);

/**
 * @swagger
 * /createUserMongo:
 *    post:
 *      tags:
 *        - Mongo
 *      description: เพิ่มข้อมูลผู้ใช้งานระบบ timesheet
 *      summary: เพิ่มข้อมูลผู้ใช้งานระบบ timesheet
 *      parameters:
 *       - in: query
 *         name: fontendName
 *         required: true
 *         schema:
 *           type: string
 *           enum: [bumb, berm,brand]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  example: test
 *                  description: enter your username
 *                password:
 *                  type: string
 *                  description: project name
 *                  example: P@ssword
 *                firstname:
 *                  type: string
 *                lastname:
 *                   type: string
 *                department:
 *                  type: string
 *                  example: PM
 *
 *      responses:
 *        200:
 *          description: Successfully created data
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  description:
 *                    type: string
 *                    example: Successfully created data!
 *
 */
router.post('/createUserMongo', async (req: Request, res: Response) => {
    await manage.createUserMongo(req, res);
});

/**
 * @swagger
 * /getUserMongo/:
 *   get:
 *     summary: แสดงรายการผู้ใช้งานทุกคนในระบบ
 *     tags:
 *       - Mongo
 *     parameters:
 *       - in: query
 *         name: fontendName
 *         required: true
 *         schema:
 *           type: string
 *           enum: [bumb, berm,brand]
 *     responses:
 *       200:
 *         description: Example updated successfully
 */
router.get('/getUserMongo', async (req: Request, res: Response) => {
    await manage.getUser(req, res);
});

/**
 * @swagger
 * /removeUserMongo/{userId}:
 *   delete:
 *     summary: ลบข้อมูลผู้ใช้งานระบบโดยใช้ userId
 *     tags:
 *       - Mongo
 *     parameters:
 *       - in: query
 *         name: fontendName
 *         required: true
 *         schema:
 *           type: string
 *           enum: [bumb, berm,brand]
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: remove user
 *     responses:
 *       200:
 *         description: Example updated successfully
 */

router.delete(
    '/removeUserMongo/:userId',
    async (req: Request, res: Response) => {
        console.log(req.params.userId);
        await manage.deleteUserMongo(req, res);
    },
);

/**
 * @swagger
 * /updateUserMongo:
 *    put:
 *      tags:
 *        - Mongo
 *      description: อัพเดทผู้ใช้งาน
 *      summary: อัพเดทผู้ใช้งาน
 *      parameters:
 *       - in: query
 *         name: fontendName
 *         required: true
 *         schema:
 *           type: string
 *           enum: [bumb, berm,brand]
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  example: test
 *                  description: enter your username
 *                password:
 *                  type: string
 *                  description:
 *                  example: password
 *                firstname:
 *                  type: string
 *                lastname:
 *                  type: string
 *                department:
 *                  type: string
 *
 *      responses:
 *        200:
 *          description: Successfully created data
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  description:
 *                    type: string
 *                    example: Successfully created data!
 *
 */
router.put('/updateUserMongo', async (req: Request, res: Response) => {
    await manage.updateUserMongo(req, res);
});

/**
 * @swagger
 * /searchUserMongo/:
 *   post:
 *     summary: ค้นหาผู้ใช้งานจากชื่อ
 *     tags:
 *       - Mongo
 *     parameters:
 *       - in: query
 *         name: fontendName
 *         required: true
 *         schema:
 *           type: string
 *           enum: [bumb, berm,brand]
 *       - in: query
 *         name: keyword
 *         required: true
 *         schema:
 *           type: string
 *         description: search name
 *     responses:
 *       200:
 *         description: Example updated successfully
 */
router.post('/searchUserMongo', async (req: Request, res: Response) => {
    await manage.searchUserMongo(req, res);
});

/**
 * @swagger
 * /userLoginMongo:
 *    post:
 *      tags:
 *        - Mongo
 *      description: เข้าสู่ระบบ
 *      summary: เข้าสู่ระบบ
 *      parameters:
 *       - in: query
 *         name: fontendName
 *         required: true
 *         schema:
 *           type: string
 *           enum: [bumb, berm,brand]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  example: test
 *                  description: enter your username
 *                password:
 *                  type: string
 *                  description: project name
 *                  example: P@ssword
 *      responses:
 *        200:
 *          description: Successfully created data
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  description:
 *                    type: string
 *                    example: Successfully created data!
 *
 */
router.post('/userLoginMongo', async (req: Request, res: Response) => {
    await manage.userLoginMongo(req, res);
});

/**
 * @swagger
 * /getTaskMongo:
 *    get:
 *      tags:
 *        - Mongo
 *      description: แสดงรายการงานทั้งหมด
 *      summary: แสดงรายการงานทั้งหมด
 *      parameters:
 *       - in: query
 *         name: fontendName
 *         required: true
 *         schema:
 *           type: string
 *           enum: [bumb, berm,brand]
 *           format:
 *         description: endpoint
 *      responses:
 *        200:
 *          description: Successfully created data
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  description:
 *                    type: string
 *                    example: Successfully created data!
 */

router.get('/getTaskMongo', async (req: Request, res: Response) => {
    await manage.getTaskMongo(req, res);
});
/**
 * @swagger
 * /createTaskTypeMongo:
 *    post:
 *      tags:
 *        - Mongo
 *      description: เพิ่มประเภทงาน
 *      summary: เพิ่มประเภทงาน
 *      parameters:
 *       - in: query
 *         name: fontendName
 *         required: true
 *         schema:
 *           type: string
 *           enum: [bumb, berm,brand]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                taskName:
 *                  type: string
 *                  example: test
 *                  description:
 *
 *      responses:
 *        200:
 *          description: Successfully created data
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  description:
 *                    type: string
 *                    example: Successfully created data!
 *
 */
router.post('/createTaskTypeMongo', async (req: Request, res: Response) => {
    await manage.createTaskTypeMongo(req, res);
});

/**
 * @swagger
 * /removeTaskMongo/{taskId}:
 *   delete:
 *     summary: ลบข้อมูล task
 *     tags:
 *       - Mongo
 *     parameters:
 *       - in: query
 *         name: fontendName
 *         required: true
 *         schema:
 *           type: string
 *           enum: [bumb, berm,brand]
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description:
 *     responses:
 *       200:
 *         description: Example updated successfully
 */

router.delete(
    '/removeTaskmongo/:taskId',
    async (req: Request, res: Response) => {
        console.log(req.params.taskId);
        await manage.deleteTaskMongo(req, res);
    },
);

/**
 * @swagger
 * /getProjectMongo/:
 *   get:
 *     summary: แสดงชื่อรายการโครงการทั้งหมดในระบบ
 *     tags:
 *       - Mongo
 *     parameters:
 *       - in: query
 *         name: fontendName
 *         required: true
 *         schema:
 *           type: string
 *           enum: [bumb, berm,brand]
 *     responses:
 *       200:
 *         description: Example updated successfully
 */

router.get('/getProjectMongo', async (req: Request, res: Response) => {
    await manage.getProjectMongo(req, res);
});

/**
 * @swagger
 * /createProjectMongo:
 *    post:
 *      tags:
 *        - Mongo
 *      description: เพิ่มโครงการในระบบ
 *      summary: เพิ่มโครงการในระบบ
 *      parameters:
 *       - in: query
 *         name: fontendName
 *         required: true
 *         schema:
 *           type: string
 *           enum: [bumb, berm,brand]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                projectCode:
 *                  type: string
 *                  example: 1
 *                projectName:
 *                  type: string
 *                  description: project name
 *                  example: ทดสอบชื่อโปรเจค
 *                startDate:
 *                  type: string
 *                  example: 01-01-2023
 *                endDate:
 *                  type: string
 *                  example: 31-12-2023
 *                warantyTotal:
 *                  type: integer
 *                  example: 365
 *                description:
 *                 example: รายละเอียดโครงการ
 *                projectOwner:
 *                 example: ชื่อเจ้าของโครงการ
 *
 *      responses:
 *        200:
 *          description: Successfully created data
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  description:
 *                    type: string
 *                    example: Successfully created data!
 *
 */
router.post('/createProjectMongo', async (req: Request, res: Response) => {
    await manage.createProjectMongo(req, res);
});

/**
 * @swagger
 * /getProjectByIdMongo/{projectId}:
 *   get:
 *     summary: แสดงรายการโครงการตาม id
 *     tags:
 *       - Mongo
 *     parameters:
 *       - in: query
 *         name: fontendName
 *         required: true
 *         schema:
 *           type: string
 *           enum: [bumb, berm,brand]
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: get project id for edit
 *     responses:
 *       200:
 *         description: Example updated successfully
 */

router.get(
    '/getProjectByIdMongo/:projectId',
    async (req: Request, res: Response) => {
        await manage.getProjectByIdMongo(req, res);
    },
);

/**
 * @swagger
 * /removeProjectMongo/{projectId}:
 *   delete:
 *     summary: ลบข้อมูลโครงการ
 *     tags:
 *       - Mongo
 *     parameters:
 *       - in: query
 *         name: fontendName
 *         required: true
 *         schema:
 *           type: string
 *           enum: [bumb, berm,brand]
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description:
 *     responses:
 *       200:
 *         description: Example updated successfully
 */
router.delete(
    '/removeProjectMongo/:projectId',
    async (req: Request, res: Response) => {
        console.log(req.params.projectId);
        await manage.deleteProjectMongo(req, res);
    },
);
/**
 * @swagger
 * /updateProjectMongo:
 *    put:
 *      tags:
 *        - Mongo
 *      description: อัพเดทรายละเอียดโครงการ
 *      summary: อัพเดทรายละเอียดโครงการ
 *      parameters:
 *       - in: query
 *         name: fontendName
 *         required: true
 *         schema:
 *           type: string
 *           enum: [bumb, berm,brand]
 *       - in: query
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         example: 1
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                department:
 *                  type: string
 *                  example: test
 *                  description: enter your username
 *                projectName:
 *                  type: string
 *                  description: project name
 *                  example: projectName
 *                projectCode:
 *                  type: string
 *                  example: p1
 *                startDate:
 *                  type: string
 *                  example: 2023-07-23
 *                finalDate:
 *                  type: string
 *                  example: 2023-09-02
 *                warantyTotal:
 *                  type: integer
 *                  example: 365
 *
 *      responses:
 *        200:
 *          description: Successfully created data
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  description:
 *                    type: string
 *                    example: Successfully created data!
 *
 */
router.put('/updateProjectMongo', async (req: Request, res: Response) => {
    await manage.updateProjectMongo(req, res);
});

/**
 * @swagger

 * /teamProject/{projectId}:
 *   get:
 *     summary: แสดงรายชื่อผู้รับผิดชอบแต่ละโครงการ
 *     tags:
 *       - App_Project
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description:
 *       - in: query
 *         name: fontendName
 *         required: true
 *         schema:
 *           type: string
 *           enum: [bumb, berm,brand]
 *     responses:
 *       200:
 *         description: Example updated successfully
 */
router.get('/teamProject/:projectId', async (req: Request, res: Response) => {
    await manage.teamProject(req, res);
});

/**
 * @swagger
 * /workingTimeMongo:
 *    post:
 *      tags:
 *        - Mongo
 *      description: ลงเวลาทำงานตามลักษณะงาน
 *      summary: ลงเวลาทำงานตามลักษณะงาน
 *      parameters:
 *       - in: query
 *         name: fontendName
 *         required: true
 *         schema:
 *           type: string
 *           enum: [bumb, berm,brand]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                projectId:
 *                  type: string
 *                  example: 1
 *                  description: projectId
 *                userId:
 *                  type: string
 *                taskId:
 *                  type: string
 *                date:
 *                  type: string
 *                  example: 03-07-2023
 *                hourTotal:
 *                 type: float
 *                 example: 0.0
 *                description:
 *                 type: string
 *      responses:
 *        200:
 *          description: Successfully created data
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  description:
 *                    type: string
 *                    example: Successfully created data!
 *
 */
router.post('/workingTimeMongo', async (req: Request, res: Response) => {
    await manage.workingTimeMongo(req, res);
});

/**
 * @swagger

 * /getTimeSheetMongo/{userId}:
 *   get:
 *     summary: แสดงรายการลงเวลาตาม userId
 *     tags:
 *       - Mongo
 *     parameters:
 *       - in: query
 *         name: fontendName
 *         required: true
 *         schema:
 *           type: string
 *           enum: [bumb, berm,brand]
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: get userId
 *     responses:
 *       200:
 *         description: Example updated successfully
 */

router.get(
    '/getTimeSheetMongo/:userId',
    async (req: Request, res: Response) => {
        await manage.getTimeSheetMongo(req, res);
    },
);

/**
 * @swagger

 * /getTimeSheetByProject/{projectId}:
 *   get:
 *     summary: แสดงรายการลงเวลาตาม projectId
 *     tags:
 *       - App_Project
 *     parameters:
 *       - in: query
 *         name: fontendName
 *         required: true
 *         schema:
 *           type: string
 *           enum: [bumb, berm,brand]
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: get projectId
 *     responses:
 *       200:
 *         description: Example updated successfully
 */

router.get(
    '/getTimeSheetByProject/:projectId',
    async (req: Request, res: Response) => {
        await manage.getTimeSheetByProject(req, res);
    },
);

/**
 * @swagger
 * /workingTimeSecond:
 *    post:
 *      tags:
 *        - App_Project
 *      description: Create Working Time
 *      summary: Create Working Time
 *      parameters:
 *       - in: query
 *         name: fontendName
 *         required: true
 *         schema:
 *           type: string
 *           enum: [bumb, berm,brand]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                projectId:
 *                  type: integer
 *                  example: 1
 *                  description: projectId
 *                PM:
 *                  type: string
 *                  description: projectName
 *                SA:
 *                  type: string
 *                  description: type
 *                  example: PM
 *                Design:
 *                  type: integer
 *                  example: 0
 *                Pro Co:
 *                 type: integer
 *                 example: 0
 *                Doc:
 *                 type: string
 *      responses:
 *        200:
 *          description: Successfully created data
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  description:
 *                    type: string
 *                    example: Successfully created data!
 *
 */
router.post('/workingTimeSecond', async (req: Request, res: Response) => {
    await manage.workingTimeSecond(req, res);
});

/**
 * @swagger
 * /self_report:
 *    get:
 *      tags:
 *        - App_Project
 *      description:
 *      summary:
 *      parameters:
 *       - in: query
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *           format:
 *         description: projectId
 *       - in: query
 *         name: fontendName
 *         required: true
 *         schema:
 *           type: string
 *           enum: [bumb, berm,brand]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *      responses:
 *        200:
 *          description: Successfully created data
 */
router.get('/self_report', async (req: Request, res: Response) => {
    await manage.self_report(req, res);
});
/**
 * @swagger
 * /pm_report:
 *    get:
 *      tags:
 *        - App_Project
 *      description:
 *      summary:
 *      parameters:
 *       - in: query
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *           format:
 *         description: projectId
 *       - in: query
 *         name: fontendName
 *         required: true
 *         schema:
 *           type: string
 *           enum: [bumb, berm,brand]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *      responses:
 *        200:
 *          description: Successfully created data
 */
router.get('/pm_report', async (req: Request, res: Response) => {
    await manage.pm_report(req, res);
});

export default router;
