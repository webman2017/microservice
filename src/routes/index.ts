import { Router } from 'express';
import * as path from 'path';
import * as fs from 'fs';

const router = Router();

const includedRoutes = [
    'authenticate.route',
    'clientIp.route',
    'auth.mobile.route',
    'auth.web.route',
    'about.web.route',
    'activity.mobile.route',
    'activity.web.route',
    'banner.web.route',
    'contact.web.route',
    'content.web.route',
    'cookies.web.route',
    'document.web.route',
    'dpis.route',
    'education.web.route',
    'faq.web.route',
    'kpi.web.route',
    'manage.route',
    'manageMongo.route',
    'member.web.route',
    'news.web.route',
    'poll.web.route',
    'setting.web.route',
    'sitemap.web.route',
    'social.web.route',
    'statistics.web.route',
    'termCondition.web.route',
    'upload.route',
    'live.web.route',
    'live.mobile.route',
    'exam.web.route',
    'exam.mobile.route',
    'coach.web.route',
    'course.web.route',
    'course.mobile.route',
];

includedRoutes.forEach(async (routeName) => {
    const routePath = path.join(__dirname, routeName);

    try {
        const { default: route } = await import(routePath);
        router.use('/', route);
    } catch (error) {
        console.error(`Error importing route ${routeName}: ${error}`);
    }
});

export default router;
