import { Router } from 'express';
import { getRepository } from 'typeorm';
import { Response, Request } from 'express';
import { classToClass } from 'class-transformer';
import Estabelecimento from '../models/Estabelecimento';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';


const EstabelecimentosRouter = Router();

//Lista os Estabelecimentos
EstabelecimentosRouter.get('/',ensureAuthenticated, async (request:Request, response:Response) => {

  const EstabelecimentosRepositorie = getRepository(Estabelecimento);
  const Estabelecimentos = await EstabelecimentosRepositorie.find();

  return response.json(classToClass(Estabelecimentos));
});


export default EstabelecimentosRouter;
