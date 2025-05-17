// import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

// dotenvConfig({ path: '.env' });

export const defaultConfig: any = {
    type: 'postgres',
    host: `${process.env.DATABASE_HOST}`,
    port: `${process.env.DATABASE_PORT}`,
    username: `${process.env.DATABASE_USERNAME}`,
    password: `${process.env.DATABASE_PASSWORD}`,
    database: `${process.env.DATABASE_NAME}`,
    autoLoadEntities: true 
}

const config: any = {...defaultConfig, migrations: ['./src/migrations/**/*.*']} 

console.log("CONFIG", config);

export const connectionSource = new DataSource(config as DataSourceOptions);