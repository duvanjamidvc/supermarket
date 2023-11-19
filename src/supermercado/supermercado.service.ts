import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSupermercadoDto } from './dto/create-supermercado.dto';
import { Supermercado } from './entities/supermercado.entity';
import { BusinessException } from '../exceptions/business.exception';

@Injectable()
export class SupermercadoService {
  constructor(
    @InjectRepository(Supermercado)
    private supermercadoRepository: Repository<Supermercado>,
  ) {}

  async create(
    createSupermercadoDto: CreateSupermercadoDto,
  ): Promise<Supermercado> {
    // Valida que el nombre del supermercado tenga más de 10 caracteres
    if (createSupermercadoDto.nombre.length <= 10) {
      throw new BusinessException(
        'El nombre del supermercado debe tener más de 10 caracteres.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const nuevoSupermercado = this.supermercadoRepository.create(
      createSupermercadoDto,
    );
    return await this.supermercadoRepository.save(nuevoSupermercado);
  }

  async findAll(): Promise<Supermercado[]> {
    return await this.supermercadoRepository.find();
  }

  async findOne(id: number): Promise<Supermercado> {
    const supermercado = await this.supermercadoRepository.findOne({
      relations: ['ciudades'],
      where: { id: id },
    });
    if (!supermercado) {
      throw new NotFoundException(`Supermercado con ID ${id} no encontrado.`);
    }
    return supermercado;
  }

  async update(
    id: number,
    updateSupermercadoDto: CreateSupermercadoDto,
  ): Promise<Supermercado> {
    // Valida que el nombre del supermercado tenga más de 10 caracteres
    if (updateSupermercadoDto.nombre.length <= 10) {
      throw new BusinessException(
        'El nombre del supermercado debe tener más de 10 caracteres.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const supermercado = await this.supermercadoRepository.findOne({
      relations: ['ciudades'],
      where: { id: id },
    });
    if (!supermercado) {
      throw new NotFoundException(`Supermercado con ID ${id} no encontrado.`);
    }

    this.supermercadoRepository.merge(supermercado, updateSupermercadoDto);
    return await this.supermercadoRepository.save(supermercado);
  }

  async delete(id: number): Promise<void> {
    const supermercado = await this.supermercadoRepository.findOne({
      where: { id: id },
    });
    if (!supermercado) {
      throw new NotFoundException(`Supermercado con ID ${id} no encontrado.`);
    }
    await this.supermercadoRepository.remove(supermercado);
  }
}
