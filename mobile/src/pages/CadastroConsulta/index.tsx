import React,{useState, useEffect, useCallback, useRef} from 'react';
import {  ScrollView} from 'react-native';
import { Form } from '@unform/mobile';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Input from '../../components/Input';
import DatePicker from 'react-native-datepicker';
import { Container, Nome, Cabeca, Items, Item, Texto, Drop} from './styles';
import api from '../../api';
import Picker, {ListValue} from '../../components/Picker';

interface CadastroConsulta {
  diagnostico_Consulta: string;
  receita_Consulta: string;
  especialidade_Consulta: string;
  sintomasPaciente_Consulta:string;
  obs_Consulta:string;
  Id_Estabelecimento:number;
  Id_Medico:number;
}

interface medico{
  Id_Medico:number;
  nome_Medico:string;
}


interface estabelecimento{
  Id_Estabelecimento:number;
  descricao_Estabelecimento:string;
}



const CadastroConsulta: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [data, setData]= useState();
  const [selectedValue, setSelectedValue] = useState("0");
  const [medicoValues, setMedicoValues] = useState<ListValue[]>([]);
  const [estabelecimentoValues, setEstabelecimentoValues] = useState<ListValue[]>([]);


  useEffect(()=>{
    api.get('medicos').then((response) =>{

    const formatValues = response.data.map((item:medico)=>{
      return {
        id: item.Id_Medico,
        value: item.nome_Medico,
      }
    })

     setMedicoValues(formatValues);

    });

    api.get('estabelecimentos').then((response) =>{
      const formatValues = response.data.map((item:estabelecimento)=>{
        return {
          id: item.Id_Estabelecimento,
          value: item.descricao_Estabelecimento,
        }
      })

       setEstabelecimentoValues(formatValues);
    })
  }, [])

  const handleConsulta = useCallback(
    async (data: CadastroConsulta)=>{

      await api.post('/consultas', data);

    },[]);


  return (


    <Container>
      <ScrollView>
      <Header/>
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
            placeholder="Clinica"
            name="especialidade_Consulta"
          ></Input>
        </Item>
        <Item>

          <Input
            placeholder="Sintomas"
            name="sintomasPaciente_Consulta"
          ></Input>
        </Item>
        <Item>

          <Input
            placeholder="Análise"
            name="diagnostico_Consulta"
          ></Input>
        </Item>
        <Item>

          <Input
            placeholder="Receita"
            name="receita_Consulta"
          ></Input>
        </Item>
        <Item>

          <Input
            placeholder="Observação"
            name="obs_Consulta"
          ></Input>
        </Item>
        <Item>
        <Picker name="medico" values={medicoValues} initialTextValue="Selecione um médico"/>
        </Item>
        <Item>
        <Picker name="estabelecimento" values={estabelecimentoValues} initialTextValue="Selecione o estabelecimento"/>
        </Item>

        <Item>
          <Texto>Data</Texto>
          <DatePicker
          style={{width:290}}
          format="DD-MM-YYYY"
          date={data}
          onDateChange={(value) =>{setData(value)}}
          ></DatePicker>
        </Item>
        <Item>
          <Button
          onPress={()=>{
            formRef.current?.submitForm();
          }}
          >Salvar</Button>
        </Item>

      </Items>
      </Form>
      </ScrollView>
    </Container>



  );
}

export default CadastroConsulta;
