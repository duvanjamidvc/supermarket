import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupermercadoController } from './supermercado.controller';
import { SupermercadoService } from './supermercado.service';
import { CreateSupermercadoDto } from './dto/create-supermercado.dto';
import { Supermercado } from './entities/supermercado.entity';

describe('SupermercadoController', () => {
  let controller: SupermercadoController;
  let service: SupermercadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupermercadoController],
      providers: [
        SupermercadoService,
        {
          provide: getRepositoryToken(Supermercado),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<SupermercadoController>(SupermercadoController);
    service = module.get<SupermercadoService>(SupermercadoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a supermercado', async () => {
      const createDto: CreateSupermercadoDto = {
        nombre: 'Supermercado Nuevo',
        longitud: 123.456789,
        latitud: 45.678901,
        paginaWeb: 'https://www.nuevo-supermercado.com',
      };

      jest.spyOn(service, 'create').mockResolvedValue(createDto as any);

      const result = await controller.create(createDto);

      expect(result).toEqual(createDto);
    });

    it('should throw BusinessException for short nombre', async () => {
      const createDto: CreateSupermercadoDto = {
        nombre: 'Short', // Less than 10 characters
        longitud: 123.456789,
        latitud: 45.678901,
        paginaWeb: 'https://www.short-supermarket.com',
      };

      jest
        .spyOn(service, 'create')
        .mockRejectedValue(
          new NotFoundException(
            'El nombre del supermercado debe tener más de 10 caracteres.',
          ),
        );

      await expect(controller.create(createDto)).rejects.toThrowError(
        new NotFoundException(
          'El nombre del supermercado debe tener más de 10 caracteres.',
        ),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of supermercados', async () => {
      const supermercados: Supermercado[] = [
        {
          id: 1,
          nombre: 'Supermercado 1',
          longitud: 1,
          latitud: 1,
          paginaWeb: 'https://1.com',
        },
        {
          id: 2,
          nombre: 'Supermercado 2',
          longitud: 2,
          latitud: 2,
          paginaWeb: 'https://2.com',
        },
      ] as Supermercado[];

      jest.spyOn(service, 'findAll').mockResolvedValue(supermercados);

      const result = await controller.findAll();

      expect(result).toEqual(supermercados);
    });
  });

  describe('findOne', () => {
    it('should return a supermercado by id', async () => {
      const supermercado: Supermercado = {
        id: 1,
        nombre: 'Supermercado 1',
        longitud: 1,
        latitud: 1,
        paginaWeb: 'https://1.com',
      } as Supermercado;

      jest.spyOn(service, 'findOne').mockResolvedValue(supermercado);

      const result = await controller.findOne('1');

      expect(result).toEqual(supermercado);
    });

    it('should handle NotFoundException for non-existing id', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(
          new NotFoundException('Supermercado no encontrado.'),
        );

      await expect(controller.findOne('999')).rejects.toThrowError(
        new NotFoundException('Supermercado no encontrado.'),
      );
    });
  });

  describe('update', () => {
    it('should update a supermercado by id', async () => {
      const updateDto: CreateSupermercadoDto = {
        nombre: 'Supermercado Actualizado',
        longitud: 123.456789,
        latitud: 45.678901,
        paginaWeb: 'https://www.actualizado-supermercado.com',
      };

      const existingSupermercado: Supermercado = {
        id: 1,
        nombre: 'Supermercado Original',
        longitud: 1,
        latitud: 1,
        paginaWeb: 'https://original-supermarket.com',
      } as Supermercado;

      jest
        .spyOn(service, 'update')
        .mockResolvedValue({ ...existingSupermercado, ...updateDto } as any);

      const result = await controller.update('1', updateDto);

      expect(result).toEqual({ ...existingSupermercado, ...updateDto });
    });

    it('should throw BusinessException for short nombre', async () => {
      const updateDto: CreateSupermercadoDto = {
        nombre: 'Short', // Less than 10 characters
        longitud: 123.456789,
        latitud: 45.678901,
        paginaWeb: 'https://www.short-updated-supermarket.com',
      };

      jest
        .spyOn(service, 'update')
        .mockRejectedValue(
          new NotFoundException(
            'El nombre del supermercado debe tener más de 10 caracteres.',
          ),
        );

      await expect(controller.update('1', updateDto)).rejects.toThrowError(
        new NotFoundException(
          'El nombre del supermercado debe tener más de 10 caracteres.',
        ),
      );
    });

    it('should handle NotFoundException for non-existing id', async () => {
      jest
        .spyOn(service, 'update')
        .mockRejectedValue(
          new NotFoundException('Supermercado no encontrado.'),
        );

      await expect(
        controller.update('999', {} as CreateSupermercadoDto),
      ).rejects.toThrowError(
        new NotFoundException('Supermercado no encontrado.'),
      );
    });
  });

  describe('delete', () => {
    it('should delete a supermercado by id', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue();

      await controller.delete('1');

      // You can add further assertions or expect statements based on your use case
    });

    it('should handle NotFoundException for non-existing id', async () => {
      jest
        .spyOn(service, 'delete')
        .mockRejectedValue(
          new NotFoundException('Supermercado no encontrado.'),
        );

      await expect(controller.delete('999')).rejects.toThrowError(
        new NotFoundException('Supermercado no encontrado.'),
      );
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
