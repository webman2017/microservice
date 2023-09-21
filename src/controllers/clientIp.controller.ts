import { Request, Response, NextFunction } from 'express';
import requestIp from "request-ip";

const ClientIpController = {
    async getClientIp(req: Request, res: Response) {
        try {
            const clientIp = requestIp.getClientIp(req);
            // const clientIP =
            //     req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            res.status(200).json({
                status: 200,
                message: `Your IP address is: ${clientIp}`,
                data: { ip: clientIp },
            });
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },
};
export default ClientIpController;
