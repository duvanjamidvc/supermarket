import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCiudadDto {
  @ApiProperty({
    description: 'Nombre de la ciudad',
    example: 'Ciudad de la plata',
  })
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    description: 'País al que pertenece la ciudad',
    example: 'Argentina',
  })
  @IsNotEmpty()
  pais: string;

  @ApiProperty({
    description: 'Número de habitantes de la ciudad',
    example: 1000000,
  })
  @IsNotEmpty()
  numeroHabitantes: number;
}
