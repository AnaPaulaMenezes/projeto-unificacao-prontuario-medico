import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../api';
import { Alert } from 'react-native';


interface Usuario {

  Id_Usuario: number,
  nome_Usuario: string,
  cpf_Usuario: string,
  rg_Usuario: string,
  dtNascimento_Usuario: Date,
  dtCriacao_Usuario: Date,
  dtAlteracao_Usuario: Date,
  emails: [
    {
      id_Email: number,
      endereco_Email: string,
      Id_Usuario: number,
      dtCriacao_Email: Date,
      dtAlteracao_Email: Date,
      codTipo_Email: number
    }
  ],
  telefones: [{
    Id_Telefone: Number,
    numero_Telefone: string,
    codTipo_Telefone: string,
    Id_Usuario: Number,
    dtAlteracao_Telefone: Date
  }],
  endereco: {
    Id_Endereco: number,
    cep_Endereco: string,
    logradouro_Endereco: string,
    numero_Endereco: 12,
    bairro_Endereco: string,
    cidade_Endereco: string,
    estado_Endereco: string,
    pais_Endereco: string,
    complemento_Endereco: string,
    Id_Usuario: number,
    dtCriacao_Endereco: Date,
    dtAlteracao_Endereco: Date
  },
  paciente: {
    Id_Paciente: Number,
    tipoSanguineo_Paciente: string,
    altura_Paciente: Number,
    peso_Paciente: Number,
    obs_Paciente: string,
    alergias_Paciente: string,
    doencasCronicas_Paciente: string,
    remediosContinuos_Paciente: string,
    Id_Usuario: Number,
    dtCriacao_Paciente: Date,
    dtAlteracao_Paciente: Date
  }
}

interface AuthState {
  token: string;
  usuario: Usuario;
}

interface LogInCredentials {
  cpf_Usuario: string;
  senha_Usuario: string;
}

interface AuthContextData {
  usuario: Usuario;
  loading: boolean;
  logIn(credentials: LogInCredentials): Promise<void>;
  signOut(): void;
  updateUser(usuario: Usuario): Promise<void>;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  api.interceptors.request.use(async function (config) {
    const token = await AsyncStorage.getItem(
      '@project:token',

    );
    // console.log(token)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      api.defaults.headers.authorization = `Bearer ${token}`
    }

    return config;
  });

  api.interceptors.response.use((response) => {

    return response
  }, async function (error) {

    if (error?.response?.status === 401) {
      Alert.alert('Sessão expirada', 'Favor refaça seu Login');
      signOut();
      return error;
      ;
    }
    return Promise.reject(error);
  });

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
    const response = await api.post('sessions', { cpf_Usuario, senha_Usuario });

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

  const updateUser = useCallback(
    async (usuario: Usuario) => {
      await AsyncStorage.setItem('@project:usuario', JSON.stringify(usuario));

      setData({
        token: data.token,
        usuario,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider value={{ usuario: data.usuario, loading, logIn, signOut, updateUser }}>
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
