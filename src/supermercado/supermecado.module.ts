import { Module } from '@nestjs/common';
import { SupermercadoService } from './supermercado.service';
import { SupermercadoController } from './supermercado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supermercado } from './entities/supermercado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Supermercado])],
  controllers: [SupermercadoController],
  providers: [SupermercadoService],
})
export class SupermecadoModule {}
