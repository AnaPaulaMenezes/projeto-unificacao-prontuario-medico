import {getRepository, getConnection} from 'typeorm';
import Usuario from '../models/Usuario';
import Email from '../models/Email';
import {hash} from 'bcryptjs'
import AppError from '../errors/AppError'

interface IRequest{
  nome_Usuario: string;
  cpf_Usuario: string;
  rg_Usuario: string;
  senha_Usuario: string;
  email_Usuario?: string;

}

interface EmailProp{
  endereco_Email: string
}


class CreateUser{

  public async execute({nome_Usuario, cpf_Usuario, rg_Usuario, senha_Usuario, email_Usuario }: IRequest): Promise<Usuario> {
    const userRepositorie = getRepository(Usuario);

    const userExists = await userRepositorie.find({where:{cpf_Usuario}});
    const emails:EmailProp[] = []
    const dataAtual = new Date()

    if (userExists.length > 0) {
      throw new AppError('Invalid CPF', 401);
    }
    if(email_Usuario){
      emails.push({

          endereco_Email : email_Usuario

      });
    }




    const hashedPassword = await hash(senha_Usuario,8);
    const newUser = userRepositorie.create({nome_Usuario, cpf_Usuario,rg_Usuario , senha_Usuario: hashedPassword, dtCriacao_Usuario: dataAtual, dtAlteracao_Usuario:dataAtual, emails});
    await userRepositorie.save(newUser);

    return newUser;

  }
}

export default CreateUser;
