import { ApiProperty } from '@nestjs/swagger';

export default class ErrorResponseDto {
  @ApiProperty({
    description: 'Código de estado HTTP de la respuesta',
    example: 404,
  })
  public statusCode: number;

  @ApiProperty({
    description: 'Error generado',
    example: 'Not Found ',
  })
  public error: string;

  @ApiProperty({
    description: 'Mensaje descriptivo del error',
    example: 'Longitud del campo invalida / ID no encontrado',
  })
  public message: string;
}
