"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
exports.startServer = startServer;
const ipRoutes_1 = __importDefault(require("./routes/ipRoutes"));
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const app = (0, express_1.default)();
const port = 3000;
function createApp() {
    const app = (0, express_1.default)();
    app.use('/ip', ipRoutes_1.default);
    return app;
}
async function startServer() {
    try {
        await database_1.AppDataSource.initialize();
        console.log("Database connection established");
        const app = createApp();
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`IP Microservice running at http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error("Error starting the server:", error);
        process.exit(1);
    }
}
if (require.main === module) {
    startServer();
}
