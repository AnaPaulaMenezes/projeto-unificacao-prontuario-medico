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

import Consulta from './Consulta';
import Exame from './Exame';

@Entity('Exame_Consulta')
class Exame_Consulta {
  @PrimaryGeneratedColumn()
  Id_Exame_Consulta: number;

  @Column()
  tecnico_Exame_Consulta: string;


  @Column()
  obs_Exame_Consulta: string;

  @Column()
  Id_Consulta: number;

  @Column()
  Id_Exame: number;


  @CreateDateColumn()
  dtCriacao_Exame_Consulta: Date;

  @UpdateDateColumn()
  dtAlteracao_Exame_Consulta: Date;

  @Column()
  arquivo_Exame_Consulta: string;

  @ManyToOne(() => Consulta)
  @JoinColumn({ name: 'Id_Consulta' })
  consulta: Consulta;

  @ManyToOne(() => Exame, { eager: true })
  @JoinColumn({ name: 'Id_Exame' })
  exame: Exame;

}

export default Exame_Consulta;
