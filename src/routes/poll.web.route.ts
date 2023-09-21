import express, { Request, Response, NextFunction } from 'express';
import authTokenMiddleware from '../middlewares/authToken.middleware';
import authTokenBackendMiddleware from '../middlewares/authTokenBackend.middleware';
import PollController from '../controllers/poll.controller';

const router = express.Router();
/**
 * @swagger
 * /web/pollList:
 *    get:
 *      tags:
 *        - Web_Poll
 *      security:
 *        - BearerAuth: []
 *      summary: แสดงแบบสำรวจตาม filter parameter
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
// router.post('/web/pollList', validateMiddleware(authValidate.login), (req: Request, res: Response) => {
router.get(
    '/web/pollList',
    authTokenMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        await PollController.getPoll(req, res, next);
    },
);

/**
 * @swagger
 * /web/pollById:
 *   get:
 *     summary: แสดงแบบสำรวจตาม poll id
 *     tags:
 *       - Web_Poll
 *     security:
 *        - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: poll_id
 *         required: true
 *         schema:
 *           type: string
 *         description: poll_id
 *     responses:
 *       200:
 *         description: Successful
 */
router.get(
    '/web/pollById',
    authTokenMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        await PollController.getPollById(req, res);
    },
);

/**
 * @swagger
 * /web/pollChoice:
 *   get:
 *     summary: แสดงหัวข้อย่อยแบบสำรวจตาม poll id
 *     tags:
 *       - Web_Poll
 *     parameters:
 *       - in: query
 *         name: poll_id
 *         required: true
 *         schema:
 *           type: string
 *         description: poll_id
 *     responses:
 *       200:
 *         description: Successful
 */
router.get(
    '/web/pollChoice',
    authTokenMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        await PollController.getChoice(req, res);
    },
);

/**
 * @swagger
 * /web/pollCategory:
 *   get:
 *     summary: แสดงหมวดหมู่ของแบบสำรวจ
 *     tags:
 *       - Web_Poll
 *     responses:
 *       200:
 *         description: Successful
 */
router.get(
    '/web/pollCategory',
    authTokenBackendMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        await PollController.pollCategory(req, res);
    },
);

/**
 * @swagger
 * /web/pollVote:
 *    post:
 *      tags:
 *        - Web_Poll
 *      security:
 *        - BearerAuth: []
 *      description: pollVote
 *      summary: บันทึกแบบสำรวจ
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
 *                    poll_parent_id:
 *                      type: integer
 *                      example: MjE=
 *                    ip_address:
 *                      type: string
 *                      example: MC4wLjAuMA==
 *                    course_id:
 *                      type: integer
 *                      example: ""
 *                    coach_id:
 *                      type: integer
 *                      example: MQ==
 *                    choice:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          poll_id:
 *                            type: integer
 *                            example: MjM=
 *                          score_id:
 *                            type: integer
 *                            example: MjI=
 *                          score_text:
 *                            type: string
 *                            example: 4LiX4LiU4Liq4Lit4Lia
 *                dataType:
 *                  type: object
 *                  properties:
 *                    poll_parent_id:
 *                      type: string
 *                      example: "int"
 *                    ip_address:
 *                      type: string
 *                      example: "varchar"
 *                    course_id:
 *                      type: string
 *                      example: "int"
 *                    coach_id:
 *                      type: string
 *                      example: "int"
 *                    choice:
 *                      type: object
 *                      properties:
 *                        poll_id:
 *                          type: string
 *                          example: "int"
 *                        score_id:
 *                          type: string
 *                          example: "text"
 *                        score_text:
 *                          type: string
 *                          example: "varchar"
 *      responses:
 *        200:
 *          description: Successful
 */

router.post(
    '/web/pollVote',
    authTokenMiddleware,
    async (req: Request, res: Response) => {
        await PollController.pollVote(req, res);
    },
);

export default router;
