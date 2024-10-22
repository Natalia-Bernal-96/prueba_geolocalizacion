import { Request, Response } from 'express';
import { IpService } from '../services/IpService';

export class IpController {
    private ipService: IpService;

    constructor() {
        this.ipService = new IpService();
    }

    async getIpData(req: Request, res: Response): Promise<void> {
        const ip = req.params.ip;
        try {
            const ipData = await this.ipService.getIpInformation(ip);
            res.json(ipData);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error fetching IP data' });
        }
    }
    
}
