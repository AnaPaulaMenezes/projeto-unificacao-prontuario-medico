import { EntityRepository, Repository } from 'typeorm';

import Email from '../models/Email';



@EntityRepository(Email)
class EmailRepository extends Repository<Email> {

}

export default EmailRepository;
