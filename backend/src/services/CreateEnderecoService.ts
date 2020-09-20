import {getRepository, getConnection} from 'typeorm';
import Endereco from '../models/Endereco';
import AppError from '../errors/AppError';

interface IRequest{
  Id_Usuario: number;
  cep_Endereco: string,
  logradouro_Endereco: string,
  numero_Endereco: string,
  bairro_Endereco: string,
  cidade_Endereco: string,
  estado_Endereco: string,
  pais_Endereco: string,
  complemento_Endereco?: string
}

class CreateUser{

  public async execute({ Id_Usuario,
    cep_Endereco,
    logradouro_Endereco,
    numero_Endereco,
    bairro_Endereco,
    cidade_Endereco,
    estado_Endereco,
    pais_Endereco,
    complemento_Endereco,
  }: IRequest): Promise<Endereco> {
    const enderecoRepositorie = getRepository(Endereco);

    const dataAtual = new Date()

    const novoEndereco = enderecoRepositorie.create({
      Id_Usuario,
      cep_Endereco,
      logradouro_Endereco,
      numero_Endereco,
      bairro_Endereco,
      cidade_Endereco,
      estado_Endereco,
      pais_Endereco,
      complemento_Endereco,
      dtCriacao_Endereco: dataAtual,
      dtAlteracao_Endereco:dataAtual
    });

      await enderecoRepositorie.save(novoEndereco);

    return novoEndereco;

  }
}

export default CreateUser;
