export class IpData {
    constructor(
        public ip: string,
        public currentDate: Date,
        public countryName: string,
        public isoCode: string,
        public languages: string[],
        public currentTime: string[],
        public distanceFromBuenosAires: number,
        public currencies: string[],
        public exchangeRateCurrency: object
    ) {}
}
