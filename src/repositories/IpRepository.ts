import axios from 'axios';

// Definición de URLs y configuraciones de la API
const IP_API_URL = 'https://api.ipapi.com/api/';
const IP_API_ACCESS_KEY = '410c44129cf1910b70108c11702e12f4';

const REST_COUNTRIES_URL = 'https://restcountries.com/v3.1/alpha';

const REST_CURRENCY_URL = 'https://data.fixer.io/api/latest';
const REST_CURRENCY_ACCESS_KEY = 'a9280fb2e07102d5d01726bebd49f66a';



// Define las interfaces
interface IpApiResponse {
    country_name: string;
    country_code: string;
}

interface CountryInfoResponse {
    languages: string[];
    timezones: string[];
    currencies: string[];
    latlng: number[];
}

interface CurrencyExchangeRateResponse {
    rates:object;
}
export class IpRepository {

    async getIpData(ip: string): Promise<IpApiResponse> {
        try {
            const response = await axios.get<IpApiResponse>(`${IP_API_URL}${ip}`, {
                params: {
                    access_key: IP_API_ACCESS_KEY,
                    hostname: 1
                }
            });
            if (!response.data) {
                throw new Error('No se recibieron datos válidos de la API de IP');
            }
            return response.data;
        } catch (error) {
            console.error('API Request Error:', error);
            throw new Error('Error en la petición a la API getIpData');
        }
    }

    async getCountryInfo(isoCode: string): Promise<CountryInfoResponse> {
        try {
            const response = await axios.get<CountryInfoResponse[]>(`${REST_COUNTRIES_URL}/${isoCode}`);
            if (!response.data) {
                throw new Error('No se encontró información para el código ' + isoCode);
            }
            return response.data[0];
        } catch (error) {
            console.error('API Request Error:', error);
            throw new Error('Error en la petición a la API getCountryInfo');
        }
    }

    async getCurrencyExchangeRate(currencies: string[]): Promise<CurrencyExchangeRateResponse> {
        try {
            const currencySymbols = Object.keys(currencies);
            const symbolsQuery = currencySymbols.join(',');

            const response = await axios.get<CurrencyExchangeRateResponse>(`${REST_CURRENCY_URL}`, {
                params: {
                    access_key: REST_CURRENCY_ACCESS_KEY,
                    base: 'EUR',
                    symbols: symbolsQuery+',GBP'
                },
                timeout: 10000 // Set a timeout of 10 seconds
            });
            if (!response.data) {
                throw new Error('No se encontró información para los codigos ' + symbolsQuery);
            }
            return response.data;
        } catch (error) {
            console.error('API Request Error:', error);
            throw new Error('Error en la petición a la API getCurrencyExchangeRate');
        }
    }

}
