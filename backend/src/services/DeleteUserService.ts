import {getRepository} from 'typeorm';
import User from '../models/User';
import AppError from '../errors/AppError'
import usersRouter from '../routes/users.routes';


class DeleteUser{

  public async execute(id:string): Promise<void> {
    const usersReposotory = getRepository(User);
    const user = await usersReposotory.findOne(id);
    if (!user){
      throw new AppError ('User not found', 400);
    }

    await usersReposotory.remove(user);
  }
}

export default DeleteUser;
