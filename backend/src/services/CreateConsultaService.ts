import { getRepository, getConnection } from 'typeorm';
import Consulta from '../models/Consulta';
import Paciente from '../models/Paciente';
import AppError from '../errors/AppError';

interface IRequest {
  Id_Usuario: Number;
  diagnostico_Consulta?: string;
  receita_Consulta?: string;
  especialidade_Consulta: string;
  sintomasPaciente_Consulta: string;
  obs_Consulta: string;
  Id_Estabelecimento: number;
  Id_Medico: number;
  dt_consulta: Date;
}

class CreateUser {

  public async execute({ Id_Usuario,
    diagnostico_Consulta,
    receita_Consulta,
    especialidade_Consulta,
    sintomasPaciente_Consulta,
    obs_Consulta,
    Id_Estabelecimento,
    Id_Medico,
    dt_consulta,
  }: IRequest): Promise<Consulta> {
    const consultaRepositorie = getRepository(Consulta);
    const pacienteRepositorie = getRepository(Paciente);
    const p = await pacienteRepositorie.findOneOrFail({ where: { Id_Usuario } });
    const indisponivel = await consultaRepositorie.find({ where: { dt_consulta, Id_Medico } });
    if (indisponivel.length > 0) {

      throw new AppError('Data e horario indisponivel')
    }
    const dataAtual = new Date()
    if (p) {
      const novaConsulta = consultaRepositorie.create({
        Id_Paciente: p.Id_Paciente,
        diagnostico_Consulta: diagnostico_Consulta ? diagnostico_Consulta : '',
        receita_Consulta: receita_Consulta ? receita_Consulta : '',
        especialidade_Consulta,
        sintomasPaciente_Consulta,
        obs_Consulta,
        Id_Estabelecimento,
        Id_Medico,
        dtCriacao_Consulta: dataAtual,
        dtAlteracao_Consulta: dataAtual,
        dt_consulta
      });

      await consultaRepositorie.save(novaConsulta);

      return novaConsulta;
    } else {
      return {} as Consulta;
    }


  }
}

export default CreateUser;
