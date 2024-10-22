import { AppDataSource } from '../config/database';
import { StatisticsIp } from '../entities/StatisticsIp';

export class StatisticsRepository {
    private statisticsRepository;

    constructor() {
        this.statisticsRepository = AppDataSource.getRepository(StatisticsIp);
    }

    async getFurthestIp(): Promise<any> {
        try {
            return await this.statisticsRepository.findOne({
                order: {
                  distance: 'DESC', 
                },
              });
        } catch (error) {
            console.error('API Request Error:', error);
            throw new Error('Error en la petición getFurthestIp');
        }
    }

    async getClosestIp(): Promise<any> {
        try {
            return await this.statisticsRepository.findOne({
                order: {
                  distance: 'ASC', 
                },
              });
        } catch (error) {
            console.error('API Request Error:', error);
            throw new Error('Error en la petición getClosestIp');
        }
    }

    async getAverageDistance(): Promise<any> {
        try {
            const statistics = await this.statisticsRepository.find();

            const totalWeightedDistance = statistics.reduce((sum, stat) => {
              return sum + (stat.distance * stat.invocations);
            }, 0);
            
            const totalInvocations = statistics.reduce((sum, stat) => {
              return sum + stat.invocations;
            }, 0);
            
            const averageDistance = totalWeightedDistance / totalInvocations;
            
            return averageDistance;
        } catch (error) {
            console.error('API Request Error:', error);
            throw new Error('Error en la petición a la API getIpData');
        }
    }


}
