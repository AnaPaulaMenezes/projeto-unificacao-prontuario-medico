import { Router } from 'express';
import { getRepository } from 'typeorm';
import { Response, Request } from 'express';
import { classToClass } from 'class-transformer';
import Medico from '../models/Medico';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';


const MedicosRouter = Router();

//Lista os Medicos
MedicosRouter.get('/',ensureAuthenticated, async (request:Request, response:Response) => {

  const MedicosRepositorie = getRepository(Medico);
  const Medicos = await MedicosRepositorie.find();

  return response.json(classToClass(Medicos));
});


export default MedicosRouter;
