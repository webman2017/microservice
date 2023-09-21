import express, { Request, Response, NextFunction } from 'express';
import authTokenBackendMiddleware from '../middlewares/authTokenBackend.middleware';
import AboutController from '../controllers/about.controller';

const router = express.Router();
/**
 * @swagger
 * /web/submenu:
 *   get:
 *     summary: get submenu
 *     tags:
 *       - Web_Aboutus
 *     parameters:
 *       - in: query
 *         name: menu_id
 *         required: false
 *         schema:
 *           type: string
 *         description: menu_id
 *     responses:
 *       200:
 *         description: Successful
 *       404:
 *         description: Not found
 */
router.get(
    '/web/submenu',
    authTokenBackendMiddleware,
    async (req: Request, res: Response) => {
        await AboutController.submenu(req, res);
    },
);
/**
 * @swagger
 * /web/getSubmenu:
 *   get:
 *     summary: get submenu
 *     tags:
 *       - Web_Aboutus
 *     parameters:
 *       - in: query
 *         name: about_id
 *         required: true
 *         schema:
 *           type: string
 *         description: about_id
 *     responses:
 *       200:
 *         description: Successful
 *       404:
 *         description: Not found
 */
router.get(
    '/web/getSubmenu',
    authTokenBackendMiddleware,
    async (req: Request, res: Response) => {
        await AboutController.getsubmenu(req, res);
    },
);

/**
 * @swagger
 * /web/mainMenu:
 *    get:
 *      tags:
 *        - Web_Aboutus
 *      description: get main menu
 *      summary: get main menu
 *      responses:
 *        200:
 *          description: Successfully created data
 *
 */
router.get(
    '/web/mainMenu',
    authTokenBackendMiddleware,
    async (req: Request, res: Response) => {
        await AboutController.mainmenu(req, res);
    },
);

/**
 * @swagger
 * /web/aboutView:
 *    post:
 *      tags:
 *        - Web_Aboutus
 *      description: update
 *      summary: update about view
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
 *                     about_id :
 *                        type : integer
 *                        example : MQ==
 *                dataType:
 *                   type : object
 *                   properties:
 *                     about_id :
 *                      type : string
 *                      example : int
 *      responses:
 *        200:
 *          description: Successfully created data
 *
 */
router.post(
    '/web/aboutView',
    authTokenBackendMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        await AboutController.updateView(req, res, next);
    },
);
export default router;
