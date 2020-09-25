import { Router } from 'express';
import { getRepository } from 'typeorm';
import { Response, Request } from 'express';
import { classToClass } from 'class-transformer';
import Exame from '../models/Exame';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';


const ExamesRouter = Router();

//Lista os Exames
ExamesRouter.get('/',ensureAuthenticated, async (request:Request, response:Response) => {

  const ExamesRepositorie = getRepository(Exame);
  const Exames = await ExamesRepositorie.find();

  return response.json(classToClass(Exames));
});


export default ExamesRouter;
