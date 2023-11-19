import { Test, TestingModule } from '@nestjs/testing';
import { CiudadSupermecadoService } from './ciudad-supermecado.service';
import { Repository } from 'typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { Supermercado } from '../supermercado/entities/supermercado.entity';
import { NotFoundException } from '@nestjs/common';
import { BusinessException } from '../exceptions/business.exception';
import { CiudadService } from './ciudad.service';

describe('CiudadSupermecadoService', () => {
  let service: CiudadSupermecadoService;
  let ciudadRepository: Repository<Ciudad>;
  let supermercadoRepository: Repository<Supermercado>;
  let ciudadService: CiudadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CiudadSupermecadoService,
        {
          provide: 'CiudadRepository',
          useClass: Repository,
        },
        {
          provide: 'SupermercadoRepository',
          useClass: Repository,
        },
        {
          provide: CiudadService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CiudadSupermecadoService>(CiudadSupermecadoService);
    ciudadRepository = module.get('CiudadRepository');
    supermercadoRepository = module.get('SupermercadoRepository');
    ciudadService = module.get(CiudadService);
  });

  describe('findSupermarketsFromCity', () => {
    it('should find supermarkets from the city', async () => {
      const ciudadMock = { id: 1, supermercados: [] } as Ciudad;
      jest.spyOn(ciudadService, 'findOne').mockResolvedValueOnce(ciudadMock);

      const result = await service.findSupermarketsFromCity(1);

      expect(result).toEqual([]);
    });

    it('should throw NotFoundException if city not found', async () => {
      jest.spyOn(ciudadService, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.findSupermarketsFromCity(1)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('addSupermarketToCity', () => {
    it('should add a supermarket to the city', async () => {
      const ciudadMock = { id: 1, supermercados: [] } as Ciudad;
      jest.spyOn(ciudadService, 'findOne').mockResolvedValueOnce(ciudadMock);
      jest.spyOn(supermercadoRepository, 'findOne').mockResolvedValueOnce({ id: 2 } as Supermercado);
      jest.spyOn(ciudadRepository, 'save').mockResolvedValueOnce(ciudadMock);

      const result = await service.addSupermarketToCity(1, 2);

      expect(result).toEqual(ciudadMock);
    });

    it('should throw BusinessException if supermarket not found', async () => {
      jest.spyOn(ciudadService, 'findOne').mockResolvedValueOnce({ id: 1, supermercados: [] } as Ciudad);
      jest.spyOn(supermercadoRepository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.addSupermarketToCity(1, 2)).rejects.toThrowError(BusinessException);
    });

    it('should throw BusinessException if supermarket already in the city', async () => {
      const ciudadMock = { id: 1, supermercados: [{ id: 2 }] } as Ciudad;
      jest.spyOn(ciudadService, 'findOne').mockResolvedValueOnce(ciudadMock);
      jest.spyOn(supermercadoRepository, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(ciudadRepository, 'save').mockResolvedValue(ciudadMock as Ciudad);

      await expect(service.addSupermarketToCity(1, 2)).rejects.toThrowError(BusinessException);
    });
  });

  describe('findSupermarketFromCity', () => {
    it('should find a specific supermarket from the city', async () => {
      const ciudadMock = { id: 1, supermercados: [{ id: 2 }] } as Ciudad;
      jest.spyOn(ciudadService, 'findOne').mockResolvedValueOnce(ciudadMock);

      const result = await service.findSupermarketFromCity(1, 2);

      expect(result).toEqual({ id: 2 });
    });

    it('should throw NotFoundException if city not found', async () => {
      jest.spyOn(ciudadService, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.findSupermarketFromCity(1, 2)).rejects.toThrowError(NotFoundException);
    });

    it('should throw NotFoundException if supermarket not found in the city', async () => {
      const ciudadMock = { id: 1, supermercados: [] } as Ciudad;
      jest.spyOn(ciudadService, 'findOne').mockResolvedValueOnce(ciudadMock);

      await expect(service.findSupermarketFromCity(1, 2)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('updateSupermarketsFromCity', () => {
    it('should update supermarkets in the city', async () => {
      const ciudadMock = { id: 1, supermercados: [] } as Ciudad;
      jest.spyOn(ciudadService, 'findOne').mockResolvedValueOnce(ciudadMock);
      jest.spyOn(supermercadoRepository, 'find').mockResolvedValueOnce([{ id: 2 }] as Supermercado[]);
      jest.spyOn(ciudadRepository, 'save').mockResolvedValueOnce(ciudadMock);

      const result = await service.updateSupermarketsFromCity(1, [2]);

      expect(result).toEqual(ciudadMock);
    });

    it('should throw NotFoundException if city not found', async () => {
      jest.spyOn(ciudadService, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.updateSupermarketsFromCity(1, [2])).rejects.toThrowError(NotFoundException);
    });

    it('should throw BusinessException if not all supermarkets are found', async () => {
      const ciudadMock = { id: 1, supermercados: [] } as Ciudad;
      jest.spyOn(ciudadService, 'findOne').mockResolvedValueOnce(ciudadMock);
      jest.spyOn(supermercadoRepository, 'find').mockResolvedValueOnce([] as Supermercado[]);

      await expect(service.updateSupermarketsFromCity(1, [2])).rejects.toThrowError(BusinessException);
    });
  });

  describe('deleteSupermarketFromCity', () => {
    it('should delete a supermarket from the city', async () => {
      const ciudadMock = { id: 1, supermercados: [{ id: 2 }] } as Ciudad;
      jest.spyOn(ciudadService, 'findOne').mockResolvedValueOnce(ciudadMock);
      jest.spyOn(ciudadRepository, 'save').mockResolvedValueOnce(ciudadMock);

      await expect(service.deleteSupermarketFromCity(1, 2)).resolves.not.toThrowError();
      expect(ciudadMock.supermercados).toEqual([]);
    });

    it('should throw NotFoundException if city not found', async () => {
      jest.spyOn(ciudadService, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.deleteSupermarketFromCity(1, 2)).rejects.toThrowError(NotFoundException);
    });

    it('should throw BusinessException if supermarket not found in the city', async () => {
      const ciudadMock = { id: 1, supermercados: [] } as Ciudad;
      jest.spyOn(ciudadService, 'findOne').mockResolvedValueOnce(ciudadMock);

      await expect(service.deleteSupermarketFromCity(1, 2)).rejects.toThrowError(BusinessException);
    });
  });
});
