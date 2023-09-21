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

// /**
//  * @swagger
//  * /manage:
//  *    post:
//  *      tags:
//  *        - Json_Mockup
//  *      description: Create json mock up
//  *      summary: Create json mock up
//  *      parameters:
//  *       - in: query
//  *         name: endpoint
//  *         required: true
//  *         schema:
//  *           type: string
//  *           format:
//  *         description: endpoint
//  *       - in: query
//  *         name: fontendName
//  *         required: true
//  *         schema:
//  *           type: string
//  *           enum: [Bumb, Berm,Brand]
//  *      requestBody:
//  *        required: true
//  *        content:
//  *          application/json:
//  *            schema:
//  *              type: object
//  *      responses:
//  *        200:
//  *          description: Successfully created data
//  *          example: Successfully created data!
//  *
//  */
// router.post('/manage', async (req: Request, res: Response) => {
//     const queryParam = req.query.endpoint;
//     const bodyParam = req.body;
//     await manage.manage(req, res);
//     // res.sendStatus(200);
// });

// /**
//  * @swagger
//  * /read:
//  *    post:
//  *      tags:
//  *        - Json_Mockup
//  *      description: response json from endpoint
//  *      summary: read json on endpoint api
//  *      parameters:
//  *       - in: query
//  *         name: endpoint
//  *         required: true
//  *         schema:
//  *           type: string
//  *           format:
//  *         description: endpoint
//  *       - in: query
//  *         name: fontendName
//  *         required: true
//  *         schema:
//  *           type: string
//  *           enum: [Bumb, Berm,Brand]
//  *      responses:
//  *        200:
//  *          description: Successfully created data
//  *          content:
//  *            application/json:
//  *              schema:
//  *                type: object
//  *                properties:
//  *                  description:
//  *                    type: string
//  *                    example: Successfully created data!
//  *
//  */
// router.post('/read', async (req: Request, res: Response) => {
//     await manage.readJson(req, res);
// });

// /**
//  * @swagger
//  * /endpointList/:
//  *   get:
//  *     summary: get banner
//  *     tags:
//  *       - Json_Mockup
//  *     responses:
//  *       200:
//  *         description: Example updated successfully
//  */
// router.get('/endpointList', async (req: Request, res: Response) => {
//     await manage.endpointList(req, res);
// });

/**
 * @swagger
 * /department:
 *    get:
 *      tags:
 *        - App_Project
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
router.get('/department', async (req: Request, res: Response) => {
    await manage.department(req, res);
});

/**
 * @swagger
 * /createDepartment:
 *    post:
 *      tags:
 *        - App_Project
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
router.post('/createDepartment', async (req: Request, res: Response) => {
    await manage.createDepartment(req, res);
});

/**
 * @swagger
 * /getDepartmentById/{departmentId}:
 *   get:
 *     summary: แสดงรายการแผนกตาม id
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
 *         name: departmentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Example updated successfully
 */
router.get(
    '/getDepartmentById/:departmentId',
    async (req: Request, res: Response) => {
        await manage.getDepartmentById(req, res);
    },
);

/**
 * @swagger
 * /updateDepartment:
 *    put:
 *      tags:
 *        - App_Project
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
 *           type: integer
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
router.put('/updateDepartment', async (req: Request, res: Response) => {
    await manage.updateDepartment(req, res);
});

/**
 * @swagger
 * /removeDepartment/{departmentId}:
 *   delete:
 *     summary: ลบข้อมูล department
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
 *         name: departmentId
 *         required: true
 *         schema:
 *           type: integer
 *         description:
 *     responses:
 *       200:
 *         description: Example updated successfully
 */

router.delete(
    '/removeDepartment/:departmentId',
    async (req: Request, res: Response) => {
        console.log(req.params.departmentId);
        await manage.deleteDepartment(req, res);
    },
);

/**
 * @swagger
 * /createUser:
 *    post:
 *      tags:
 *        - App_Project
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
router.post('/createUser', async (req: Request, res: Response) => {
    await manage.create(req, res);
});

/**
 * @swagger
 * /getUser/:
 *   get:
 *     summary: แสดงรายการผู้ใช้งานทุกคนในระบบ
 *     tags:
 *       - App_Project
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
router.get('/getUser', async (req: Request, res: Response) => {
    await manage.getAllUser(req, res);
});

/**
 * @swagger
 * tags:
 *   - App_Project
 * /removeUser/{userId}:
 *   delete:
 *     summary: ลบข้อมูลผู้ใช้งานระบบโดยใช้ userId
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
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: remove user
 *     responses:
 *       200:
 *         description: Example updated successfully
 */

router.delete('/removeUser/:userId', async (req: Request, res: Response) => {
    console.log(req.params.userId);
    await manage.deleteUser(req, res);
});

