import React from 'react';

import { useAuth } from '../hooks/auth';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Routes: React.FC = () => {
  const { usuario, loading } = useAuth();

  return usuario ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
