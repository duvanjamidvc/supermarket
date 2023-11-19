//Un supermercado tiene un nombre, una longitud, una latitud y una página web.
import { Column, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ciudad } from '../../ciudad/entities/ciudad.entity';

export class Supermercado {
  @PrimaryGeneratedColumn()
  id: number;
  nombre: string;
  longitud: number;
  latitud: number;
  @Column('pagina_web')
  paginaWeb: string;
  @ManyToMany(() => Ciudad, (ciudad) => ciudad.supermercados)
  ciudades: Ciudad[];
}
