import { ApiProperty } from '@nestjs/swagger';

export class CiudadSupermercadoDto {
  @ApiProperty({
    type: [Object],
    example: [{ id: 'exampleId' }],
    description: 'Lista de identificadores de supermercados.',
  })
  supermercadoId: { id: string }[];
}
