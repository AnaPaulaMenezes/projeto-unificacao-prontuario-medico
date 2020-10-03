import React from 'react';
import Icon from 'react-native-vector-icons/Fontisto';
import{useNavigation, NavigationContainer} from '@react-navigation/native';


 import { Container, Nome, Stats, Stat,Title, Descricao } from './styles';

export default function HistoricoList({data}) {
  const navigation = useNavigation();
  return (
      <Container>
        <Stats>
          <Stat>
          <Icon name="doctor" size={10} color="#fff"/>
          <Title>{data.nome_Usuario}</Title>
          </Stat>
          <Stat>
          <Icon name="calendar" size={10} color="#fff"/>
          <Title></Title>
          </Stat>
        </Stats>
       <Nome></Nome>

       <Descricao
       onPress={() => navigation.navigate('Detalhes')}
       >{data.Id_Usuario}</Descricao>
      </Container>

    );
}
