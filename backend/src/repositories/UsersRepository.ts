import { EntityRepository, Repository } from 'typeorm';

import User from '../models/User';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(User)
class UsersRepository extends Repository<User> {

}

export default UsersRepository;
