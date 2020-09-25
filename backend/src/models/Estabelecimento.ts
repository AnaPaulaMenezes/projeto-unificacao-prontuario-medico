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

@Entity('Estabelecimento')
class Estabelecimento {
  @PrimaryGeneratedColumn()
  Id_Estabelecimento : number;

  @Column()
  descricao_Estabelecimento : string;


  @Column()
  cnpj_Estabelecimento: string;

  @CreateDateColumn()
  dtCriacao_Estabelecimento: Date;

  @UpdateDateColumn()
  dtAlteracao_Estabelecimento: Date;

  @OneToMany(type => Consulta, consulta => consulta.estabelecimento)
  consultas: Consulta[];
}

export default Estabelecimento ;
