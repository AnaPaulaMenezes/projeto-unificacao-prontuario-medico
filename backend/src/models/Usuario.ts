import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn, PrimaryColumn, PrimaryGeneratedColumn, OneToMany,JoinColumn, OneToOne
} from 'typeorm';
import Email from './Email';
import Telefone from './Telefone';
import Endereco from './Endereco';
import Paciente from './Paciente';
import { Exclude } from 'class-transformer';



@Entity('Usuario')
class Usuario {
  @PrimaryGeneratedColumn()
  Id_Usuario: number;

  @Column()
  nome_Usuario: string;

  @Column()
  cpf_Usuario: string;

  @Column()
  rg_Usuario: string;

  @Column()
  dtNascimento_Usuario: Date;

  @Exclude()
  @Column()
  senha_Usuario: string;

  @CreateDateColumn()
  dtCriacao_Usuario: Date;

  @UpdateDateColumn()
  dtAlteracao_Usuario: Date;

  @OneToMany(type => Email, email => email.user, {cascade: true, eager:true})
  emails: Email[];

  @OneToMany(type => Telefone, telefone => telefone.user, {cascade: true, eager:true})
  telefones: Telefone[];

  @OneToOne(type => Endereco, endereco => endereco.user, {cascade: true, eager:true})
  endereco: Endereco;

  @OneToOne(type => Paciente, paciente => paciente.user, {cascade: true, eager:true})
  paciente: Paciente;
}

export default Usuario;
