import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ScrollView, Linking, Alert, Text } from 'react-native';
import { Form } from '@unform/mobile';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Input from '../../components/Input';
import DatePicker from 'react-native-datepicker';
import {
  Container,
  Nome,
  Cabeca,
  Items,
  Item,
  Texto,
  Hour,
  HourText,
  TitleSection,
  HourContainer
} from './styles';
import api from '../../api';
import { FormHandles } from '@unform/core';
import { format } from 'date-fns';
import Picker, { ListValue } from '../../components/Picker';


interface CadastroConsulta {
  diagnostico_Consulta: string;
  receita_Consulta: string;
  especialidade_Consulta: string;
  sintomasPaciente_Consulta: string;
  obs_Consulta: string;
  Id_Estabelecimento: number;
  Id_Medico: number;
}

interface especialidade {
  Id_Especialidade: number;
  Descricao_Especialidade: string;
}

interface medico {
  Id_Medico: number;
  nome_Medico: string;
}

interface estabelecimento {
  Id_Estabelecimento: number;
  descricao_Estabelecimento: string;
}

const CadastroConsulta: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const especialidadeRef = useRef(null);
  const medicoRef = useRef(null);
  const [selectedData, setSelectedData] = useState('');
  const [selectedValue, setSelectedValue] = useState("0");
  const [selectedMedico, setSelectedMedico] = useState("0");
  const [especialidadeValues, setEspecialiadeValues] = useState<ListValue[]>([]);
  const [medicoValues, setMedicoValues] = useState<ListValue[]>([]);
  const [estabelecimentoValues, setEstabelecimentoValues] = useState<ListValue[]>([]);
  const [selectedHour, setSelectedHour] = useState('');
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<string[]>([
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00',
    '12:00', '13:10', '13:45', '14:00', '14:30', '15:00', '16:00',
    '17:00', '17:30', '18:00', '19:00'

  ]);

  const getSelectedMedico = async (): Promise<any> => {
    let state: unknown;

    await setSelectedMedico((currentState) => {
      state = currentState;

      return currentState;
    });

    return state;
  };

  const getSelectedHour = async (): Promise<any> => {
    let state: unknown;

    await setSelectedHour((currentState) => {
      state = currentState;

      return currentState;
    });

    return state;
  };

  const getHorariosDisponiveis = async (): Promise<any> => {
    let state: unknown;

    await setHorariosDisponiveis((currentState) => {
      state = currentState;

      return currentState;
    });

    return state;
  };

  useEffect(() => {
    api.get('especialidades').then((response) => {
      const formatValues = response.data.map((item: especialidade) => {
        return {
          id: item.Id_Especialidade,
          value: item.Descricao_Especialidade,
        }
      })

      setEspecialiadeValues(formatValues);

    });

    api.get('medicos').then((response) => {
      console.log(especialidadeRef?.current)
      const formatValues = response.data.map((item: medico) => {
        return {
          id: item.Id_Medico,
          value: item.nome_Medico,
        }
      })

      setMedicoValues(formatValues);

    });


    api.get('estabelecimentos').then((response) => {
      const formatValues = response.data.map((item: estabelecimento) => {
        return {
          id: item.Id_Estabelecimento,
          value: item.descricao_Estabelecimento,
        }
      })

      setEstabelecimentoValues(formatValues);
    })


  }, [])

  const handleOnChangeEspecialidade = useCallback(async (value) => {
    setSelectedValue(value);
    const response = await api.get(`/medicos/${value}`);

    const formatValues = response.data.map((item: medico) => {
      return {
        id: item.Id_Medico,
        value: item.nome_Medico,
      }
    });

    setMedicoValues(formatValues);
  }, []);

  const handleOnChangeMedico = useCallback(async (value) => {
    await setSelectedMedico(value);
  }, []);

  const handleDataChange = useCallback(async (value) => {
    setSelectedData(value);
    const dia = value.split("/")[0];
    const mes = value.split("/")[1];
    const ano = value.split("/")[2];
    const date = `${ano}-${mes.slice(-2)}-${dia.slice(-2)}`;
    const medico = await getSelectedMedico();
    api.get('consultas/disponibilidade', {
      params: {
        Id_Medico: medico,
        dt_consulta: date
      }
    }).then((response) => {
      const horasDisponiveis = horariosDisponiveis;
      response.data.map((item) => {
        const horaIndisponivel = format(new Date(item.dt_consulta), 'HH:mm')
        if (horariosDisponiveis.includes(horaIndisponivel)) {
          var index = horasDisponiveis.indexOf(horaIndisponivel);
          horasDisponiveis.splice(index, 1);
        }

      })

      setHorariosDisponiveis(horasDisponiveis);


    });
    setSelectedHour('');
    await getHorariosDisponiveis();


  }, []);

  const handleSelectHour = useCallback(async (hour: string) => {
    setSelectedHour(hour);
    await getSelectedHour();
  }, []);

  const handleConsulta = useCallback(
    async (data: CadastroConsulta) => {
      const dia = selectedData.split("/")[0];
      const mes = selectedData.split("/")[1];
      const ano = selectedData.split("/")[2];
      const dataFormatada = `${ano}-${mes.slice(-2)}-${dia.slice(-2)} ${selectedHour}`;


      //const dataFormatada = `${format(new Date(selectedData), 'yyyy-MM-dd')} ${selectedHour}`
      const newData = { ...data, dt_consulta: dataFormatada };


      const response = await api.post('/consultas', newData);
      console.log(response);

      Alert.alert('Consulta agendada', 'Consulta agendada com sucesso');

    }, [selectedHour, selectedData]);


  return (
    <Container>
      <ScrollView>
        <Header />
        <Cabeca>
          <Nome> Cadastro Consultas</Nome>
        </Cabeca>
        <Form
          onSubmit={handleConsulta}
          ref={formRef}
        >
          <Items>

            <Item>

              <Input
                placeholder="Sintomas"
                name="sintomasPaciente_Consulta"
              ></Input>
            </Item>


            <Item>

              <Input
                placeholder="Observação"
                name="obs_Consulta"
              ></Input>
            </Item>
            <Item>
              <Picker name="especialidade_Consulta" values={especialidadeValues} initialTextValue="Selecione uma especialidade"
                ref={especialidadeRef} onValueChange={(value) => { handleOnChangeEspecialidade(value) }} valorSelecionado={selectedValue} />
            </Item>
            <Item>
              <Picker name="Id_Medico" ref={medicoRef} values={medicoValues} initialTextValue="Selecione um médico"
                onValueChange={(value) => {
                  handleOnChangeMedico(value);
                }} valorSelecionado={selectedMedico} />
            </Item>


            <Item>
              <Picker name="Id_Estabelecimento" values={estabelecimentoValues} initialTextValue="Selecione o estabelecimento" />
            </Item>


            <Item>
              <TitleSection>Selecione um dia</TitleSection>
              <DatePicker
                style={{ width: '100%' }}
                mode="date"
                format="DD/MM/yyyy"
                date={selectedData}
                onDateChange={(value) => { handleDataChange(value) }}
              ></DatePicker>
            </Item>
            <Item >
              <TitleSection>Selecione um horário</TitleSection>
              <HourContainer>
                {horariosDisponiveis.map((item) => {
                  return (
                    <Hour
                      enabled={true}
                      available={true}
                      key={item}
                      onPress={() => { handleSelectHour(item) }}
                      selected={selectedHour === item}
                    >
                      <HourText selected={selectedHour === item}>
                        {item}
                      </HourText>
                    </Hour>
                  )
                })}</HourContainer>

            </Item>

            <Item>
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                  //Linking.openURL('https://consultastorage.blob.core.windows.net/images/sea.png');
                }}
              >Salvar</Button>
            </Item>

          </Items>
        </Form>
      </ScrollView>
    </Container >
  );
}

export default CadastroConsulta;
