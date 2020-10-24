import React, { useState, useEffect } from 'react';
import { View, Text, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import IconC from 'react-native-vector-icons/FontAwesome5';
import Picker, { ListValue } from '../../components/Picker';
import { format } from "date-fns";

import { Container, Stat, Title, Descricao, Link } from './styles';

export default function Detalhes({ data }) {
  var form = new Date(data.dt_consulta);
  var formattedate = format(form, "dd/MM/yyyy hh:mm");
  return (
    <Container>

      <Stat>
        <IconC name="clinic-medical" size={20} color="#131313" />
        <Title>{data.medico.especialidade.Descricao_Especialidade ? data.medico.especialidade.Descricao_Especialidade : '-'}</Title>
      </Stat>
      <Stat>
        <Icon name="doctor" size={20} color="#131313" />
        <Title>{data.medico.nome_Medico ? data.medico.nome_Medico : '-'}</Title>

      </Stat>
      <Stat>
        <Icon name="map-marker-alt" size={20} color="#131313" />
        <Title>{data.estabelecimento?.descricao_Estabelecimento ? data.estabelecimento.descricao_Estabelecimento : '-'}</Title>

      </Stat>
      <Stat>
        <Icon name="prescription" size={20} color="#131313" />
        <Title>{data.diagnostico_Consulta ? data.diagnostico_Consulta : '-'}</Title>

      </Stat>

      <Stat>
        <Icon name="pills" size={20} color="#131313" />
        <Title>{data.receita_Consulta ? data.receita_Consulta : '-'}</Title>
      </Stat>
      <Stat>
        <Icon name="calendar" size={20} color="#131313" />
        <Title>{formattedate ? formattedate : '-'}</Title>
      </Stat>

      <Stat>
        <Icon name="heartbeat" size={20} color="#131313" />
        <Title>
          {data.sintomasPaciente_Consulta ? data.sintomasPaciente_Consulta : '-'}
        </Title>
      </Stat>
      <Stat>
        <Icon name="comments" size={20} color="#131313" />
        <Title>
          {data.obs_Consulta ? data.obs_Consulta : '-'}
        </Title>
      </Stat>
      {data.Exames_consulta[0] ? <Descricao>Exames</Descricao> : <Descricao></Descricao>}


      {data.Exames_consulta?.map((item) => {
        return (
          <>
            <Stat>
              <Icon name="doctor" size={20} color="#131313" />
              <Title>{item.tecnico_Exame_Consulta}</Title>
            </Stat>

            <Stat>
              <Icon name="prescription" size={20} color="#131313" />
              <Title>{item.exame.descricao_Exame}</Title>
            </Stat>

            <Stat>
              <Icon name="comments" size={20} color="#131313" />
              <Title>{item.exame.obs_Exame}</Title>
            </Stat>

            <Stat>
              <Icon name="download" size={20} color="#131313" />
              <Link
                onPress={() => Linking.openURL(item.arquivo_Exame_Consulta ? item.arquivo_Exame_Consulta : "")}
              ><Title>Visualizar exames</Title></Link>
            </Stat>

            <Text>----------------------------------------------------------------------------------------</Text>

          </>

        )
      })}

    </Container>



  );
}


