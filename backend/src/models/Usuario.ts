import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn, PrimaryColumn, PrimaryGeneratedColumn, OneToMany,JoinColumn
} from 'typeorm';
import Email from './Email';


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

  @Column()
  senha_Usuario: string;

  @CreateDateColumn()
  dtCriacao_Usuario: Date;

  @UpdateDateColumn()
  dtAlteracao_Usuario: Date;

  @OneToMany(type => Email, email => email.user, {cascade: true})
  emails: Email[];
}

export default Usuario;
