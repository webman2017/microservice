import express, { Request, Response } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import DocumentController from '../controllers/document.controller';
import Joi, { ObjectSchema } from 'joi';
import convertSchema from 'joi-to-swagger';
import validateMiddleware from '../middlewares/validate.middleware';
import documentValidate from '../validates/document.validate';
const router = express.Router();
/**
 * @swagger
 * /web/documentList:
 *   get:
 *     summary: รายการเอกสารดาวน์โหลด
 *     tags:
 *       - Web_Document
 *     parameters:
 *       - in: query
 *         name: limit
 *         require: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         require: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: keyword
 *         require: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Example updated successfully
 */
router.get(
    '/web/documentList',
    // validateMiddleware(documentValidate.get),
    async (req: Request, res: Response) => {
        const limit = req.params.limit;

        await DocumentController.getDocument(req, res);
    },
);
/**
 * @swagger
 * /web/documentById:
 *   get:
 *     summary: รายการเอกสารดาวน์โหลด ตาม id
 *     tags:
 *       - Web_Document
 *     parameters:
 *       - in: query
 *         name: document_id
 *         required: false
 *         schema:
 *           type: integer
 *         description:
 *     responses:
 *       200:
 *         description: Example updated successfully
 */
router.get(
    '/web/documentById',
    // authMiddleware,
    // validateMiddleware(documentValidate.documentById),
    async (req: Request, res: Response) => {
        await DocumentController.documentById(req, res);
    },
);

/**
 * @swagger
 * /web/documentCategory:
 *   get:
 *     summary: แสดงหมวดหมู่ดาวน์โหลดเอกสาร
 *     tags:
 *       - Web_Document
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Example updated successfully
 */
router.get(
    '/web/documentCategory',
    // authMiddleware,
    async (req: Request, res: Response) => {
        await DocumentController.getCategory(req, res);
    },
);

/**
 * @swagger
 * /web/documentViews:
 *    post:
 *      tags:
 *        - Web_Document
 *      description: update document view
 *      summary: อัพเดทยอดวิวเอกสารดาวน์โหลด
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
 *                     document_id :
 *                        type : integer
 *                        example : MTQ=
 *                dataType:
 *                   type : object
 *                   properties:
 *                     document_id :
 *                      type : string
 *                      example : int
 *      responses:
 *        200:
 *          description: Successfully created data
 */

router.post(
    '/web/documentViews',
    // authMiddleware,
    async (req: Request, res: Response) => {
        await DocumentController.documentViews(req, res);
    },
);
export default router;
