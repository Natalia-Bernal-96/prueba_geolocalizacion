import { IpData } from '../models/IpData';
import { IpRepository } from '../repositories/IpRepository';
import { calculateDistance } from '../utils/DistanceCalculator';
import { AppDataSource } from '../config/database';
import { StatisticsIp } from '../entities/StatisticsIp';

import NodeCache from 'node-cache';

export class IpService {
    private ipRepository: IpRepository;
    private statisticsRepository;
    private cache: NodeCache;

    constructor() {
        this.ipRepository = new IpRepository();
        this.statisticsRepository = AppDataSource.getRepository(StatisticsIp);
        this.cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour
    }

    async getIpInformation(ip: string): Promise<IpData> {
        const currentDate = new Date();
        const cachedData = this.cache.get<IpData>(ip);

        if (cachedData) {
            await this.saveStatistics(cachedData.countryName, cachedData.distanceFromBuenosAires);
            return cachedData;
        }

        const ipData = await this.ipRepository.getIpData(ip);
        const countryInfo = await this.ipRepository.getCountryInfo(ipData.country_code);
        const exchangeRateData = await this.ipRepository.getCurrencyExchangeRate(countryInfo.currencies);
        const distanceFromBuenosAires = calculateDistance(
                { lat: -34.6037, lon: -58.3816 }, // Buenos Aires
                { lat: countryInfo.latlng[0], lon: countryInfo.latlng[1] }
            );
        
        const ipInfo = new IpData(
            ip,
            currentDate,
            ipData.country_name,
            ipData.country_code,
            countryInfo.languages,
            countryInfo.timezones,
            distanceFromBuenosAires,
            countryInfo.currencies,
            exchangeRateData.rates
        );

        this.cache.set(ip, ipInfo);
        await this.saveStatistics(ipData.country_name, distanceFromBuenosAires);

        return ipInfo;
    }

    private async saveStatistics(countryName: string, distance: number): Promise<void> {
        const existingStatistics = await this.statisticsRepository.findOne({ where: { country_name: countryName } });

        if (existingStatistics) {
            existingStatistics.invocations += 1;
            await this.statisticsRepository.save(existingStatistics);
        } else {
            const newStatistics = new StatisticsIp();
            newStatistics.country_name = countryName;
            newStatistics.distance = distance;
            newStatistics.invocations = 1;
            await this.statisticsRepository.save(newStatistics);
        }
    }
}
