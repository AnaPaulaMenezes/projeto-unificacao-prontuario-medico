import { EntityRepository, Repository } from 'typeorm';

import Consulta from '../models/Consulta';



@EntityRepository(Consulta)
class ConsultaRepository extends Repository<Consulta> {

}

export default ConsultaRepository;
