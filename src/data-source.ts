import { DataSource, DataSourceOptions } from 'typeorm';

export const dataOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5434,
  password: '',
  username: 'postgres',
  database: 'jwt_auth',
  logging: true,
} as DataSourceOptions;

export const dataSourceMigration = {
  ...dataOptions,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
};

export const dataSource = new DataSource(dataSourceMigration);
