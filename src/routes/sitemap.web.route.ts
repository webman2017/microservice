import express, { Request, Response } from 'express';
import siteMap from '../controllers/sitemap.controller';
const router = express.Router();
/**
 * @swagger
 * tags:
 *   - Web_SiteMap
 * /web/siteMapList:
 *   get:
 *     summary: แสดงรายการผังเว็บไซต์
 *     tags:
 *       - Web_SiteMap
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: true
 *         schema:
 *           type: string
 *         description: limit
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: string
 *         description: page
 *     responses:
 *       200:
 *         description: Example updated successfully
 */
router.get('/web/siteMapList', async (req: Request, res: Response) => {
    await siteMap.getSitemap(req, res);
});
export default router;
