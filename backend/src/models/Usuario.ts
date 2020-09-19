import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn, PrimaryColumn, PrimaryGeneratedColumn
} from 'typeorm';

@Entity('Usuario')
class User {
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
}

export default User;
