import {getRepository} from 'typeorm';
import Endereco from '../models/Endereco';
import AppError from '../errors/AppError';

interface IRequest{
  Id_Endereco: number;
  cep_Endereco: string,
  logradouro_Endereco: string,
  numero_Endereco: string,
  bairro_Endereco: string,
  cidade_Endereco: string,
  estado_Endereco: string,
  pais_Endereco: string,
  complemento_Endereco?: string
}


class UpdateUser{

  public async execute({
    Id_Endereco,
    cep_Endereco,
    logradouro_Endereco,
    numero_Endereco,
    bairro_Endereco,
    cidade_Endereco,
    estado_Endereco,
    pais_Endereco,
    complemento_Endereco, }: IRequest): Promise<Endereco> {
    const enderecoRepositorie = getRepository(Endereco);

    const endereco = await enderecoRepositorie.findOne({where:{Id_Endereco}});

    const dataAtual = new Date();

    if (!endereco){
      throw new AppError('Endereco não encontrado!');
    }

    endereco.cep_Endereco = cep_Endereco;
    endereco.logradouro_Endereco = logradouro_Endereco;
    endereco.numero_Endereco = numero_Endereco;
    endereco.bairro_Endereco = bairro_Endereco;
    endereco.cidade_Endereco = cidade_Endereco;
    endereco.estado_Endereco = estado_Endereco;
    endereco.pais_Endereco = pais_Endereco;

    if (complemento_Endereco) {
      endereco.complemento_Endereco = complemento_Endereco;
    }

    endereco.dtAlteracao_Endereco = dataAtual;

    const response = await enderecoRepositorie.save(endereco);

    return response;

  }
}

export default UpdateUser;
