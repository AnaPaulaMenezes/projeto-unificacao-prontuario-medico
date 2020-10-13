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
      <Title>{data.diagnostico_Consulta}</Title>
    </Stat>
    <Stat>
      <Icon name="prescription" size={20} color="#fff"/>
      <Title>{data.receita_Consulta}</Title>
    </Stat>
    <Stat>
      <Icon name="calendar" size={20} color="#fff"/>
      <Title>{data.dtAlteracao_Consulta}</Title>
    </Stat>
    <Stat>
      <IconC name="clinic-medical" size={20} color="#fff"/>
      <Title>{data.especialidade_Consulta}</Title>
    </Stat>

    <Descricao
      onPress={() => navigation.navigate('Detalhes')}
    >
      {data.sintomasPaciente_Consulta}
    </Descricao>
  </Container>



    );
}


