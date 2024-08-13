import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const dataOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  password: '',
  username: process.env.DB_USER_NAME,
  database: process.env.DB_DATABASE,
  logging: process.env.LOGGING_QUERY,
} as DataSourceOptions;

export const dataSourceMigration = {
  ...dataOptions,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
};

export const dataSource = new DataSource(dataSourceMigration);
