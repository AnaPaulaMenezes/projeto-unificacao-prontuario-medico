import { Router } from 'express';

import usersRouter from './users.routes';
import sessionRouter from './sessions.routes';
import consultasRouter from './consultas.routes';
import ExamesRouter from './exames.routes';
import MedicosRouter from './medicos.routes';
import EstabelecimentosRouter from './estabelecimentos.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/consultas', consultasRouter);
routes.use('/exames', ExamesRouter);
routes.use('/medicos', MedicosRouter);
routes.use('/estabelecimentos', EstabelecimentosRouter);
export default routes;
