import { StatisticsData } from '../models/StatisticsData';
import { StatisticsRepository } from '../repositories/StatisticsRepository';

export class StatisticsService {
    private statisticsRepository: StatisticsRepository;

    constructor() {
        this.statisticsRepository = new StatisticsRepository();
    }

    async getStatisticsInformation(operation: string): Promise<StatisticsData> {

        switch (operation) {
            case 'furthest':
                return await this.statisticsRepository.getFurthestIp();

            case 'closest':
                return await this.statisticsRepository.getClosestIp();
            case 'average':
                return await this.statisticsRepository.getAverageDistance();
            default:
                throw new Error('Invalid operation');
        }
    }

}
