import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,JoinColumn
} from 'typeorm';

import Paciente from './Paciente';
import Medico from './Medico';
import Estabelecimento from './Estabelecimento';




@Entity('Consulta')
class Consulta {
  @PrimaryGeneratedColumn()
  Id_Consulta: number;

  @Column()
  diagnostico_Consulta: string;

  @Column()
  receita_Consulta: string;

  @Column()
  especialidade_Consulta: string;

  @Column()
  sintomasPaciente_Consulta: string;

  @Column()
  obs_Consulta: string;

  @CreateDateColumn()
  dtCriacao_Consulta: Date;

  @UpdateDateColumn()
  dtAlteracao_Consulta: Date;

  @Column()
  Id_Estabelecimento: number;

  @Column()
  Id_Paciente: number;

  @Column()
  Id_Medico: number;

  @ManyToOne(() => Medico, {eager: true})
  @JoinColumn({ name: 'Id_Medico' })
  medico: Medico;

  @ManyToOne(() => Paciente, {eager: true})
  @JoinColumn({ name: 'Id_Paciente' })
  paciente: Paciente;

  @ManyToOne(() => Estabelecimento, {eager: true})
  @JoinColumn({ name: 'Id_Estabelecimento' })
  estabelecimento: Estabelecimento;

}

export default Consulta;
