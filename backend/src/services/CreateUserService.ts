import {getRepository} from 'typeorm';
import Usuario from '../models/Usuario';
import {hash} from 'bcryptjs'
import AppError from '../errors/AppError'

interface IRequest{
  nome_Usuario: string;
  cpf_Usuario: string;
  rg_Usuario: string;
  senha_Usuario: string;

}

class CreateUser{

  public async execute({nome_Usuario, cpf_Usuario, rg_Usuario, senha_Usuario }: IRequest): Promise<Usuario> {
    const userRepositorie = getRepository(Usuario);
    const userExists = await userRepositorie.find({where:{cpf_Usuario}});
    const dataAtual = new Date()

    if (userExists.length > 0) {
      throw new AppError('Invalid CPF', 401);
    }

    const hashedPassword = await hash(senha_Usuario,8);
    const newUser = userRepositorie.create({nome_Usuario, cpf_Usuario,rg_Usuario , senha_Usuario: hashedPassword, dtCriacao_Usuario: dataAtual, dtAlteracao_Usuario:dataAtual});
    await userRepositorie.save(newUser);

    return newUser;

  }
}

export default CreateUser;
