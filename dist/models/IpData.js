"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpData = void 0;
class IpData {
    ip;
    currentDate;
    countryName;
    isoCode;
    languages;
    currentTime;
    distanceFromBuenosAires;
    currencies;
    exchangeRateCurrency;
    constructor(ip, currentDate, countryName, isoCode, languages, currentTime, distanceFromBuenosAires, currencies, exchangeRateCurrency) {
        this.ip = ip;
        this.currentDate = currentDate;
        this.countryName = countryName;
        this.isoCode = isoCode;
        this.languages = languages;
        this.currentTime = currentTime;
        this.distanceFromBuenosAires = distanceFromBuenosAires;
        this.currencies = currencies;
        this.exchangeRateCurrency = exchangeRateCurrency;
    }
}
exports.IpData = IpData;
