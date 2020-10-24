import styled from 'styled-components/native';



export const Container = styled.View`
margin-bottom:15px;
padding:15px;
box-shadow: 2px 2px rgba(0,0,0,0.40);
background-color:rgba(0,0,0,0.04);
border-radius:4px;

`;


export const Stats = styled.View`
flex-direction:column;
margin-top:5px;
justify-content:space-between;
`;

export const Stat = styled.View`
flex-direction:row;
margin-right:10px;
margin-bottom: 5px;
align-items:center;


`;

export const Title = styled.Text`
color: #131313;
font-size:16px;
font-weight:bold;
margin-left:6px;

`;
export const Nome = styled.Text`
color: #333;
font-size:18px;
font-weight:bold;

`;


export const Descricao = styled.Text.attrs({
  numberOfLines: 2,
})`
color: #131313;
font-size:19px;
margin-top:5px;
line-height:20px;
`;


