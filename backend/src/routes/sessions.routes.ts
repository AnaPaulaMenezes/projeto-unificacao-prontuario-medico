import { Router } from 'express';
import { Response, Request } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '../services/AuthenticateUserService';



const sessionsRouter = Router();

sessionsRouter.post('/',  async (request: Request, response: Response): Promise<Response> => {
  const { cpf, password } = request.body;

  const authenticateUser = container.resolve(AuthenticateUserService);
  const { user, token } = await authenticateUser.execute({ cpf, password });
  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
