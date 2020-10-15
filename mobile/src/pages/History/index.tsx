import React, {useEffect, useState, useRef} from 'react';
import {FlatList, StyleSheet, Text, View, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header';
import HistoricoList from '../../components/HistoricoList';
import Detalhes from '../../components/Detalhes';
import {Modalize} from 'react-native-modalize';

import {
  Container,
  Nome,
  NewLink,
  Form,
  List,
  Modal

} from './styles';
import api from '../../api';

console.disableYellowBox=true;

interface dados{
  Id_Consulta: number;
  diagnostico_Consulta:string;
  dtAlteracao_Consulta:string;
  sintomasPaciente_Consulta:string;
  Exames_consulta:[{
    Id_Exame_Consulta: number;
    Id_Exame:number;
    tecnico_Exame_Consulta: string;
    arquivo_Exame_Consulta:string;
  }];

};


const History: React.FC = () => {
  const [relat, setRelat] = useState<dados>({} as dados);
  const [consulta, setConsulta] = useState<dados>({} as dados);
  const [modalVisible, setModalVisible] = useState(false);
  const modalizeRef = useRef(null);


  const navigation = useNavigation();
  useEffect(()=>{
    api.get('consultas').then((response) =>{
    setConsulta(response.data);
    })
  }, [])

  function handleItem(data){
    api.get('consultas/'+ data.Id_Consulta).then((response) =>{
    setRelat (response.data);
    console.log(response.tecnico_Exame_Consulta);
    modalizeRef.current?.open();
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
        data={consulta}
        keyExtractor={item => item.Id_Consulta.toString()}
        renderItem={({item})=> (<HistoricoList data={item} selectItem={handleItem} /> )}
        >
        </List>

      <Modal
      ref={modalizeRef}
      snapPoint={300}

      flatListProps={{
        data: relat,
        renderItem: ({item})=>(<Detalhes data={item} />),
        keyExtractor: item => item.Id_Consulta.toString(),
        showsVerticalScrollIndicator: false
      }}

      >

      </Modal>


     </Container>



    </>
  );
};
export default History;
