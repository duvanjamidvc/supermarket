import { Test, TestingModule } from '@nestjs/testing';
import { CiudadSupermecadoService } from './ciudad-supermecado.service';

describe('CiudadSupermecadoService', () => {
  let service: CiudadSupermecadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CiudadSupermecadoService],
    }).compile();

    service = module.get<CiudadSupermecadoService>(CiudadSupermecadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
