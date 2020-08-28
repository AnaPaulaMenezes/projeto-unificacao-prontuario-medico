import { Router } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';


const usersRouter = Router();


usersRouter.get('/', async (request, response) => {
  const usersRepositorie = getRepository(User);
  const users = await usersRepositorie.find();

  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { name, cpf, rg, password, born } = request.body;
  const createUser = new CreateUserService();
  const user = await createUser.execute({
    name, cpf, rg, password, born
  });
  return response.json(user);
});




export default usersRouter;
