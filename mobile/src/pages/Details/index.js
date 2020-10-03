import React, {useState} from 'react';
import { View, Text } from 'react-native';
import Header from '../../components/Header';
import Detalhes from '../../components/Detalhes';

import { Container, Nome,List, Form } from './styles';

export default function Details () {
  const [details, setDetails] = useState([
    {key:'1', consulta:'consulta1', descricao:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tortor velit, ullamcorper eget dolor in, rutrum fringilla elit. Donec consequat, neque ac hendrerit auctor, ex eros fringilla augue, at vehicula dolor nisl ut enim. Suspendisse erat elit, dictum eu molestie at, fringilla non orci. Integer ut odio arcu. Donec gravida enim eget tellus luctus, nec suscipit tellus vehicula. Fusce vitae metus interdum, congue libero sollicitudin, iaculis libero. Aliquam quis rhoncus arcu, et rutrum quam. Vestibulum viverra feugiat sapien in maximus. Aliquam facilisis laoreet congue. Aenean blandit congue fermentum. Quisque ornare sit amet nisi a pretium. Etiam tempor augue eu finibus blandit. Proin vel purus vehicula, placerat ex a, maximus leo. Integer lobortis, erat in hendrerit congue, odio tellus convallis magna, vel bibendum neque libero ut tortor.', data:'26/09/2020', clinica:'magic'},
  ]);

  return(
    <Container>
      <Header/>
      <Form>
      <Nome>Detalhes da consulta</Nome>
      </Form>
      <List
      keyboardShouldPeristTaps="handled"
      data={details}
      keyExtractor={item => item.key}
      renderItem={({item})=> <Detalhes data={item}/>}
      >
      </List>
    </Container>
    );
}

