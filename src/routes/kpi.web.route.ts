import express, { Request, Response, NextFunction } from 'express';
import authTokenMiddleware from '../middlewares/authToken.middleware';
import authTokenBackendMiddleware from '../middlewares/authTokenBackend.middleware';
import KpiController from '../controllers/kpi.controller';

const router = express.Router();
/**
 * @swagger
 * /web/kpiList:
 *    get:
 *      tags:
 *        - Web_kpi
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
// router.post('/web/kpiList', validateMiddleware(authValidate.login), (req: Request, res: Response) => {
router.get(
    '/web/kpiList',
    authTokenMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        await KpiController.getKpi(req, res, next);
    },
);

export default router;
