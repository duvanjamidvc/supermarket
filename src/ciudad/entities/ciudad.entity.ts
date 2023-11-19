import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Supermercado } from '../../supermercado/entities/supermercado.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Ciudad {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Identificador único de la ciudad' })
  id: number;

  @Column()
  @ApiProperty({
    example: 'Ciudad del Cairo',
    description: 'Nombre de la ciudad',
  })
  nombre: string;

  @Column()
  @ApiProperty({
    example: 'Egipto',
    description: 'País al que pertenece la ciudad',
  })
  pais: string;

  @Column('int', { name: 'numero_habitantes' })
  @ApiProperty({
    example: 1000000,
    description: 'Número de habitantes de la ciudad',
  })
  numeroHabitantes: number;

  @ManyToMany(() => Supermercado)
  @JoinTable({ name: 'ciudad_supermercado' })
  @ApiPropertyOptional({
    type: () => Supermercado,
    isArray: true,
    description: 'Lista de supermercados asociados a la ciudad',
  })
  supermercados: Supermercado[];
}
