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

import Medico from './Medico';

@Entity('Especialidade')
class Especialidade {
  @PrimaryGeneratedColumn()
  Id_Especialidade: number;

  @Column()
  Descricao_Especialidade: string;


  @CreateDateColumn()
  dtCriacao_Especialidade: Date;

  @UpdateDateColumn()
  dtAlteracao_Especialidade: Date;

  @OneToMany(type => Medico, medico => medico.especialidade)
  medicos: Medico[];

}

export default Especialidade;
