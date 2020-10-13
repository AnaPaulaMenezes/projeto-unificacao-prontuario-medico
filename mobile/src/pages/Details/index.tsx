import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import Header from '../../components/Header';
import Detalhes from '../../components/Detalhes';
import { useNavigation } from '@react-navigation/native';
import { Container, Nome,List, Form } from './styles';
import api from '../../api';
import History from '../History';

console.disableYellowBox=true;

  interface dados{
    Id_Consulta: number;
    diagnostico_Consulta:string;
    receita_Consulta:string;
    especialidade_Consulta:string;
    sintomasPaciente_Consulta:string;
    dtAlteracao_Consulta:string;
  };


const Detail: React.FC = () => {


  const [user, setUser] = useState<dados>({} as dados);

  const navigation = useNavigation();
  useEffect(()=>{
    api.get('consultas').then((response) =>{
    setUser(response.data);
    })
  })



  return(
    <Container>
      <Header/>
      <Form>
      <Nome>Detalhes da consulta</Nome>
      </Form>
      <List
      keyboardShouldPeristTaps="handled"
      data={user}
      keyExtractor={item => item.Id_Consulta}
      renderItem={({item})=> ( <Detalhes data={item}/> )}
      >
      </List>
    </Container>
    );
}

export default Detail;
