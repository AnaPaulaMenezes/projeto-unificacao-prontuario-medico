import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { Container, Nome, NewLink, NewText, Logout, LogoutText } from './styles';
import Icon from 'react-native-vector-icons/AntDesign'
import { StyleSheet, View, Text, SafeAreaView, Image, ScrollView } from "react-native";
import Header from '../../components/Header';
import api from '../../api';
import { List } from '../History/styles';
import ProfileInfo from '../../components/UserInfo';


const Profile: React.FC = () => {

  interface dados {
    Id_Usuario: number;
    nome_Usuario: string;
    logradouro_Endereco: string;
  };

  const [user, setUser] = useState<dados>();

  const navigation = useNavigation();

  useEffect(() => {
    api.get('users').then((response) => {
      setUser(response.data);
    })
  })


  return (
    <Container>
      <Header/>
      <List
        keyboardShouldPeristTaps="handled"
        data={user}
        keyExtractor={item => item.Id_Usuario.toString()}
        renderItem={({ item }) => <ProfileInfo data={item} />}
      >
      </List>
    </Container>

  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A0C9D9",
    // alignItems: "center",
    // justifyContent: "center"
  },

  text: {
    fontFamily: "HelveticaNeue",
    color: "#52575D"
  },

  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },

  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16
  },

  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: "hidden"

  },

  circle: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,

  },

  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 220,
    left: 325,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  info: {
    width: 300,
    height: 420,
    backgroundColor: "#E1E5E6",
    padding: 10,
    // marginTop: 30,
    borderRadius: 20,
    opacity: 10,
  },

});
