import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CiudadService } from './ciudad.service';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { Ciudad } from './entities/ciudad.entity';
import { BusinessException } from '../exceptions/business.exception';

describe('CiudadService', () => {
  let service: CiudadService;
  let repository: Repository<Ciudad>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CiudadService,
        {
          provide: getRepositoryToken(Ciudad),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CiudadService>(CiudadService);
    repository = module.get<Repository<Ciudad>>(getRepositoryToken(Ciudad));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a ciudad', async () => {
      const createDto: CreateCiudadDto = {
        nombre: 'Ciudad Nueva',
        pais: 'Argentina',
        numeroHabitantes: 1000000,
      };

      jest.spyOn(repository, 'create').mockReturnValue(createDto as any);
      jest.spyOn(repository, 'save').mockResolvedValue(createDto as any);

      const result = await service.create(createDto);

      expect(result).toEqual(createDto);
    });

    it('should throw a BusinessException for invalid country', async () => {
      const createDto: CreateCiudadDto = {
        nombre: 'Ciudad Nueva',
        pais: 'Uruguay', // Invalid country
        numeroHabitantes: 1000000,
      };

      await expect(service.create(createDto)).rejects.toThrowError(
        new BusinessException(
          'El país proporcionado no es válido.',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of ciudades', async () => {
      const ciudades: Ciudad[] = [
        {
          id: 1,
          nombre: 'Ciudad 1',
          pais: 'Argentina',
          numeroHabitantes: 500000,
        },
        {
          id: 2,
          nombre: 'Ciudad 2',
          pais: 'Ecuador',
          numeroHabitantes: 300000,
        },
      ] as Ciudad[];

      jest.spyOn(repository, 'find').mockResolvedValue(ciudades);

      const result = await service.findAll();

      expect(result).toEqual(ciudades);
    });
  });

  describe('findOne', () => {
    it('should return a ciudad by id', async () => {
      const ciudad: Ciudad = {
        id: 1,
        nombre: 'Ciudad 1',
        pais: 'Argentina',
        numeroHabitantes: 500000,
      } as Ciudad;

      jest.spyOn(repository, 'findOne').mockResolvedValue(ciudad);

      const result = await service.findOne(1);

      expect(result).toEqual(ciudad);
    });

    it('should throw a NotFoundException for non-existing id', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrowError(
        new NotFoundException('Ciudad con ID 999 no encontrada.'),
      );
    });
  });

  describe('update', () => {
    it('should update a ciudad by id', async () => {
      const updateDto: CreateCiudadDto = {
        nombre: 'Ciudad Actualizada',
        pais: 'Ecuador',
        numeroHabitantes: 800000,
      };

      const existingCiudad: Ciudad = {
        id: 1,
        nombre: 'Ciudad Original',
        pais: 'Argentina',
        numeroHabitantes: 500000,
      } as Ciudad;

      jest.spyOn(repository, 'findOne').mockResolvedValue(existingCiudad);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue({ ...existingCiudad, ...updateDto } as any);
      jest
        .spyOn(repository, 'merge')
        .mockReturnValue({ ...existingCiudad, ...updateDto } as any);

      const result = await service.update(1, updateDto);

      expect(result).toEqual({ ...existingCiudad, ...updateDto });
    });

    it('should throw a BusinessException for invalid country', async () => {
      const updateDto: CreateCiudadDto = {
        nombre: 'Ciudad Actualizada',
        pais: 'Uruguay', // Invalid country
        numeroHabitantes: 800000,
      };

      const existingCiudad: Ciudad = {
        id: 1,
        nombre: 'Ciudad Original',
        pais: 'Argentina',
        numeroHabitantes: 500000,
      } as Ciudad;

      jest.spyOn(repository, 'findOne').mockResolvedValue(existingCiudad);

      await expect(service.update(1, updateDto)).rejects.toThrowError(
        new BusinessException(
          'El país proporcionado no es válido.',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it('should throw a NotFoundException for non-existing id', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const updateDto: CreateCiudadDto = {
        nombre: 'Ciudad Actualizada',
        pais: 'Ecuador',
        numeroHabitantes: 800000,
      };

      await expect(service.update(999, updateDto)).rejects.toThrowError(
        new NotFoundException('Ciudad con ID 999 no encontrada.'),
      );
    });
  });

  describe('delete', () => {
    it('should delete a ciudad by id', async () => {
      const existingCiudad: Ciudad = {
        id: 1,
        nombre: 'Ciudad Original',
        pais: 'Argentina',
        numeroHabitantes: 500000,
      } as Ciudad;

      jest.spyOn(repository, 'findOne').mockResolvedValue(existingCiudad);
      jest.spyOn(repository, 'remove').mockResolvedValue({} as any);

      await service.delete(1);

      expect(repository.remove).toHaveBeenCalledWith(existingCiudad);
    });

    it('should throw a NotFoundException for non-existing id', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.delete(999)).rejects.toThrowError(
        new NotFoundException('Ciudad con ID 999 no encontrada.'),
      );
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
