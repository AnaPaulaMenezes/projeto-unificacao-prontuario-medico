import React, { useEffect, useState, useRef, useCallback } from 'react';
import { FlatList, StyleSheet, Text, View, Button, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header';
import HistoricoList from '../../components/HistoricoList';
import Detalhes from '../../components/Detalhes';
import { Modalize } from 'react-native-modalize';

import {
  Container,
  Nome,
  NewLink,
  Form,
  List,
  Modal

} from './styles';
import api from '../../api';

console.disableYellowBox = true;

interface dados {
  Id_Consulta: number;
  diagnostico_Consulta: string;
  dtAlteracao_Consulta: string;
  sintomasPaciente_Consulta: string;
  Exames_consulta: [{
    Id_Exame_Consulta: number;
    Id_Exame: number;
    tecnico_Exame_Consulta: string;
    arquivo_Exame_Consulta: string;
    dtAlteracao_Exame_Consulta: string;
    exame: [{
      Id_Exame: number;
      descricao_Exame: string;
      obs_Exame: string;
    }]
  }];

};


const History: React.FC = () => {
  const [relat, setRelat] = useState<dados>({} as dados);
  const [consulta, setConsulta] = useState<dados>({} as dados);
  const modalizeRef = useRef(null);
  const [exames, setExames] = useState<dados[]>([]);
  const [loading, setLoading] = useState(false);


  const navigation = useNavigation();

  const refreshPage = useCallback(() => {
    if (loading) {
      return;
    }
    setLoading(true);
    api.get('consultas').then((response) => {
      setConsulta(response.data);
      setLoading(false);

    })
  }, [])
  useEffect(() => {
    api.get('consultas').then((response) => {
      setConsulta(response.data);

    })
  }, [])

  function handleItem(data) {
    api.get('consultas/' + data.Id_Consulta).then((response) => {
      console.log(data)
      setRelat(response.data);
      modalizeRef.current?.open();
    })

  }

  return (

    <>

      <Container>

        <Header />
        <Form>
          <Nome>Consultas</Nome>
          <NewLink onPress={() => { navigation.navigate('Cadastro') }}>
            <Icon name="add" color="#fff" size={20} ></Icon>
          </NewLink>
        </Form>
        <List
          onRefresh={refreshPage}
          refreshing={loading}
          keyboardShouldPeristTaps="handled"
          data={consulta}
          keyExtractor={item => item.Id_Consulta.toString()}
          renderItem={({ item }) => (<HistoricoList data={item} selectItem={handleItem} />)}
        >
        </List>

        <Modal
          ref={modalizeRef}
          snapPoint={300}
          flatListProps={{
            data: relat,
            renderItem: ({ item }) => (<Detalhes data={item} />),
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
