import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SupermercadoService } from './supermercado.service';
import { CreateSupermercadoDto } from './dto/create-supermercado.dto';
import { Supermercado } from './entities/supermercado.entity';
import ErrorResponseDto from '../filters/error-response.dto';

@Controller('supermarkets')
@ApiTags('Supermercados') // Etiqueta Swagger para el grupo de endpoints relacionados con Supermercados
export class SupermercadoController {
  constructor(private readonly supermercadoService: SupermercadoService) {}

  @Post()
  @ApiCreatedResponse({
    type: Supermercado,
    description: 'Crea un nuevo supermercado',
  })
  @ApiBadRequestResponse({
    type: ErrorResponseDto,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createSupermercadoDto: CreateSupermercadoDto) {
    return this.supermercadoService.create(createSupermercadoDto);
  }

  @Get()
  @ApiOkResponse({
    type: [Supermercado],
    description: 'Obtiene todos los supermercados',
  })
  findAll() {
    return this.supermercadoService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: Supermercado,
    description: 'Obtiene un supermercado por su ID',
  })
  @ApiNotFoundResponse({
    type: ErrorResponseDto,
    description: 'Supermercado no encontrado',
  })
  findOne(@Param('id') id: string) {
    return this.supermercadoService.findOne(+id);
  }

  @Put(':id')
  @ApiOkResponse({
    type: Supermercado,
    description: 'Actualiza un supermercado por su ID',
  })
  @ApiBadRequestResponse({
    type: ErrorResponseDto,
    description: 'Datos de entrada inválidos',
  })
  @ApiNotFoundResponse({
    type: ErrorResponseDto,
    description: 'Supermercado no encontrado',
  })
  update(
    @Param('id') id: string,
    @Body() updateSupermercadoDto: CreateSupermercadoDto,
  ) {
    return this.supermercadoService.update(+id, updateSupermercadoDto);
  }

  @Delete(':id')
  @ApiNoContentResponse({
    description: 'Elimina un supermercado por su ID',
  })
  @ApiNotFoundResponse({
    type: ErrorResponseDto,
    description: 'Supermercado no encontrado',
  })
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.supermercadoService.delete(+id);
  }
}
