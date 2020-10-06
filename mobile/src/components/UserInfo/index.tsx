import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation, NavigationContainer } from '@react-navigation/native';


import { Container, Image, Info, Text } from './styles';
import { SafeAreaView, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { List } from 'src/pages/History/styles';

export default function ProfileInfo({ data }) {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Image source={require("../../assets/download.png")}></Image>
                    <View style={{ alignSelf: "center" }}>
                        <Text > Dados Pessoais</Text>
                        <Info>
                            <Text>{data.nome_Usuario}</Text>
                            <Text>Cidade: Macapá</Text>
                            <Text>Cidade: Macapá2</Text>
                        </Info>
                    </View>
                    <View>
                        <Icon name="edit" size={24} color="#FFF"></Icon>
                    </View>
                </ScrollView>
        </SafeAreaView>
    );
}
