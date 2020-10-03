import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import IconC from 'react-native-vector-icons/FontAwesome5';

 import { Container, Stat, Title, Descricao} from './styles';

export default function  Detalhes ({data}) {
  return (
  <Container>

    <Stat>
      <Icon name="doctor" size={20} color="#fff"/>
      <Title>{data.consulta}</Title>
    </Stat>
    <Stat>
      <Icon name="calendar" size={20} color="#fff"/>
      <Title>{data.data}</Title>
    </Stat>
    <Stat>
      <IconC name="clinic-medical" size={20} color="#fff"/>
      <Title>{data.clinica}</Title>
    </Stat>

    <Descricao
      onPress={() => navigation.navigate('Detalhes')}
    >
      {data.descricao}
    </Descricao>
  </Container>



    );
}


