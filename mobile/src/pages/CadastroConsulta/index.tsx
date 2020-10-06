import React,{useState, useEffect, useCallback, useRef} from 'react';
import { Picker , ScrollView} from 'react-native';
import { Form } from '@unform/mobile';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Input from '../../components/Input';
import DatePicker from 'react-native-datepicker';
import { Container, Nome, Cabeca, Items, Item, Texto, Drop} from './styles';
import api from '../../api';
//import Pick from '../../components/Picker';

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



  useEffect(()=>{
    api.get('medicos').then((response) =>{
    setBringValue(response.data);
    setSelectedValue("0");
    })

    api.get('estabelecimentos').then((response) =>{
      setEstabelecimento(response.data);
    })
  }, [])

  const handleConsulta = useCallback(
    async (data: CadastroConsulta)=>{
      console.log(data);
      await api.post('/consultas', data);

    },[]);


  const formRef = useRef<FormHandles>(null);
  const [data, setData]= useState();
  const [selectedValue, setSelectedValue] = useState("0");
  const [bringValue, setBringValue] = useState<medico[]>([]);
  const [estabelecimentoValue, setEstabelecimento] = useState<estabelecimento[]>([]);

  let serviceItems = bringValue.map( (s, i) => {
    return <Picker.Item key={i} value={s.Id_Medico} label={s.nome_Medico}/>
  });

  let estabelecimentoItems = estabelecimentoValue.map( (s, i) => {
    return <Picker.Item key={i} value={s.Id_Estabelecimento} label={s.descricao_Estabelecimento} />
  });

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
        <Picker>
            <Picker.Item label="Selecione" value="0"/>
            {serviceItems}
          </Picker>
        </Item>
        <Item>
          <Picker
            selectedValue={estabelecimentoValue}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            style={{ height: 50, width: 200 }}
          >
            {estabelecimentoItems}
          </Picker>
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
