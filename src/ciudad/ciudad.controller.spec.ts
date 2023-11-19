import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CiudadController } from './ciudad.controller';
import { CiudadService } from './ciudad.service';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { Ciudad } from './entities/ciudad.entity';

describe('CiudadController', () => {
  let controller: CiudadController;
  let service: CiudadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CiudadController],
      providers: [
        CiudadService,
        {
          provide: getRepositoryToken(Ciudad),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<CiudadController>(CiudadController);
    service = module.get<CiudadService>(CiudadService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a ciudad', async () => {
      const createDto: CreateCiudadDto = {
        nombre: 'Ciudad Nueva',
        pais: 'Argentina',
        numeroHabitantes: 1000000,
      };

      jest.spyOn(service, 'create').mockResolvedValue(createDto as any);

      const result = await controller.create(createDto);

      expect(result).toEqual(createDto);
    });

    it('should handle BusinessException for invalid country', async () => {
      const createDto: CreateCiudadDto = {
        nombre: 'Ciudad Nueva',
        pais: 'Uruguay', // Invalid country
        numeroHabitantes: 1000000,
      };

      jest
        .spyOn(service, 'create')
        .mockRejectedValue(
          new NotFoundException('El país proporcionado no es válido.'),
        );

      await expect(controller.create(createDto)).rejects.toThrowError(
        new NotFoundException('El país proporcionado no es válido.'),
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

      jest.spyOn(service, 'findAll').mockResolvedValue(ciudades);

      const result = await controller.findAll();

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

      jest.spyOn(service, 'findOne').mockResolvedValue(ciudad);

      const result = await controller.findOne('1');

      expect(result).toEqual(ciudad);
    });

    it('should handle NotFoundException for non-existing id', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(new NotFoundException('Ciudad no encontrada.'));

      await expect(controller.findOne('999')).rejects.toThrowError(
        new NotFoundException('Ciudad no encontrada.'),
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

      jest
        .spyOn(service, 'update')
        .mockResolvedValue({ ...existingCiudad, ...updateDto } as any);

      const result = await controller.update('1', updateDto);

      expect(result).toEqual({ ...existingCiudad, ...updateDto });
    });

    it('should handle BusinessException for invalid country', async () => {
      const updateDto: CreateCiudadDto = {
        nombre: 'Ciudad Actualizada',
        pais: 'Uruguay', // Invalid country
        numeroHabitantes: 800000,
      };

      jest
        .spyOn(service, 'update')
        .mockRejectedValue(
          new NotFoundException('El país proporcionado no es válido.'),
        );

      await expect(controller.update('1', updateDto)).rejects.toThrowError(
        new NotFoundException('El país proporcionado no es válido.'),
      );
    });

    it('should handle NotFoundException for non-existing id', async () => {
      jest
        .spyOn(service, 'update')
        .mockRejectedValue(new NotFoundException('Ciudad no encontrada.'));

      await expect(
        controller.update('999', {} as CreateCiudadDto),
      ).rejects.toThrowError(new NotFoundException('Ciudad no encontrada.'));
    });
  });

  describe('delete', () => {
    it('should delete a ciudad by id', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue();

      await controller.delete('1');

      // You can add further assertions or expect statements based on your use case
    });

    it('should handle NotFoundException for non-existing id', async () => {
      jest
        .spyOn(service, 'delete')
        .mockRejectedValue(new NotFoundException('Ciudad no encontrada.'));

      await expect(controller.delete('999')).rejects.toThrowError(
        new NotFoundException('Ciudad no encontrada.'),
      );
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
