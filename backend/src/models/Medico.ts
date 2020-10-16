import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import Consulta from './Consulta';
import Especialidade from './Especialidade';

@Entity('Medico')
class Medico {
  @PrimaryGeneratedColumn()
  Id_Medico: number;

  @Column()
  nome_Medico: string;


  @Column()
  crm_Medico: string;

  @Column()
  Id_Especialidade: number;

  @CreateDateColumn()
  dtCriacao_Medico: Date;

  @UpdateDateColumn()
  dtAlteracao_Medico: Date;

  @OneToMany(type => Consulta, consulta => consulta.medico)
  consultas: Consulta[];

  @ManyToOne(() => Especialidade, { eager: true })
  @JoinColumn({ name: 'Id_Especialidade' })
  especialidade: Especialidade;


}

export default Medico;
