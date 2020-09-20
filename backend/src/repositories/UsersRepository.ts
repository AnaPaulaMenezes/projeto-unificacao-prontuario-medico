import { EntityRepository, Repository } from 'typeorm';

import Usuario from '../models/Usuario';



@EntityRepository(Usuario)
class UsersRepository extends Repository<Usuario> {
//Criar aqui funcao de busca persnalizada
}

export default UsersRepository;
