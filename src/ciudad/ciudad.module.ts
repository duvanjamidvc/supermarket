import { Module } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CiudadController } from './ciudad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { CiudadSupermecadoController } from './ciudad-supermecado.controller';
import { CiudadSupermecadoService } from './ciudad-supermecado.service';
import { Supermercado } from '../supermercado/entities/supermercado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ciudad, Supermercado])],
  controllers: [CiudadController, CiudadSupermecadoController],
  providers: [CiudadService, CiudadSupermecadoService],
})
export class CiudadModule {}
