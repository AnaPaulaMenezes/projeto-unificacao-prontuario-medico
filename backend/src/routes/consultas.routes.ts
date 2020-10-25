import { Router } from 'express';
import { getCustomRepository, getRepository, Raw } from 'typeorm';
import { Response, Request } from 'express';
import { classToClass } from 'class-transformer';
import Consulta from '../models/Consulta';
import CreateConsultaService from '../services/CreateConsultaService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Paciente from '../models/Paciente';


const consultasRouter = Router();

//Lista as consultas cadastradas
consultasRouter.get('/', ensureAuthenticated, async (request: Request, response: Response) => {
  const Id_Usuario = Number(request.user.id);
  const pacienteRepositorie = getRepository(Paciente);
  const p = await pacienteRepositorie.find({ where: { Id_Usuario } });

  if (p.length > 0) {
    const consultasRepositorie = getRepository(Consulta);
    const consultas = await consultasRepositorie.find({ where: { Id_Paciente: p[0].Id_Paciente }, order: { dt_consulta: "DESC" } });

    return response.json(classToClass(consultas));
  } else {
    return response.json('User not found');
  }

});
//Lista os horarios insdisponiveis

consultasRouter.get('/disponibilidade', ensureAuthenticated, async (request: Request, response: Response) => {
  const { Id_Medico, dt_consulta } = request.query;
  console.log(request.query)
  const consultasRepositorie = getRepository(Consulta);
  const horarios = await consultasRepositorie.find({
    where: {
      Id_Medico, dt_consulta: Raw(
        dateFieldName =>

          `convert(varchar(10), ${dateFieldName?.toString()}, 120) = '${dt_consulta?.toString()}'`,
      ),
    }
  });
  console.log(horarios)
  return response.json(classToClass(horarios));
});


//Lista uma consulta especifica
consultasRouter.get('/:Id_Consulta', ensureAuthenticated, async (request: Request, response: Response) => {
  const { Id_Consulta } = request.params;

  const consultasRepositorie = getRepository(Consulta);
  const consulta = await consultasRepositorie.find({ where: { Id_Consulta } });


  return response.json(classToClass(consulta));
});

//Cadastra uma nova consulta
consultasRouter.post('/', ensureAuthenticated, async (request: Request, response: Response) => {
  const Id_Usuario = Number(request.user.id);

  const {
    diagnostico_Consulta,
    receita_Consulta,
    especialidade_Consulta,
    sintomasPaciente_Consulta,
    obs_Consulta,
    Id_Estabelecimento,
    Id_Medico,
    dt_consulta
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
    dt_consulta
  });
  return response.json(consulta);
});



export default consultasRouter;
