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
import { CiudadService } from './ciudad.service';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { Ciudad } from './entities/ciudad.entity';
import ErrorResponseDto from '../filters/error-response.dto';

@Controller('cities')
@ApiTags('Ciudades') // Etiqueta Swagger para el grupo de endpoints relacionados con Ciudades
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) {}

  @Post()
  @ApiCreatedResponse({ type: Ciudad, description: 'Crea una nueva ciudad' })
  @ApiBadRequestResponse({
    type: ErrorResponseDto,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createCiudadDto: CreateCiudadDto) {
    return this.ciudadService.create(createCiudadDto);
  }

  @Get()
  @ApiOkResponse({ type: [Ciudad], description: 'Obtiene todas las ciudades' })
  findAll() {
    return this.ciudadService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Ciudad, description: 'Obtiene una ciudad por su ID' })
  @ApiNotFoundResponse({
    type: ErrorResponseDto,
    description: 'Ciudad no encontrada',
  })
  findOne(@Param('id') id: string) {
    return this.ciudadService.findOne(+id);
  }

  @Put(':id')
  @ApiOkResponse({
    type: Ciudad,
    description: 'Actualiza una ciudad por su ID',
  })
  @ApiNotFoundResponse({
    type: ErrorResponseDto,
    description: 'Ciudad no encontrada',
  })
  @ApiBadRequestResponse({
    type: ErrorResponseDto,
    description: 'Datos de entrada inválidos',
  })
  update(@Param('id') id: string, @Body() updateCiudadDto: CreateCiudadDto) {
    return this.ciudadService.update(+id, updateCiudadDto);
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'Elimina una ciudad por su ID' })
  @ApiNotFoundResponse({
    type: ErrorResponseDto,
    description: 'Ciudad no encontrada',
  })
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.ciudadService.delete(+id);
  }
}
