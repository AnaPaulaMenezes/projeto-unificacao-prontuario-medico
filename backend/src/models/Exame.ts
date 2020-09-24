import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

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




}

export default Exame;
