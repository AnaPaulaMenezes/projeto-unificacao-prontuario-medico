import React, {useEffect, useState}from 'react';
import {FlatList, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header';
import HistoricoList from '../../components/HistoricoList';

import {
  Container,
  Nome,
  NewLink,
  Form,
  List

} from './styles';
import api from '../../api';

console.disableYellowBox=true;

interface dados{
  Id_Exame: number;
  descricao_Exame:string;
  dtAlteracao_Exame:string;
};


const History: React.FC = () => {

  const [consulta, setConsulta] = useState<dados>({} as dados);

  const navigation = useNavigation();
  useEffect(()=>{
    api.get('exames').then((response) =>{
    setConsulta(response.data);
    console.log(response.data);
    })
  })
  return (

    <>

      <Container>
        <Header/>
        <Form>
          <Nome>Consultas</Nome>
          <NewLink onPress={()=>{}}>
              <Icon name="add" color="#fff" size={20} ></Icon>
            </NewLink>
         </Form>
        <List
        keyboardShouldPeristTaps="handled"
        data={consulta}
        keyExtractor={item => item.Id_Exame}
        renderItem={({item})=> <HistoricoList data={item}/>}
        >
        </List>

     </Container>


    </>
  );
};
export default History;
