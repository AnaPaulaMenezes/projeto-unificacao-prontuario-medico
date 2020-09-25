import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn
} from 'typeorm';

import Consulta from './Consulta';

@Entity('Medico')
class Medico {
  @PrimaryGeneratedColumn()
  Id_Medico: number;

  @Column()
  nome_Medico: string;


  @Column()
  crm_Medico: string;

  @CreateDateColumn()
  dtCriacao_Medico: Date;

  @UpdateDateColumn()
  dtAlteracao_Medico: Date;

  @OneToMany(type => Consulta, consulta => consulta.medico)
  consultas: Consulta[];

}

export default Medico;
