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

const History: React.FC = () => {
  const navigation = useNavigation();
  const [historico, setHistorico]= useState([
    {key:'1', tipo:'consulta1', desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis mattis leo, sit amet elementum lectus. Donec pharetra nibh non iaculis feugiat. Nam cursus risus sed ultricies sodales.', data:'21/09/2020'},
    {key:'2', tipo:'consulta2', desc:'Sed sed odio suscipit lectus mollis venenatis et vel erat. Fusce rutrum quam consectetur elit viverra bibendum. Etiam sem tellus, pharetra a pellentesque a, feugiat ac enim. ', data:'13/08/2020'},
    {key:'3', tipo:'consulta3', desc:'Vivamus eu placerat mi. In auctor interdum nunc semper mattis. Fusce porta non risus vel tempus. Vestibulum euismod nunc a enim malesuada, eu convallis lacus scelerisque.', data:'13/08/2020'},
    {key:'4', tipo:'consulta4', desc:'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum feugiat finibus lobortis. Nullam eget ultricies leo. Donec sed eleifend nulla', data:'13/08/2020'},
    {key:'5', tipo:'consulta5', desc:'Sed varius massa vel ornare tincidunt. Proin lobortis leo et lorem suscipit luctus. Nulla porta rutrum eros, nec malesuada nisl consectetur non.', data:'13/08/2020'},
    {key:'6', tipo:'consulta6', desc:'Donec sed tristique ante. Vestibulum imperdiet, nisl nec cursus sagittis, dui est auctor velit, ut iaculis nisl nibh quis mi. Nulla metus ipsum, convallis sed erat sed', data:'13/08/2020'},
    {key:'7', tipo:'consulta7', desc:'Suspendisse diam lorem, molestie vel convallis in, tincidunt eget erat. Mauris ac malesuada nibh, faucibus ultrices nibh. Praesent efficitur mattis metus,', data:'13/08/2020'},
  ]);

  useEffect(()=>{
    api.get('users').then((response) =>{
      console.log('resp', response.status)
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
        data={historico}
        keyExtractor={item => item.key}
        renderItem={({item})=> <HistoricoList data={item}/>}

        >
        </List>

     </Container>


    </>
  );
};
export default History;
