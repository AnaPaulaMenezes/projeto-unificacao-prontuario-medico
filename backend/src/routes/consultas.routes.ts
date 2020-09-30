import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import { Response, Request } from 'express';
import { classToClass } from 'class-transformer';
import Consulta from '../models/Consulta';
import CreateConsultaService from '../services/CreateConsultaService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Paciente from '../models/Paciente';


const consultasRouter = Router();

//Lista as consultas cadastradas
consultasRouter.get('/',ensureAuthenticated, async (request:Request, response:Response) => {
  const Id_Usuario = Number(request.user.id);
  const pacienteRepositorie = getRepository(Paciente);
  const p = await pacienteRepositorie.find({where: {Id_Usuario}});

  if (p.length> 0) {
    const consultasRepositorie = getRepository(Consulta);
    const consultas = await consultasRepositorie.find({where:{Id_Paciente: p[0].Id_Paciente}});
    console.log(consultas)
    return response.json(classToClass(consultas));
  }else {
    return response.json('User not found');
  }

});

//Cadastra uma nova consulta
consultasRouter.post('/', ensureAuthenticated, async (request: Request, response:Response) => {
  const Id_Usuario = Number(request.user.id);

  const {
    diagnostico_Consulta,
    receita_Consulta,
    especialidade_Consulta,
    sintomasPaciente_Consulta,
    obs_Consulta,
    Id_Estabelecimento,
    Id_Medico
   } = request.body;

  const createConsulta = new CreateConsultaService();
  const consulta = await createConsulta.execute({
    Id_Usuario,
    diagnostico_Consulta,
    receita_Consulta,
    especialidade_Consulta,
    sintomasPaciente_Consulta,
    obs_Consulta,
    Id_Estabelecimento,
    Id_Medico,
  });
  return response.json(consulta);
});



export default consultasRouter;