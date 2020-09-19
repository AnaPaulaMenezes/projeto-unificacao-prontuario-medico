import { Router } from 'express';
import { Response, Request } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '../services/AuthenticateUserService';



const sessionsRouter = Router();

sessionsRouter.post('/',  async (request: Request, response: Response): Promise<Response> => {
  const { cpf_Usuario, senha_Usuario } = request.body;

  const authenticateUser = container.resolve(AuthenticateUserService);
  const { usuario, token } = await authenticateUser.execute({ cpf_Usuario, senha_Usuario });
  delete usuario.senha_Usuario;

  return response.json({ usuario, token });
});

export default sessionsRouter;
