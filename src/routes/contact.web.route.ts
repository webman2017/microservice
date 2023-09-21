import express, { Request, Response } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import contactController from '../controllers/contact.controller';
import Joi, { ObjectSchema } from 'joi';
import convertSchema from 'joi-to-swagger';
// import rateLimit from '../helpers/ratelimit.helper';
import validateMiddleware from '../middlewares/validate.middleware';
import authValidate from '../validates/auth.validate';
// import { secretKey } from "../config/app";

const router = express.Router();
/**
 * @swagger
 * /web/contactList:
 *    get:
 *      tags:
 *        - Web_Contact
 *      summary: ติดต่อเรา
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
 *      responses:
 *        200:
 *          description: Successfully created data
 */
router.get('/web/contactList', async (req: Request, res: Response) => {
    const { limit, page, type } = req.body;
    console.log(limit);
    await contactController.getById(req, res);
});

/**
 * @swagger
 * /web/contactCategory:
 *    get:
 *      tags:
 *        - Web_Contact
 *      description: get category
 *      summary: ติดต่อเรา
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
 *      responses:
 *        200:
 *          description: Successfully created data
 */
router.get('/web/contactCategory', async (req: Request, res: Response) => {
    await contactController.categoryList(req, res);
});

/**
 * @swagger
 * /web/contactRequest:
 *    post:
 *      tags:
 *        - Web_Contact
 *      description: requestContact
 *      summary: requestContact
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
 *                     category_id :
 *                        type : string
 *                        example : MQ==
 *                     subject :
 *                        type : string
 *                        example : 4LiX4LiU4Liq4Lit4Lia
 *                     detail :
 *                        type : string
 *                        example : 4LiX4LiU4Liq4Lit4Lia
 *                     name :
 *                        type : string
 *                        example : 4LiX4LiU4Liq4Lit4Lia
 *                     tel :
 *                        type : string
 *                        example : OTk5OTIzNA==
 *                     email :
 *                        type : string
 *                        example : dGVzdEBnbWFpbC5jb20=
 *                     line_id :
 *                        type : string
 *                        example: c3RyaW5n
 *                dataType:
 *                   type : object
 *                   properties:
 *                     category_id :
 *                      type : string
 *                      example : int
 *                     subject :
 *                      type : string
 *                      example : varchar
 *
 *
 *                     detail :
 *                      type : string
 *                      example : varchar
 *                     name :
 *                      type : string
 *                      example : varchar
 *                     tel :
 *                      type : string
 *                      example : varchar
 *                     email :
 *                      type : string
 *                      example : varchar
 *                     line_id :
 *                      type : string
 *                      example : varchar
 *
 *      responses:
 *        200:
 *          description: Successfully created data
 */
router.post('/web/contactRequest', async (req: Request, res: Response) => {
    await contactController.requestContact(req, res);
});

export default router;
