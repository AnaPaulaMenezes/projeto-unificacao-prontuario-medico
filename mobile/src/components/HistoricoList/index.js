import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import IconC from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { format } from "date-fns";


import { Container, Nome, Stats, Stat, Title, Descricao } from './styles';

export default function HistoricoList({ data, selectItem }) {
  const navigation = useNavigation();
  var form = new Date(data.dt_consulta);
  var formattedate = format(form, "dd/MM/yyyy HH:mm");
  return (
    <TouchableOpacity onLongPress={() => { selectItem(data) }}>

      <Container>
        <Stats>
          <Stat style={{ flexWrap: "wrap" }}>
            <IconC name="clinic-medical" size={18} color="#fff" />
            <Title>{data.medico.especialidade.Descricao_Especialidade}</Title>
            <Stat></Stat>
            <Stat>
              {data.diagnostico_Consulta
                ? (<><Icon name="prescription" size={18} color="#fff" />
                  <Title>{data.diagnostico_Consulta}</Title></>)
                : null}</Stat>
          </Stat>

          <Stat>
            <Icon name="calendar" size={18} color="#fff" />
            <Title>{formattedate}</Title>
          </Stat>
        </Stats>
        <Nome></Nome>

        <Descricao>{data.sintomasPaciente_Consulta}</Descricao>
      </Container>
    </TouchableOpacity>


  );
}
