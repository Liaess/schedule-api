import { DataSource } from 'typeorm';
import dotenvx from '@dotenvx/dotenvx';

dotenvx.config();

export const dataSourceOptions = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [],
});
