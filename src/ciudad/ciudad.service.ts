import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { Ciudad } from './entities/ciudad.entity';
import { BusinessException } from '../exceptions/business.exception';

@Injectable()
export class CiudadService {
  private readonly _allowedCountries = ['Argentina', 'Ecuador', 'Paraguay'];

  constructor(
    @InjectRepository(Ciudad)
    private ciudadRepository: Repository<Ciudad>,
  ) {}

  async create(createCiudadDto: CreateCiudadDto): Promise<Ciudad> {
    // Valida que el país esté en la lista permitida
    if (!this.isValidCountry(createCiudadDto.pais)) {
      throw new BusinessException(
        'El país proporcionado no es válido.',
        HttpStatus.BAD_REQUEST,
      );
      return null;
    }

    const nuevaCiudad = this.ciudadRepository.create(createCiudadDto);
    return await this.ciudadRepository.save(nuevaCiudad);
  }

  async findAll(): Promise<Ciudad[]> {
    return await this.ciudadRepository.find();
  }

  async findOne(id: number): Promise<Ciudad> {
    const ciudad = await this.ciudadRepository.findOne({ where: { id: id } });
    if (!ciudad) {
      throw new NotFoundException(`Ciudad con ID ${id} no encontrada.`);
    }
    return ciudad;
  }

  async update(id: number, updateCiudadDto: CreateCiudadDto): Promise<Ciudad> {
    // Valida que el país esté en la lista permitida
    if (updateCiudadDto.pais && !this.isValidCountry(updateCiudadDto.pais)) {
      throw new BusinessException(
        'El país proporcionado no es válido.',
        HttpStatus.BAD_REQUEST,
      );
      return null;
    }

    const ciudad = await this.ciudadRepository.findOne({ where: { id: id } });
    if (!ciudad) {
      throw new NotFoundException(`Ciudad con ID ${id} no encontrada.`);
    }

    this.ciudadRepository.merge(ciudad, updateCiudadDto);
    return await this.ciudadRepository.save(ciudad);
  }

  async delete(id: number): Promise<void> {
    const ciudad = await this.ciudadRepository.findOne({ where: { id: id } });
    if (!ciudad) {
      throw new NotFoundException(`Ciudad con ID ${id} no encontrada.`);
    }
    await this.ciudadRepository.remove(ciudad);
  }

  private isValidCountry(pais: string): boolean {
    const allowedCountries = this._allowedCountries;
    return allowedCountries.includes(pais);
  }
}
