CREATE TABLE IF NOT EXISTS statistics_ip (
    id SERIAL PRIMARY KEY,
    country_name VARCHAR(255) NOT NULL,
    distance FLOAT NOT NULL,
    invocations INTEGER NOT NULL DEFAULT 1
);
