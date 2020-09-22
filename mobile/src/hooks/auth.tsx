import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';



import api from '../api';
import { create } from 'react-test-renderer';

interface AuthState {
  token: string;
  usuario: object;
}

interface LogInCredentials {
  cpf_Usuario: string;
  senha_Usuario: string;
}

interface AuthContextData {
  usuario: object;
  loading: boolean;
  logIn(credentials: LogInCredentials): Promise<void>;
  signOut(): void;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [token, usuario] = await AsyncStorage.multiGet([
        '@project:token',
        '@project:usuario',
      ]);



      if (token[1] && usuario[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;
        setData({ token: token[1], usuario: JSON.parse(usuario[1]) });

      }

      setLoading(false);
    }
    loadStoragedData();
  }, []);

  const logIn = useCallback(async ({ cpf_Usuario, senha_Usuario }) => {
    const response = await api.post('sessions', { cpf_Usuario, senha_Usuario});

    const { token, usuario } = response.data;

    await AsyncStorage.multiSet([
      ['@project:token', token],
      ['@project:usuario', JSON.stringify(usuario)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, usuario });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@project:usuario', '@project:token']);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ usuario: data.usuario, loading, logIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
