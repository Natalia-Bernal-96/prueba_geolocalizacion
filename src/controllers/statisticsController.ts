import { Request, Response } from 'express';
import { StatisticsService } from '../services/StatisticsService';

export class StatisticsController {
    private statisticsService: StatisticsService;

    constructor() {
        this.statisticsService = new StatisticsService();
    }

    async getStatisticsData(req: Request, res: Response): Promise<any> {
        const operation = req.query.operation as string;
        try {
            const statisticsData = await this.statisticsService.getStatisticsInformation(operation);
            res.json(statisticsData);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error fetching statistics data' });
        }
    }
    
}
