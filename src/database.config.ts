import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as process from 'process';

const configLoaded: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: process.env.NODE_ENV === 'test' ? ':memory:' : 'database.sqlite',
  synchronize: true,
  dropSchema: process.env.NODE_ENV === 'test',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};

export const DatabaseConfig: TypeOrmModuleOptions = configLoaded;
