import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Usuario from '../models/Usuario';
import { compare } from 'bcryptjs';



interface IRequest {
  cpf_Usuario: string;
  senha_Usuario: string;
}
interface IResponse {
  usuario: Usuario;
  token: string;
}

class AuthenticateUserService {
  async execute({ cpf_Usuario, senha_Usuario }: IRequest): Promise<IResponse> {
    const usersRepository = getRepository(Usuario);

    const usuario = await usersRepository.findOne({where: {
      cpf_Usuario,
    }});



    if (!usuario) {

      throw new AppError('Incorrect cpf/password combination', 401);
    }

    const passwordMatched = await compare(
      senha_Usuario,
      usuario.senha_Usuario,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: usuario.Id_Usuario.toString(),
      expiresIn,
    });

    return {
      usuario,
      token,
    };
  }
}

export default AuthenticateUserService;
