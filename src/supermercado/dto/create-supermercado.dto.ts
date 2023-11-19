import { ApiProperty } from '@nestjs/swagger';

export class CreateSupermercadoDto {
  @ApiProperty({
    description: 'Nombre del supermercado',
    example: 'Supermercado Don Chucho',
  })
  nombre: string;

  @ApiProperty({
    description: 'Longitud geográfica del supermercado',
    example: 123.456789,
  })
  longitud: number;

  @ApiProperty({
    description: 'Latitud geográfica del supermercado',
    example: 45.678901,
  })
  latitud: number;

  @ApiProperty({
    description: 'Página web del supermercado',
    example: 'https://www.supermercado-don-chucho.com',
  })
  paginaWeb: string;
}
