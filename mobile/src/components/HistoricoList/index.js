import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import{useNavigation, NavigationContainer} from '@react-navigation/native';
import { format } from "date-fns";


 import { Container, Nome, Stats, Stat,Title, Descricao } from './styles';

export default function HistoricoList({ data, selectItem }) {
  const navigation = useNavigation();
  var form = new Date(data.dtAlteracao_Consulta);
  var formattedate= format(form, "dd/MM/yyyy hh:mm");
  return (
      <TouchableOpacity onLongPress={() =>{selectItem(data)}}>

      <Container>
        <Stats>
          <Stat>
          <Icon name="doctor" size={10} color="#fff"/>
            <Title>{ data.diagnostico_Consulta }</Title>
          </Stat>
          <Stat>
          <Icon name="calendar" size={10} color="#fff"/>
          <Title>{formattedate}</Title>
          </Stat>
        </Stats>
        <Nome></Nome>

       <Descricao>{ data.sintomasPaciente_Consulta }</Descricao>
      </Container>
      </TouchableOpacity>


    );
}
