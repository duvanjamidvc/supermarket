import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { Supermercado } from '../supermercado/entities/supermercado.entity';
import { BusinessException } from '../exceptions/business.exception';
import { CiudadService } from './ciudad.service';

@Injectable()
export class CiudadSupermecadoService {
  constructor(
    @InjectRepository(Ciudad)
    private ciudadRepository: Repository<Ciudad>,
    @InjectRepository(Supermercado)
    private supermercadoRepository: Repository<Supermercado>,
    private ciudadService: CiudadService,
  ) {}

  async findSupermarketsFromCity(cityId: number): Promise<Supermercado[]> {
    const ciudad = await this.ciudadService.findOne(cityId);

    if (!ciudad) {
      throw new NotFoundException(`Ciudad con ID ${cityId} no encontrada.`);
    }

    return ciudad.supermercados;
  }

  async addSupermarketToCity(cityId: number, supermarketId: number): Promise<Ciudad> {
    const ciudad = await this.ciudadService.findOne(cityId);

    const supermercado = await this.supermercadoRepository.findOne({ where: { id: supermarketId } });
    if (!supermercado) {
      throw new BusinessException('Supermercado no encontrado.', HttpStatus.PRECONDITION_FAILED);
      return null;
    }

    ciudad.supermercados.push(supermercado);
    return this.ciudadRepository.save(ciudad);
  }

  async findSupermarketFromCity(cityId: number, supermarketId: number): Promise<Supermercado> {
    const ciudad = await this.ciudadService.findOne(cityId);

    if (!ciudad) {
      throw new NotFoundException(`Ciudad con ID ${cityId} no encontrada.`);
    }

    const supermercado = ciudad.supermercados.find((s) => s.id === supermarketId);

    if (!supermercado) {
      throw new NotFoundException(`Supermercado con ID ${supermarketId} no encontrado en la ciudad.`);
    }

    return supermercado;
  }

  async updateSupermarketsFromCity(cityId: number, supermarketIds: number[]): Promise<Ciudad> {
    const ciudad = await this.ciudadService.findOne(cityId);

    if (!ciudad) {
      throw new NotFoundException(`Ciudad con ID ${cityId} no encontrada.`);
    }
    const supermercados = await this.supermercadoRepository.find({ where: { id: In(supermarketIds) } });
    if (supermarketIds.length != supermercados.length) {
      throw new BusinessException(`Supermercados no encontrados`, HttpStatus.PRECONDITION_FAILED);
    }
    ciudad.supermercados = supermercados;
    return this.ciudadRepository.save(ciudad);
  }

  async deleteSupermarketFromCity(cityId: number, supermarketId: number): Promise<void> {
    const ciudad = await this.ciudadService.findOne(cityId);

    if (!ciudad) {
      throw new NotFoundException(`Ciudad con ID ${cityId} no encontrada.`);
    }

    const superExistente = ciudad.supermercados.filter((s) => s.id === supermarketId);
    if (superExistente.length == 0) {
      throw new BusinessException(`Supermercado con ID ${supermarketId} no encontrado en la ciudad.`, HttpStatus.PRECONDITION_FAILED);
    }

    ciudad.supermercados = ciudad.supermercados.filter((s) => s.id !== supermarketId);
    await this.ciudadRepository.save(ciudad);
  }
}
