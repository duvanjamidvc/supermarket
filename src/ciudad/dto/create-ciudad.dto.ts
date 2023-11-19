import { ApiProperty } from '@nestjs/swagger';

export class CreateCiudadDto {
  @ApiProperty({
    description: 'Nombre de la ciudad',
    example: 'Ciudad del Cairo',
  })
  nombre: string;

  @ApiProperty({
    description: 'País al que pertenece la ciudad',
    example: 'Egipto',
  })
  pais: string;

  @ApiProperty({
    description: 'Número de habitantes de la ciudad',
    example: 1000000,
  })
  numeroHabitantes: number;
}
