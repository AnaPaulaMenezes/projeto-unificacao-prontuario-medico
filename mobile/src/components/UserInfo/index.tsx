import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation, NavigationContainer } from '@react-navigation/native';


import { Container, Image, Info, Text, Content, Title, Line, UserInfo, ButtonArea, InfoModal } from './styles';
import { SafeAreaView, View, Button, Alert, Modal, TouchableHighlight, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { List } from 'src/pages/History/styles';

export default function ProfileInfo({ data }) {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [name, onChangeName] = React.useState(data.nome_Usuario)
    const [email, onChangeEmail] = React.useState(data.email)

    return (
        <><SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={require("../../assets/download.png")}></Image>
                <View style={{ alignSelf: "center" }}>
                    <Title> Dados Pessoais</Title>
                    <Info>
                        <Content>
                            <Text>Nome</Text>
                            <UserInfo>{data.nome_Usuario}</UserInfo>
                        </Content>
                        <Line></Line>
                        <Content>
                            <Text>Email</Text>
                            <UserInfo>{data.nome_Usuario}</UserInfo>
                        </Content>
                        <Line></Line>
                        <Content>
                            <Text>Telefone</Text>
                            <UserInfo>{data.rg_Usuario}</UserInfo>
                        </Content>
                        <Line></Line>
                        <Content>
                            <Text>Data de nascimento</Text>
                            <UserInfo>Cidade: Macapá2</UserInfo>
                        </Content>
                        <ButtonArea>
                            <Button
                                title="Editar"
                                onPress={() => { setModalVisible(true); }} />
                        </ButtonArea>
                    </Info>
                </View>
            </ScrollView>
        </SafeAreaView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={{ alignSelf: "center" }}>
                    <InfoModal>
                        <Content>
                            <Text>Nome</Text>
                            <TextInput
                                style={{ height: 40, marginLeft: 15 }}
                                onChangeText={text => onChangeName(text)}
                                value={name}
                            />
                        </Content>
                        <Line></Line>
                        <Content>
                            <Text>Email</Text>
                            <TextInput
                                style={{ height: 40, marginLeft: 15 }}
                                onChangeText={text => onChangeEmail(text)}
                                value={email}
                            />
                        </Content>
                        <Line></Line>
                        <Content>
                            <Text>Telefone</Text>
                            <UserInfo>{data.rg_Usuario}</UserInfo>
                        </Content>
                        <Line></Line>
                        <Content>
                            <Text>Data de nascimento</Text>
                            <UserInfo>Cidade: Macapá2</UserInfo>
                        </Content>
                        <ButtonArea>
                            <Button
                                title="Editar"
                                onPress={() => { setModalVisible(false); }} />
                            <Button
                                title="Cancelar"
                                onPress={() => { setModalVisible(false); }} />
                        </ButtonArea>
                    </InfoModal>
                </View>
            </Modal></>


    );
}
