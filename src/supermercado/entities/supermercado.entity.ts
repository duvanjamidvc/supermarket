import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Ciudad } from '../../ciudad/entities/ciudad.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Supermercado {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Identificador único del supermercado',
  })
  id: number;

  @Column()
  @ApiProperty({
    example: 'Supermercado Ejemplo',
    description: 'Nombre del supermercado',
  })
  nombre: string;

  @Column()
  @ApiProperty({
    example: 123.456789,
    description: 'Longitud geográfica del supermercado',
  })
  longitud: number;

  @Column()
  @ApiProperty({
    example: 45.678901,
    description: 'Latitud geográfica del supermercado',
  })
  latitud: number;

  @Column({ name: 'pagina_web' })
  @ApiProperty({
    example: 'https://www.supermercadoejemplo.com',
    description: 'Página web del supermercado',
  })
  paginaWeb: string;

  @ManyToMany(() => Ciudad)
  @JoinTable({ name: 'ciudad_supermercado' })
  @ApiPropertyOptional({
    type: () => Ciudad,
    isArray: true,
    description: 'Lista de ciudades asociadas al supermercado',
  })
  ciudades: Ciudad[];
}
