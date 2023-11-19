import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupermercadoService } from './supermercado.service';
import { CreateSupermercadoDto } from './dto/create-supermercado.dto';
import { Supermercado } from './entities/supermercado.entity';
import { BusinessException } from '../exceptions/business.exception';

describe('SupermercadoService', () => {
  let service: SupermercadoService;
  let repository: Repository<Supermercado>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupermercadoService,
        {
          provide: getRepositoryToken(Supermercado),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<SupermercadoService>(SupermercadoService);
    repository = module.get<Repository<Supermercado>>(
      getRepositoryToken(Supermercado),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a supermercado', async () => {
      const createDto: CreateSupermercadoDto = {
        nombre: 'Supermercado Don Chucho',
        longitud: 123.456789,
        latitud: 45.678901,
        paginaWeb: 'https://www.supermercado-don-chucho.com',
      };

      jest.spyOn(repository, 'create').mockReturnValue(createDto as any);
      jest.spyOn(repository, 'save').mockResolvedValue(createDto as any);

      const result = await service.create(createDto);

      expect(result).toEqual(createDto);
    });

    it('should throw a BusinessException for short nombre', async () => {
      const createDto: CreateSupermercadoDto = {
        nombre: 'Short', // Less than 10 characters
        longitud: 123.456789,
        latitud: 45.678901,
        paginaWeb: 'https://www.short-supermarket.com',
      };

      await expect(service.create(createDto)).rejects.toThrowError(
        new BusinessException(
          'El nombre del supermercado debe tener más de 10 caracteres.',
          HttpStatus.BAD_REQUEST,
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

      jest.spyOn(repository, 'find').mockResolvedValue(supermercados);

      const result = await service.findAll();

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

      jest.spyOn(repository, 'findOne').mockResolvedValue(supermercado);

      const result = await service.findOne(1);

      expect(result).toEqual(supermercado);
    });

    it('should throw a NotFoundException for non-existing id', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrowError(
        new NotFoundException('Supermercado con ID 999 no encontrado.'),
      );
    });
  });

  describe('update', () => {
    it('should update a supermercado by id', async () => {
      const updateDto: CreateSupermercadoDto = {
        nombre: 'Updated Supermercado',
        longitud: 123.456789,
        latitud: 45.678901,
        paginaWeb: 'https://updated-supermarket.com',
      };

      const existingSupermercado: Supermercado = {
        id: 1,
        nombre: 'Supermercado Original',
        longitud: 1,
        latitud: 1,
        paginaWeb: 'https://original-supermarket.com',
      } as Supermercado;

      jest.spyOn(repository, 'findOne').mockResolvedValue(existingSupermercado);
      jest
        .spyOn(repository, 'save')
        .mockReturnValue({ ...existingSupermercado, ...updateDto } as any);
      jest
        .spyOn(repository, 'merge')
        .mockReturnValue({ ...existingSupermercado, ...updateDto } as any);

      const result = await service.update(1, updateDto);

      expect(result).toEqual({ ...existingSupermercado, ...updateDto });
    });

    it('should throw a BusinessException for short nombre', async () => {
      const updateDto: CreateSupermercadoDto = {
        nombre: 'Short', // Less than 10 characters
        longitud: 123.456789,
        latitud: 45.678901,
        paginaWeb: 'https://www.short-updated-supermarket.com',
      };

      const existingSupermercado: Supermercado = {
        id: 1,
        nombre: 'Supermercado Original',
        longitud: 1,
        latitud: 1,
        paginaWeb: 'https://original-supermarket.com',
      } as Supermercado;

      jest.spyOn(repository, 'findOne').mockResolvedValue(existingSupermercado);

      await expect(service.update(1, updateDto)).rejects.toThrowError(
        new BusinessException(
          'El nombre del supermercado debe tener más de 10 caracteres.',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it('should throw a NotFoundException for non-existing id', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const updateDto: CreateSupermercadoDto = {
        nombre: 'Updated Supermercado',
        longitud: 123.456789,
        latitud: 45.678901,
        paginaWeb: 'https://updated-supermarket.com',
      };

      await expect(service.update(999, updateDto)).rejects.toThrowError(
        new NotFoundException('Supermercado con ID 999 no encontrado.'),
      );
    });
  });

  describe('delete', () => {
    it('should delete a supermercado by id', async () => {
      const existingSupermercado: Supermercado = {
        id: 1,
        nombre: 'Supermercado Original',
        longitud: 1,
        latitud: 1,
        paginaWeb: 'https://original-supermarket.com',
      } as Supermercado;

      jest.spyOn(repository, 'findOne').mockResolvedValue(existingSupermercado);
      jest.spyOn(repository, 'remove').mockResolvedValue({} as any);

      await service.delete(1);

      // You can add further assertions or expect statements based on your use case
    });

    it('should throw a NotFoundException for non-existing id', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.delete(999)).rejects.toThrowError(
        new NotFoundException('Supermercado con ID 999 no encontrado.'),
      );
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
