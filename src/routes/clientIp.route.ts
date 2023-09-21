import express, { Request, Response, NextFunction } from 'express';
import ClientIpController from '../controllers/clientIp.controller';
const router = express.Router();
/**
 * @swagger
 * /clientIp:
 *    get:
 *      tags:
 *        - ClientIp
 *      description: ClientIp
 *      summary: ClientIp
 *      responses:
 *        200:
 *          description: Successful
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  description:
 *                    type: string
 *                    example: Successful
 *
 */
router.get('/clientIp', (req: Request, res: Response) => {
    ClientIpController.getClientIp(req, res);
});
export default router;
