import { Module } from '@nestjs/common';
import { CiudadModule } from './ciudad/ciudad.module';
import { SupermecadoModule } from './supermercado/supermecado.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => DatabaseConfig,
    }),

    CiudadModule,
    SupermecadoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
