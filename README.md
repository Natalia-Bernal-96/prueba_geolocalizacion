
# prueba_geolocalizacion

This project is a microservice for IP geolocation and statistics.

## Prerequisites

- Docker
- Docker Compose

## Setup and Running with Docker

1. Clone the repository:

```bash
git clone https://github.com/yourusername/prueba_geolocalizacion.git
cd prueba_geolocalizacion


docker-compose up --build

# API Endpoints

## IP Information

### GET /ip/:ip

Retrieves detailed information about a specific IP address.

Parameters:
- `ip`: The IP address to query (path parameter)

Response:
Returns an IpData object containing:
- IP address
- Current date
- Country name
- Country code
- Languages
- Timezones
- Distance from Buenos Aires
- Currencies
- Exchange rates

## Statistics

### GET /statistics/:operation

Retrieves statistical information based on the specified operation.

Parameters:
- `operation`: The type of statistical operation (path parameter)

Supported operations:
- `furthest`: Returns information about the furthest IP location from Buenos Aires
- `closest`: Returns information about the closest IP location to Buenos Aires
- `average`: Returns the average distance of all queried IP locations from Buenos Aires

Response:
Returns a StatisticsData object containing the requested statistical information.

Note: If an invalid operation is provided, the endpoint will return an error.
