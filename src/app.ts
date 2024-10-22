import ipRoutes from './routes/ipRoutes';
import statisticsRoutes from './routes/statisticsRoutes';
import "reflect-metadata";
import express from 'express';
import { AppDataSource } from './config/database';

const app = express();
const port = 3000;

export function createApp() {
    const app = express();
    app.use('/ip', ipRoutes);
    app.use('/statistics', statisticsRoutes);
    return app;
}

export async function startServer() {
    try {
        await AppDataSource.initialize();
        console.log("Database connection established");

        const app = createApp();
        const port = process.env.PORT || 3000;

        app.listen(port, () => {
            console.log(`IP Microservice running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Error starting the server:", error);
        process.exit(1);
    }
}

if (require.main === module) {
    startServer();
}