import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import User from '../models/User';
import { compare } from 'bcryptjs';



interface IRequest {
  cpf: string;
  password: string;
}
interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {
  async execute({ cpf, password }: IRequest): Promise<IResponse> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({where: {
      cpf,
    }});



    if (!user) {

      throw new AppError('Incorrect cpf/password combination', 401);
    }

    const passwordMatched = await compare(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    console.log(token)
    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
