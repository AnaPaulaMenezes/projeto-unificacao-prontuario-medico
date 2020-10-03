import React, {useContext, useState, useEffect} from 'react';
import {useNavigation, NavigationContainer } from '@react-navigation/native';
import {Container, Nome, NewLink, NewText, Logout, LogoutText} from './styles';
import Icon from 'react-native-vector-icons/AntDesign'
import { StyleSheet, View, Text, SafeAreaView, Image, ScrollView} from "react-native";
import Header from '../../components/Header';
import api from '../../api';

interface dados{
  Id_Usuario: number;
  nome_Usuario:string;
  cpf_Usuario:string;
};

const Perfil: React.FC = () =>{


  const [user, setUser] = useState<dados>({} as dados);

  const navigation = useNavigation();
  useEffect(()=>{
    api.get('user').then((response) =>{
    setUser(response.data[0]);
    })
  })
console.log(user);

  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <View style={styles.titleBar}>
          <Icon name="arrowleft" size={40} color="#52575D"></Icon>
        </View> */}
        <View style={{alignSelf: "center"}}>
          <View style={styles.profileImage}>
            <Image source={require("./assets/profile.jpg")} style={styles.image} resizeMode="center"></Image>
          </View>
        </View>
        <View style={{alignSelf: "center"}}>
          <Text style={styles.text}> Dados Pessoais</Text>
          <View style={styles.info}>
          <Text>nome:{user.nome_Usuario} </Text>
            <Text>Cidade: Macapá</Text>
            <Text>Cidade: Macapá2</Text>
          </View>
        </View>
        <View style={styles.dm}>
            <Icon name="edit" size={24} color="#FFF"></Icon>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
}

export default Perfil;

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
    marginBottom:10,

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

  text: {
    fontFamily: "HelveticaNeue",
    fontSize: 25,
    color: "#000",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 20,
  },

  info: {
    width: 300,
    height: 420,
    backgroundColor:"#E1E5E6",
    padding:10,
   // marginTop: 30,
    borderRadius: 20,
    opacity: 10,
  },

});
