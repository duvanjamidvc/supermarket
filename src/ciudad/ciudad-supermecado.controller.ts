import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { Supermercado } from '../supermercado/entities/supermercado.entity';
import { CiudadSupermercadoDto } from './dto/ciudad-supermercado.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiPreconditionFailedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CiudadSupermecadoService } from './ciudad-supermecado.service';
import { Ciudad } from './entities/ciudad.entity';
import ErrorResponseDto from '../filters/error-response.dto';

@Controller('cities/:cityId/supermarkets')
@ApiTags('Ciudad - Supermercado')
export class CiudadSupermecadoController {
  constructor(private readonly ciudadSupermercadoService: CiudadSupermecadoService) {}

  @Post(':supermarketId')
  @ApiCreatedResponse({ type: Ciudad, description: 'Supermercado añadido exitosamente a la ciudad' })
  @ApiBadRequestResponse({ type: ErrorResponseDto, description: 'Datos de entrada inválidos' })
  @ApiPreconditionFailedResponse({ type: ErrorResponseDto, description: 'Supermercado No existe' })
  addSupermarketToCity(@Param('cityId') cityId: string, @Param('supermarketId') supermarketId: string): Promise<Ciudad> {
    return this.ciudadSupermercadoService.addSupermarketToCity(+cityId, +supermarketId);
  }

  @Get()
  @ApiOkResponse({ type: [Supermercado], description: 'Obtiene todos los supermercados de la ciudad' })
  findSupermarketsFromCity(@Param('cityId') cityId: string): Promise<Supermercado[]> {
    return this.ciudadSupermercadoService.findSupermarketsFromCity(+cityId);
  }

  @Get(':supermarketId')
  @ApiOkResponse({ type: Supermercado, description: 'Obtiene un supermercado específico de la ciudad por su ID' })
  @ApiNotFoundResponse({ type: ErrorResponseDto, description: 'Supermercado o Ciudad no encontrado' })
  findSupermarketFromCity(@Param('cityId') cityId: string, @Param('supermarketId') supermarketId: string): Promise<Supermercado> {
    return this.ciudadSupermercadoService.findSupermarketFromCity(+cityId, +supermarketId);
  }

  @Put()
  @ApiOkResponse({ type: Supermercado, description: 'Actualiza los supermercados de la ciudad' })
  @ApiNotFoundResponse({ type: ErrorResponseDto, description: 'Ciudad no encontrada' })
  @ApiBadRequestResponse({ type: ErrorResponseDto, description: 'Datos de entrada inválidos' })
  @ApiPreconditionFailedResponse({ type: ErrorResponseDto, description: 'Supermercado No existe' })
  updateSupermarketsFromCity(@Param('cityId') cityId: string, @Body() updateCiudadSupermercadoDto: CiudadSupermercadoDto): Promise<Ciudad> {
    return this.ciudadSupermercadoService.updateSupermarketsFromCity(
      +cityId,
      updateCiudadSupermercadoDto.supermercadoId.map((key) => parseInt(key.id)),
    );
  }

  @Delete(':supermarketId')
  @ApiNoContentResponse({ description: 'Supermercado eliminado exitosamente de la ciudad' })
  @ApiNotFoundResponse({ description: 'Supermercado no encontrado' })
  @HttpCode(204)
  deleteSupermarketFromCity(@Param('cityId') cityId: string, @Param('supermarketId') supermarketId: string): Promise<void> {
    return this.ciudadSupermercadoService.deleteSupermarketFromCity(+cityId, +supermarketId);
  }
}
