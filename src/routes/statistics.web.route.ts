import express, { Request, Response } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import statisticController from '../controllers/statistic.controller';
import Joi, { ObjectSchema } from 'joi';
import convertSchema from 'joi-to-swagger';
import validateMiddleware from '../middlewares/validate.middleware';
import authValidate from '../validates/auth.validate';
const router = express.Router();
/**
 * @swagger
 * /web/statisticsDaily:
 *    post:
 *      tags:
 *        - Web_Statistic
 *      description: สถิติรายวัน
 *      summary: สถิติรายวัน
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
 *                     path :
 *                        type : string
 *                        example : L3Rlc3QvaW5kZXg=
 *                     ip:
 *                        type: string
 *                        example: MTI3LjAuMC4x
 *
 *                dataType:
 *                   type : object
 *                   properties:
 *                     path :
 *                      type : string
 *                      example : varchar
 *                     ip:
 *                      type: string
 *                      example: varchar
 *      responses:
 *        200:
 *          description: Successfully created data
 */
router.post('/web/statisticsDaily', async (req: Request, res: Response) => {
    await statisticController.daily(req, res);
});
/**
 * @swagger
 * /web/statisticsList:
 *    get:
 *      tags:
 *        - Web_Statistic
 *      description: get daily
 *      summary: get daily
 *      responses:
 *        200:
 *          description: Successfully created data
 *
 */
router.get('/web/statisticsList', async (req: Request, res: Response) => {
    await statisticController.getDaily(req, res);
});
export default router;
