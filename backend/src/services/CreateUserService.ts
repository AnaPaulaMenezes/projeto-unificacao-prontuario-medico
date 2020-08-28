import {getRepository} from 'typeorm';
import User from '../models/User';
import {hash} from 'bcryptjs'
import AppError from '../errors/AppError'

interface IRequest{
  name: string;
  cpf: string;
  rg: string;
  password: string;
  born: Date;
}

class CreateUser{

  public async execute({name, cpf, rg, password, born }: IRequest): Promise<User> {
    const userRepositorie = getRepository(User);
    const userExists = await userRepositorie.find({where:{cpf}});


    if (userExists.length > 0) {
      throw new AppError('Invalid CPF', 401);
    }

    const hashedPassword = await hash(password,8);
    const newUser = userRepositorie.create({name, cpf, rg, password: hashedPassword, born});
    await userRepositorie.save(newUser);

    return newUser;

  }
}

export default CreateUser;
