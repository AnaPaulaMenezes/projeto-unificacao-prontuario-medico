import React, {useContext} from 'react';
import{useNavigation, NavigationContainer} from '@react-navigation/native';
import Header from '../../components/Header';

import { AuthContextData } from '../../hooks/auth.tsx';

import {Container, Nome, NewLink, NewText, Logout, LogoutText} from './styles';

export default function Perfil() {
  const navigation = useNavigation();
  const {data ,signOut} = useContext(AuthContextData);
 return (
   <Container>
     <Header/>
     <Nome>
      {data && data.usuario}
     </Nome>
     <NewLink onPress={()=> navigation.navigate('Histórico') }>
       <NewText>registrar consulta</NewText>
     </NewLink>

     <Logout onPress={() => signOut()}>
       <LogoutText>Sair</LogoutText>
     </Logout>
   </Container>
  );
}
