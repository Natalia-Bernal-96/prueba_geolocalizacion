import { AppDataSource } from '../config/database';
import { StatisticsIp } from '../entities/StatisticsIp';

interface StatisticsData {
    country_name: string;
    distance: number;
    invocations: number;
}

export class StatisticsRepository {
    private statisticsRepository;

    constructor() {
        this.statisticsRepository = AppDataSource.getRepository(StatisticsIp);
    }

    async getFurthestIp(): Promise<StatisticsData> {
        try {
            const [furthestIp] = await this.statisticsRepository.find({
                order: { distance: 'DESC' },
                take: 1 // Limita a un solo resultado
            });
        
            if (!furthestIp) {
                return {
                    country_name: '',
                    distance: 0,
                    invocations: 0
                };
            }
    
            return {
                country_name: furthestIp.country_name,
                distance: furthestIp.distance,
                invocations: furthestIp.invocations
            };
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
