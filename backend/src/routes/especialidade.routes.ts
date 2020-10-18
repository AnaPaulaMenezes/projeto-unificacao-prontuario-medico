import { Router } from 'express';
import { getRepository } from 'typeorm';
import { Response, Request } from 'express';
import { classToClass } from 'class-transformer';
import Especialidade from '../models/Especialidade';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';


const EspecialidadesRouter = Router();

//Lista os Especialidades
EspecialidadesRouter.get('/', ensureAuthenticated, async (request: Request, response: Response) => {

  const EspecialidadesRepositorie = getRepository(Especialidade);
  const Especialidades = await EspecialidadesRepositorie.find();

  return response.json(classToClass(Especialidades));
});


export default EspecialidadesRouter;
