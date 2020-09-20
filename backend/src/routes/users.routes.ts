import { Router } from 'express';
import { getRepository } from 'typeorm';
import { Response, Request } from 'express';

import Usuario from '../models/Usuario';

import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';


import ensureAuthenticated from '../middlewares/ensureAuthenticated';
const usersRouter = Router();

//Lista os usuarios cadastrados
usersRouter.get('/',ensureAuthenticated, async (request:Request, response:Response) => {
  const usersRepositorie = getRepository(Usuario);
  const users = await usersRepositorie.find();

  return response.json(users);
});

//Cadastra um novo usuario
usersRouter.post('/',async (request: Request, response:Response) => {
  const { nome_Usuario, cpf_Usuario, rg_Usuario, senha_Usuario, email_Usuario } = request.body;
  const createUser = new CreateUserService();
  const usuario = await createUser.execute({
    nome_Usuario, cpf_Usuario, rg_Usuario, senha_Usuario,email_Usuario
  });
  return response.json(usuario);
});

//Editar usuario
usersRouter.put('/',ensureAuthenticated, async (request:Request, response:Response) => {
  const { nome_Usuario, senha_Usuario, novaSenha_Usuario, telefone_Usuario,  email_Usuario } = request.body;
  const Id_Usuario = Number(request.user.id);

  const updateUser = new UpdateUserService();
  const usuario = await updateUser.execute({
    Id_Usuario,
    nome_Usuario,
    senha_Usuario,
    novaSenha_Usuario,
    telefone_Usuario,
    email_Usuario
  })

  return response.json(usuario);
});




export default usersRouter;
