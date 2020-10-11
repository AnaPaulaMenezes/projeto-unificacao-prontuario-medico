import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';
import Exame_Consulta from './Exame_Consulta';
import Usuario from './Usuario';

@Entity('Exame')
class Exame {
  @PrimaryGeneratedColumn()
  Id_Exame: number;

  @Column()
  descricao_Exame: string;


  @Column()
  obs_Exame: string;

  @CreateDateColumn()
  dtCriacao_Exame: Date;

  @UpdateDateColumn()
  dtAlteracao_Exame: Date;

  @OneToMany(type => Exame_Consulta, exame_consulta => exame_consulta.consulta)
  Exame_consultas: Exame_Consulta[];


}

export default Exame;
