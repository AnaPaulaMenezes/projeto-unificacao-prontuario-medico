import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';

import Usuario from './Usuario';

@Entity('Endereco')
class Endereco {
  @PrimaryGeneratedColumn()
  Id_Endereco: number;

  @Column()
  cep_Endereco: string;

  @Column()
  logradouro_Endereco: string;

  @Column()
  numero_Endereco: string;

  @Column()
  bairro_Endereco: string;

  @Column()
  cidade_Endereco: string;

  @Column()
  estado_Endereco: string;

  @Column()
  pais_Endereco: string;

  @Column()
  complemento_Endereco: string;

  @Column()
  Id_Usuario: number;

  @OneToOne(type => Usuario, usuario => usuario.endereco)
  @JoinColumn({ name: 'id_Usuario' })
  user: Usuario;

  @CreateDateColumn()
  dtCriacao_Endereco: Date;

  @UpdateDateColumn()
  dtAlteracao_Endereco: Date;

}

export default Endereco;
