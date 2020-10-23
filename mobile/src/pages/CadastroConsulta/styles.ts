import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';


interface HourProps {
  available: boolean;
  selected: boolean;
}

interface HourTextProps {
  selected: boolean;
}
export const Container = styled(LinearGradient).attrs({
  colors: ['#A0C9D9', '#e1e5e6'],
  start: { x: 1, y: 0 },
  end: { x: 0, y: 0 },
})`
  flex: 1;

`;
export const Cabeca = styled.View`
  flex-direction:row;
  margin-top:10px;
  padding:0 20px;
`;

export const Nome = styled.Text`
  flex: 1;
  padding: 12px 15px;
  font-size: 28px;
  margin-top:25px;
  margin-bottom:25px;
  color: #ffff;
`;

export const Items = styled.KeyboardAvoidingView.attrs({
  behavior: 'padding',
})`
  flex:1;
  margin-left:15px;
  margin-right:15px;
`;

export const Item = styled.View`
flex-direction:column;
align-items:flex-start;
margin-top:15px;
justify-content:space-between;


`;

export const Texto = styled.Text`
color: #131313;
font-size:14px;;
margin-top:20px;
line-height:20px;

`;

export const Input = styled.TextInput`
background-color:#ffff;
width:75%;
border-radius:10px;
`;
export const Drop = styled.Picker.attrs({

})`
background-color:#ffff;
width:80%;
border-radius:10px;
`;

export const Hour = styled(RectButton) <HourProps>`
  padding: 12px;
  background: ${props => (props.selected ? '#0190b0' : '#ccc')};
  border-radius: 10px;
  margin-right: 5px;
  margin-bottom: 5px;

  opacity: ${props => (props.available ? 1 : 0.3)};
`;

export const HourText = styled.Text<HourTextProps>`
  color: ${props => (props.selected ? '#FFF' : '#131313')};

  font-size: 16px;
`;

export const HourContainer = styled.View`
  flex-direction:row;
  align-items:center;
  margin-top:15px;

  flex-wrap: wrap;
  margin: 5px 2px 5px 2px;

`;

export const TitleSection = styled.Text`
  font-size:17;
  font-weight: bold;
  padding: 5px;

`;
