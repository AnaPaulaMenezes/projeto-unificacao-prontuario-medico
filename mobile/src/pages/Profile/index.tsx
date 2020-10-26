import React, { useContext, useState, useEffect } from 'react';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { Container, Nome, NewLink, NewText, Logout, LogoutText } from './styles';
import Icon from 'react-native-vector-icons/AntDesign'
import { StyleSheet, View, Text, SafeAreaView, Image, ScrollView } from "react-native";
import Header from '../../components/Header';
import api from '../../api';
import { Form, List } from '../History/styles';
import ProfileInfo from '../../components/UserInfo';

interface dados {
  Id_Usuario: number;
  nome_Usuario: string;
  cpf_Usuario: string;
  rg_Usuario: string;
  emails: [{
    endereco_Email: string,
  }];
  telefones: [{
    numero_Telefone: string,
  }]
};

const Perfil: React.FC = () => {

  const [users, setUsers] = useState<dados>({} as dados);

  const navigation = useNavigation();
  useEffect(()=>{
    api.get('users').then((response) =>{
    setUsers(response.data);
    //console.log(response.data.numero_Telefone)
    })
  }, [users.emails, users.telefones, users.nome_Usuario])

  return (
    <>
      <Container>
        <Header/>
         <List
        keyboardShouldPeristTaps="handled"
        data={users}
        keyExtractor={item => item.Id_Usuario.toString()}
        renderItem={({item})=> (<ProfileInfo data={item} /> )}
        >
        </List>

     </Container>
    </>
  );
}

export default Perfil;
