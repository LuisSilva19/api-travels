import { Sequelize } from "sequelize-typescript";
import { logger, errorLogger } from "../configs/logger";
import path from "path";

const POSTGRES_URL = process.env.DATABASE_URL as unknown as string;
const sequelize = new Sequelize(POSTGRES_URL,{
  dialect: 'postgres', 
  logging: (message) => {
    logger.info(message);
  },
  models: [path.join(__dirname, '..', 'models')]
});

async function connectDB() {
    try {
        await sequelize.authenticate();
        logger.info("✅ Connection has been established successfully.");

        sequelize.sync({ force: false }).then(() => {
            logger.info("✅Synced database successfully...");
        });
    } catch (error) {
        errorLogger.error("Unable to connect to the database:", error);
    }
}

export {sequelize, connectDB};