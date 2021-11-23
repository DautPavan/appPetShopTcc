import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Text, View, TextInput, Modal, Pressable } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'
import { Feather as Icon } from '@expo/vector-icons'
import styles from './styles';
import image from '../../assets/logo.png';
import background from '../../assets/home-background.png';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../rootStackNavigator';
import api from '../../services/api';
import * as SecureStore from 'expo-secure-store';

function Login() {
    const [value, onChangeValue] = useState('');
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    type homeScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;
    const navigation = useNavigation<homeScreenProp>();

    const saveToken = async (value: string) => {
        await SecureStore.deleteItemAsync('token');
        await SecureStore.setItemAsync('token', value);
    }

    const saveNome = async (value: string) => {
        await SecureStore.deleteItemAsync('Nome');
        await SecureStore.setItemAsync('Nome', value);
    }

    const handleNavigateBack = async () => {
        setModalVisible(true);
        setError("");

        if (login.length == 0 )
        {
            setError("Informa um email")
            return;
        }

        if (senha.length == 0 )
        {
            setError("Informa uma senha")
            return;
        }
        
        const jsonBody = { Login: login, Senha: senha };
        
        api.post('Login/Login', jsonBody)
            .then(response => {
                setModalVisible(false);
                setError("");
                console.log(response.data.token)
                saveToken(response.data.token).then(() => {
                    saveNome(response.data.nome).then(() => {
                        navigation.navigate("Menu");
                    });                    
                })
                .catch(() => {
                    throw "Ocorreu um erro ao salvar o token";
                })
            })
            .catch(error => {
                setModalVisible(false);
                if (error.response.status >= 400 && error.response.status < 500) {
                    setError("Usuario não localizado")
                }else {
                    setError("Houve um erro na requisição: " + error.response.status)
                }
            });
    }

    const registrarUsuario = () => {
        navigation.navigate("RegistrarUsuario");

    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setModalVisible(true);
            SecureStore.deleteItemAsync('token');
            setModalVisible(false);
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.test}>
            <ImageBackground 
                source={image} 
                style={styles.container}
                resizeMode="contain"
                imageStyle={{width: 274, height: 368 }}>

                <View style={styles.main}>
                    <Text style={styles.title}>PetShop</Text>
                    <Text style={styles.description}>Bem-vindo ao app de agendamento do nosso petshop.</Text>
                </View>

                <View style={styles.footer}>
                    <TextInput 
                        style={styles.input}
                        placeholder="Digite seu login"
                        value={login}
                        autoCorrect={false}
                        onChangeText={setLogin}
                    >

                    </TextInput>
                    <TextInput 
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Digite seu senha"
                        value={senha}
                        autoCorrect={false}
                        onChangeText={setSenha}
                    >

                    </TextInput>

                    <Text style={styles.titleAlert}>{error}</Text>

                    <RectButton style={styles.button} onPress={handleNavigateBack}>
                        <View style={styles.buttonIcon}>                        
                            <Text>
                                <Icon 
                                    name="arrow-right" 
                                    color="#FFF" 
                                    size={24}
                                />
                            </Text>
                        </View>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </RectButton>

                    <Text
                        style={styles.titleRegister}
                        onPress={registrarUsuario}>
                        Registrar - se
                    </Text>

                </View>
            </ImageBackground>

            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Carregando</Text>
                            <Image source={require('./../../assets/loading.gif')}/>
                            
                        </View>
                    </View>
                </Modal>
            </View>

        </View>
    );

}

export default Login;