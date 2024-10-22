"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpService = void 0;
const IpData_1 = require("../models/IpData");
const IpRepository_1 = require("../repositories/IpRepository");
const DistanceCalculator_1 = require("../utils/DistanceCalculator");
const database_1 = require("../config/database");
const StatisticsIp_1 = require("../entities/StatisticsIp");
class IpService {
    ipRepository;
    statisticsRepository;
    constructor() {
        this.ipRepository = new IpRepository_1.IpRepository();
        this.statisticsRepository = database_1.AppDataSource.getRepository(StatisticsIp_1.StatisticsIp);
    }
    async getIpInformation(ip) {
        const currentDate = new Date();
        const ipData = await this.ipRepository.getIpData(ip);
        const countryInfo = await this.ipRepository.getCountryInfo(ipData.country_code);
        const exchangeRateData = await this.ipRepository.getCurrencyExchangeRate(countryInfo.currencies);
        const distanceFromBuenosAires = (0, DistanceCalculator_1.calculateDistance)({ lat: -34.6037, lon: -58.3816 }, // Buenos Aires
        { lat: countryInfo.latlng[0], lon: countryInfo.latlng[1] });
        await this.saveStatistics(ipData.country_name, distanceFromBuenosAires);
        const statistics = await this.getStatistics();
        console.log(statistics);
        return new IpData_1.IpData(ip, currentDate, ipData.country_name, ipData.country_code, countryInfo.languages, countryInfo.timezones, distanceFromBuenosAires, countryInfo.currencies, exchangeRateData.rates);
    }
    async saveStatistics(countryName, distance) {
        const existingStatistics = await this.statisticsRepository.findOne({ where: { country_name: countryName } });
        if (existingStatistics) {
            existingStatistics.invocations += 1;
            await this.statisticsRepository.save(existingStatistics);
        }
        else {
            const newStatistics = new StatisticsIp_1.StatisticsIp();
            newStatistics.country_name = countryName;
            newStatistics.distance = distance;
            newStatistics.invocations = 1;
            await this.statisticsRepository.save(newStatistics);
        }
    }
    async getStatistics() {
        return this.statisticsRepository.find();
    }
}
exports.IpService = IpService;
