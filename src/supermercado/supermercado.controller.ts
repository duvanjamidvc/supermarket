import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SupermercadoService } from './supermercado.service';
import { CreateSupermercadoDto } from './dto/create-supermercado.dto';
import { UpdateSupermercadoDto } from './dto/update-supermercado.dto';

@Controller('supermercado')
export class SupermercadoController {
  constructor(private readonly supermecadoService: SupermercadoService) {}

  @Post()
  create(@Body() createSupermecadoDto: CreateSupermercadoDto) {
    return this.supermecadoService.create(createSupermecadoDto);
  }

  @Get()
  findAll() {
    return this.supermecadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supermecadoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSupermecadoDto: UpdateSupermercadoDto,
  ) {
    return this.supermecadoService.update(+id, updateSupermecadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supermecadoService.remove(+id);
  }
}
