import styled from 'styled-components/native';



export const Container= styled.View`
background-color: #A0C9D9;
`;


export const Image = styled.Image`
flex: 1;
width: 150px;
height: 150px;
margin-left: auto;
margin-right: auto;
margin-top: 30px;
max-width:100%;
max-height:100%;
border-radius: 100px;
`

export const Info = styled.View`
width: 300px;
height: 150px;
border-radius: 20px;
text-align: left;
background-color: #dcdcdc;
`;

export const InfoModal = styled.View`
width: 300px;
height: 500px;
border-radius: 20px;
text-align: left;
background-color: #FFF;
margin-top: 20px;
margin-bottom: 250px;
top: 1px;
`;

export const Text = styled.Text`
margin-left: 20px;
margin-top: 10px;
`;

export const Content = styled.View`
margin-top: 15px;
border-radius: 4px;
margin-left: 15px;
margin-right: 15px;
`;

export const Title = styled.Text`
margin-top: 30px;
margin-bottom: 15px;
text-align: center;

`;

export const Line = styled.View`
border: 1px solid grey ;
border-radius: 100px;
height: 1px;
margin-left: 20px;
margin-right: 20px;
margin-top: 15px;
opacity: 0.3;
`;

export const UserInfo = styled.Text`
font-weight: bold;
margin-left: 20px;
margin-top: 5px;
font-size: 15px;
`;

export const ButtonArea = styled.View`
margin-top: 30px;
margin-left: 20px;
margin-right: 20px;
margin-bottom: 15px;
display: flex;
align-content: center;
`;

export const Invisible = styled.View`
display: none;
`;

export const ModalData = styled.View`
width: 300px;
height: 630px;
border-radius: 20px;
text-align: left;
background-color: #FFF;
margin-top: 20px;
margin-bottom: 250px;
top: 1px;
`;