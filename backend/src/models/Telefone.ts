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

@Entity('Telefone')
class Telefone {
  @PrimaryGeneratedColumn()
  Id_Telefone: number;

  @Column()
  numero_Telefone: string;

  @Column()
  Id_Usuario: number;

  @ManyToOne(() => Usuario, {onDelete: "CASCADE", onUpdate:"CASCADE"})
  @JoinColumn({ name: 'Id_Usuario' })
  user: Usuario;

  @CreateDateColumn()
  dtCriacao_Telefone: Date;

  @UpdateDateColumn()
  dtAlteracao_Telefone: Date;

  @Column()
  codTipo_Telefone: number;
}

export default Telefone;
