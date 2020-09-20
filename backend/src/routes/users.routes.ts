import { Router } from 'express';
import { getRepository } from 'typeorm';
import { Response, Request } from 'express';
import { classToClass } from 'class-transformer';
import Usuario from '../models/Usuario';
import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';
import CreateEnderecoService from '../services/CreateEnderecoService';
import UpdateEnderecoService from '../services/UpdateEnderecoService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';


const usersRouter = Router();

//Lista os usuarios cadastrados
usersRouter.get('/',ensureAuthenticated, async (request:Request, response:Response) => {
  const Id_Usuario = request.user.id
  const usersRepositorie = getRepository(Usuario);
  const users = await usersRepositorie.find({where:{Id_Usuario}});

  return response.json(classToClass(users));
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

//Editar dados cadastrais e de contato do usuario
usersRouter.put('/',ensureAuthenticated, async (request:Request, response:Response) => {
  const { nome_Usuario, senha_Usuario, novaSenha_Usuario, telefone_Usuario,  email_Usuario,dtNascimento_Usuario } = request.body;
  const Id_Usuario = Number(request.user.id);

  const updateUser = new UpdateUserService();
  const usuario = await updateUser.execute({
    Id_Usuario,
    nome_Usuario,
    dtNascimento_Usuario,
    senha_Usuario,
    novaSenha_Usuario,
    telefone_Usuario,
    email_Usuario,
  });

  return response.json(usuario);
});



//Cadastra um novo endereco
usersRouter.post('/endereco',ensureAuthenticated, async (request: Request, response:Response) => {
  const {
    cep_Endereco,
    logradouro_Endereco,
    numero_Endereco,
    bairro_Endereco,
    cidade_Endereco,
    estado_Endereco,
    pais_Endereco,
    complemento_Endereco
  } = request.body;

  const Id_Usuario = Number(request.user.id);
  const createEnderecoService = new CreateEnderecoService();
  const endereco = await createEnderecoService.execute({
    Id_Usuario,
    cep_Endereco,
    logradouro_Endereco,
    numero_Endereco,
    bairro_Endereco,
    cidade_Endereco,
    estado_Endereco,
    pais_Endereco,
    complemento_Endereco
  });
  return response.json(endereco);
});


//Editar endereco do usuario
usersRouter.put('/endereco',ensureAuthenticated, async (request: Request, response:Response) => {
  const {
    Id_Endereco,
    cep_Endereco,
    logradouro_Endereco,
    numero_Endereco,
    bairro_Endereco,
    cidade_Endereco,
    estado_Endereco,
    pais_Endereco,
    complemento_Endereco
  } = request.body;


  const updateEnderecoService = new UpdateEnderecoService();
  const endereco = await updateEnderecoService.execute({
    Id_Endereco,
    cep_Endereco,
    logradouro_Endereco,
    numero_Endereco,
    bairro_Endereco,
    cidade_Endereco,
    estado_Endereco,
    pais_Endereco,
    complemento_Endereco
  });
  return response.json(endereco);
});
export default usersRouter;
