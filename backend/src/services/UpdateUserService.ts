import {getRepository} from 'typeorm';
import Usuario from '../models/Usuario';
import {hash,compare} from 'bcryptjs'
import AppError from '../errors/AppError'
import Email from '../models/Email';
import Telefone from '../models/Telefone';

interface IRequest{
  Id_Usuario:number;
  nome_Usuario: string;
  dtNascimento_Usuario?: Date;
  senha_Usuario?: string;
  novaSenha_Usuario?: string;
  email_Usuario?: Email[];
  telefone_Usuario?: Telefone[];

}


class UpdateUser{

  public async execute({Id_Usuario,
    nome_Usuario,
    dtNascimento_Usuario,
    senha_Usuario,
    email_Usuario,
    novaSenha_Usuario,
    telefone_Usuario, }: IRequest): Promise<Usuario> {
    const userRepositorie = getRepository(Usuario);

    const usuario = await userRepositorie.findOne({where:{Id_Usuario}});

    const dataAtual = new Date();

    if (!usuario){
      throw new AppError('Usuário não encontrado!');
    }

    usuario.nome_Usuario = nome_Usuario;
    usuario.dtAlteracao_Usuario = dataAtual;
    if(dtNascimento_Usuario){
      usuario.dtNascimento_Usuario = dtNascimento_Usuario;
    }

    if(email_Usuario){
      usuario.emails = email_Usuario
    }

    if(telefone_Usuario){
      usuario.telefones = telefone_Usuario
    }

    if (senha_Usuario && !novaSenha_Usuario) {
      throw new AppError(
        'Necessário inserir senha atual para criar uma nova senha',
      );
    }

    if (senha_Usuario && novaSenha_Usuario) {
      const checkOldPassword = await compare(
        senha_Usuario,
        usuario.senha_Usuario,
      );

      if (!checkOldPassword) {
        throw new AppError('Senha incorreta');
      }
      usuario.senha_Usuario = await hash(novaSenha_Usuario,8);
    }




    const response = await userRepositorie.save(usuario);

    return response;

  }
}

export default UpdateUser;
