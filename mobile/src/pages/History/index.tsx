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
  Id_Consulta: number;
  diagnostico_Consulta:string;
  dtAlteracao_Consulta:string;
  sintomasPaciente_Consulta:string;
  Id_Usuario:number;
};


const History: React.FC = () => {

  const [consulta, setConsulta] = useState<dados>({} as dados);

  const navigation = useNavigation();
  useEffect(()=>{
    api.get('consultas').then((response) =>{
    setConsulta(response.data);
    })
  }, [])

  function handleItem(data){
    api.get('consultas/'+ data.Id_Consulta).then((response) =>{
    navigation.navigate('Detalhes');
    })

  }
  return (

    <>

      <Container>
        <Header/>
        <Form>
          <Nome>Consultas</Nome>
          <NewLink onPress={()=>{navigation.navigate('Cadastro')}}>
              <Icon name="add" color="#fff" size={20} ></Icon>
            </NewLink>
         </Form>
        <List
        keyboardShouldPeristTaps="handled"
<<<<<<< HEAD
        data={consulta}
        keyExtractor={item => item.Id_Consulta.toString()}
        renderItem={({item})=> (<HistoricoList data={item} selectItem={handleItem} /> )}
=======
        data={user}
        keyExtractor={item => item.Id_Usuario.toString()}
        renderItem={({item})=> <HistoricoList data={item}/>}
>>>>>>> 3e1d20881a4f2273a5c63fa65d08cdb6927d3bd1
        >
        </List>

     </Container>


    </>
  );
};
export default History;