/**
 * @swagger
 * /updateUser:
 *    put:
 *      tags:
 *        - App_Project
 *      description: อัพเดทผู้ใช้งาน
 *      summary: อัพเดทผู้ใช้งาน
 *      parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
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
router.put('/updateUser', async (req: Request, res: Response) => {
    await manage.updateUser(req, res);
});

/**
 * @swagger
 * tags:
 *   - App_Project
 * /searchUser/:
 *   post:
 *     summary: ค้นหาผู้ใช้งานจากชื่อ
 *     tags:
 *       - App_Project
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
router.post('/searchUser', async (req: Request, res: Response) => {
    await manage.searchUser(req, res);
});

/**
 * @swagger
 * /userLogin:
 *    post:
 *      tags:
 *        - App_Project
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
router.post('/userLogin', async (req: Request, res: Response) => {
    await manage.userLogin(req, res);
});

/**
 * @swagger
 * /getTask:
 *    get:
 *      tags:
 *        - App_Project
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

router.get('/getTask', async (req: Request, res: Response) => {
    await manage.getTask(req, res);
});
/**
 * @swagger
 * /createTaskType:
 *    post:
 *      tags:
 *        - App_Project
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
router.post('/createTaskType', async (req: Request, res: Response) => {
    await manage.createTaskType(req, res);
});

/**
 * @swagger
 * tags:
 *   - App_Project
 * /removeTask/{taskId}:
 *   delete:
 *     summary: ลบข้อมูล task
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
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description:
 *     responses:
 *       200:
 *         description: Example updated successfully
 */

router.delete('/removeTask/:taskId', async (req: Request, res: Response) => {
    console.log(req.params.taskId);
    await manage.deleteTask(req, res);
});

/**
 * @swagger
 * tags:
 *   - App_Project
 * /getProject/:
 *   get:
 *     summary: แสดงชื่อรายการโครงการทั้งหมดในระบบ
 *     tags:
 *       - App_Project
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

router.get('/getProject', async (req: Request, res: Response) => {
    await manage.getProject(req, res);
});

/**
 * @swagger
 * /createProject:
 *    post:
 *      tags:
 *        - App_Project
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
router.post('/createProject', async (req: Request, res: Response) => {
    await manage.createProject(req, res);
});

/**
 * @swagger
 * /getProjectById/{projectId}:
 *   get:
 *     summary: แสดงรายการโครงการตาม id
 *     tags:
 *       - App_Project
 *     parameters:
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
    '/getProjectById/:projectId',
    async (req: Request, res: Response) => {
        await manage.getProjectById(req, res);
    },
);

/**
 * @swagger
 * tags:
 *   - App_Project
 * /removeProject/{projectId}:
 *   delete:
 *     summary: ลบข้อมูลโครงการ
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
 *         description:
 *     responses:
 *       200:
 *         description: Example updated successfully
 */
router.delete(
    '/removeProject/:projectId',
    async (req: Request, res: Response) => {
        console.log(req.params.projectId);
        await manage.deleteProject(req, res);
    },
);

/**
 * @swagger
 * /updateProject:
 *    put:
 *      tags:
 *        - App_Project
 *      description: อัพเดทรายละเอียดโครงการ
 *      summary: อัพเดทรายละเอียดโครงการ
 *      parameters:
 *       - in: query
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
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
router.put('/updateProject', async (req: Request, res: Response) => {
    await manage.updateProject(req, res);
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
 * /workingTime:
 *    post:
 *      tags:
 *        - App_Project
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
 *                  type: integer
 *                  example: 1
 *                  description: projectId
 *                userId:
 *                  type: integer
 *                taskId:
 *                  type: integer
 *                date:
 *                  type: integer
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
router.post('/workingTime', async (req: Request, res: Response) => {
    await manage.workingTime(req, res);
});

/**
 * @swagger
 * /getTimeSheet/{userId}:
 *   get:
 *     summary: แสดงรายการลงเวลาตาม userId
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
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: get userId
 *     responses:
 *       200:
 *         description: Example updated successfully
 */

router.get('/getTimeSheet/:userId', async (req: Request, res: Response) => {
    await manage.getTimeSheet(req, res);
});

/**
 * @swagger
 * tags:
 *   - App_Project
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
 * tags:
 *   - App_Project
 * /removeWorkingTime/{id}:
 *   delete:
 *     summary: ลบข้อมูลการลงเวลา
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
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description:
 *     responses:
 *       200:
 *         description: Example updated successfully
 */
router.delete('/removeWorkingTime/:id', async (req: Request, res: Response) => {
    console.log(req.params.id);
    await manage.deleteWorkingTime(req, res);
});

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
 *          example: Successfully created data!
 *
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
 *          example: Successfully created data!
 *
 */
router.get('/pm_report', async (req: Request, res: Response) => {
    await manage.pm_report(req, res);
});

export default router;
