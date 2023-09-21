/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import member from '../controllers/member.controller';
import Joi, { ObjectSchema } from 'joi';
import convertSchema from 'joi-to-swagger';
import validateMiddleware from '../middlewares/validate.middleware';
import authValidate from '../validates/auth.validate';
// import { secretKey } from "../config/app";

const router = express.Router();

/**
 * @swagger
 * /web/memberUpdate:
 *    post:
 *      tags:
 *        - Web_Member
 *      security:
 *        - BearerAuth: []
 *      summary: แก้ไขข้อมูลสมาชิก
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
 *                     member_id_card:
 *                        type : string
 *                        example : MzcyNDQ2MjU2NjI2MQ==
 *                     member_user:
 *                        type: string
 *                        example : MzcyNDQ2MjU2NjI2MQ==
 *                     member_pass_encrypt:
 *                        type: string
 *                        example: Sm95MTIzNCE=
 *                     member_gender:
 *                          type: string
 *                          example: Rg==
 *                     member_prefix:
 *                          type: string
 *                          example: 4LiZ4Liy4LiH4Liq4Liy4Lin
 *                     member_firstname:
 *                          type: string
 *                          example: Sm95
 *                     member_lastname:
 *                          type: string
 *                          example: 4LiX4LiU4Liq4Lit4Lia4Lij4Liw4Lia4Lia
 *                     member_tel:
 *                          type: string
 *                          example: OTYyODY2NTcz
 *                     member_email:
 *                          type: string
 *                          example: dGVzdEBtYWlsLmNvbQ==
 *                     member_birthday:
 *                          type: string
 *                          example: MTk5OC0xMi0xOA==
 *
 *                dataType:
 *                   type : object
 *                   properties:
 *                     member_id_card:
 *                        type : string
 *                        example : varchar
 *                     member_user:
 *                        type: string
 *                        example : varchar
 *                     member_pass_encrypt:
 *                        type: string
 *                        example: varchar
 *                     member_gender:
 *                          type: string
 *                          example: varchar
 *                     member_prefix:
 *                          type: string
 *                          example: varchar
 *                     member_firstname:
 *                          type: string
 *                          example: varchar
 *                     member_lastname:
 *                          type: string
 *                          example: varchar
 *                     member_tel:
 *                          type: string
 *                          example: varchar
 *                     member_email:
 *                          type: string
 *                          example: text
 *                     member_birthday:
 *                          type: string
 *                          example: date

 *      responses:
 *        200:
 *          description: Successful
 */
router.post('/web/memberUpdate', async (req: Request, res: Response) => {
    await member.memberUpdate(req, res);
});

/**
 * @swagger
 * /web/getMember:
 *    get:
 *      tags:
 *        - Web_Member
 *      security:
 *        - BearerAuth: []
 *      summary: แสดงรายการสมาชิก ตาม member_id
 *      responses:
 *        200:
 *          description: Successful
 *
 */

router.get('/web/getMember', async (req: Request, res: Response) => {
    await member.getMember(req, res);
});

/**
 * @swagger
 * /web/memberAvatar:
 *    get:
 *      tags:
 *        - Web_Member
 *      security:
 *        - BearerAuth: []
 *      summary: รูป Avatar
 *      responses:
 *        200:
 *          description: Successful
 *
 */

router.get('/web/memberAvatar', async (req: Request, res: Response) => {
    await member.memberAvatar(req, res);
});

export default router;
