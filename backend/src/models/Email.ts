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

@Entity('Email')
class Email {
  @PrimaryGeneratedColumn()
  id_Email: number;

  @Column()
  endereco_Email: string;

  @Column()
  Id_Usuario: number;


  @ManyToOne(() => Usuario, {onDelete: "CASCADE", onUpdate:"CASCADE"})
  @JoinColumn({ name: 'Id_Usuario' })
  user: Usuario;

  @CreateDateColumn()
  dtCriacao_Email: Date;

  @UpdateDateColumn()
  dtAlteracao_Email: Date;


  @Column()
  codTipo_Email: number;
}

export default Email;
