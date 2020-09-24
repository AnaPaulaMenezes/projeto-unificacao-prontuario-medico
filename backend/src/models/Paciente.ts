import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn, PrimaryGeneratedColumn, OneToMany,JoinColumn, OneToOne
} from 'typeorm';
import Usuario from './Usuario';
import Consulta from './Consulta';


@Entity('Paciente')
class Paciente {
  @PrimaryGeneratedColumn()
  Id_Paciente: number;

  @Column()
  tipoSanguineo_Paciente: string;

  @Column('decimal', { precision: 18, scale: 2 })
  altura_Paciente: number;

  @Column('decimal', { precision: 18, scale: 2 })
  peso_Paciente: number;

  @Column()
  obs_Paciente: string;

  @Column()
  alergias_Paciente: string;

  @Column()
  doencasCronicas_Paciente: string;

  @Column()
  remediosContinuos_Paciente: string;

  @Column()
  Id_Usuario: number;

  @OneToOne(type => Usuario, usuario => usuario.paciente)
  @JoinColumn({ name: 'Id_Usuario' })
  user: Usuario;

  @CreateDateColumn()
  dtCriacao_Paciente: Date;

  @UpdateDateColumn()
  dtAlteracao_Paciente: Date;

  @OneToMany(type => Consulta, consulta => consulta.paciente)
  consultas: Consulta[];


}

export default Paciente;
