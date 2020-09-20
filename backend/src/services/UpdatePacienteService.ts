import {getRepository} from 'typeorm';
import Paciente from '../models/Paciente';
import AppError from '../errors/AppError';


interface IRequest{
  Id_Paciente: number;
  tipoSanguineo_Paciente: string;
  altura_Paciente: number;
  peso_Paciente: number;
  obs_Paciente: string;
  alergias_Paciente: string;
  doencasCronicas_Paciente: string;
  remediosContinuos_Paciente: string;
}


class UpdateUser{

  public async execute({Id_Paciente,
    tipoSanguineo_Paciente,
    altura_Paciente,
    peso_Paciente,
    obs_Paciente,
    alergias_Paciente,
    doencasCronicas_Paciente,
    remediosContinuos_Paciente ,
  }: IRequest): Promise<Paciente> {
    const pacienteRepositorie = getRepository(Paciente);

    const paciente = await pacienteRepositorie.findOne({where:{Id_Paciente}});

    const dataAtual = new Date();

    if (!paciente){
      throw new AppError('Paciente não encontrado!');
    }


    paciente.tipoSanguineo_Paciente = tipoSanguineo_Paciente
    paciente.altura_Paciente = altura_Paciente
    paciente.peso_Paciente = peso_Paciente
    paciente.obs_Paciente = obs_Paciente
    paciente.alergias_Paciente = alergias_Paciente
    paciente.doencasCronicas_Paciente = doencasCronicas_Paciente
    paciente.remediosContinuos_Paciente  = remediosContinuos_Paciente
    paciente.dtAlteracao_Paciente = dataAtual;

    const response = await pacienteRepositorie.save(paciente);

    return response;

  }
}

export default UpdateUser;
