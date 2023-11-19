import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const configLoaded: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  dropSchema: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};

export const DatabaseConfig: TypeOrmModuleOptions = configLoaded;
