import { Supermercado } from '../../supermercado/entities/supermercado.entity';
import { Column, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Ciudad {
  @PrimaryGeneratedColumn()
  id: number;
  nombre: string;
  pais: string;
  @Column('numero_habitantes')
  numeroHabitantes: number;

  @ManyToMany(() => Supermercado, (supermercado) => supermercado.ciudades)
  supermercados: Supermercado[];
}
