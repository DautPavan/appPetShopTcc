import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Text, View, TextInput, TouchableOpacity, ScrollView, Modal, LogBox  } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'
import { Feather as Icon } from '@expo/vector-icons'
import styles from './styles';
import image from '../../assets/logo.png';
import background from '../../assets/home-background.png';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../rootStackNavigator';
import api from '../../services/api';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-datepicker';

function RegistrarUsuario() {
    LogBox.ignoreAllLogs();

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    //const [cpf, setCpf] = useState('');
    //const [rg, setRg] = useState('');
    const [email, setEmail] = useState('');

    const [error, setError] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Masculino', value: 'Masculino'},
        {label: 'Feminino', value: 'Feminino'}
    ]);

    const [date, setDate] = useState(new Date());

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    
    type homeScreenProp = StackNavigationProp<RootStackParamList, 'RegistrarUsuario'>;
    const navigation = useNavigation<homeScreenProp>();


 
    const handleNavigateBack = async () => {
        setError("");
        setModalVisible(true);
        
        if (nome.length == 0 )
        {
            setError("Informe um nome")
            return;
        }

        if (value == null)
        {
            setError("Informe um sexo")
            return;
        }

        // if (cpf.length == 0 )
        // {
        //     setError("Informe um CPF")
        //     return;
        // }

        // if (rg.length == 0 )
        // {
        //     setError("Informe um RG")
        //     return;
        // }
        
        if (login.length == 0 )
        {
            setError("Informe um login")
            return;
        }

        if (senha.length == 0 )
        {
            setError("Informe uma senha")
            return;
        }
        
        const jsonBody = {
            Nome : nome,
            DataNascimento : date,
            Sexo : value,
            //CPF : cpf,
            //RG : rg,
            Email : email,
            Login : login,
            Senha : senha
        };

        console.log(jsonBody)
        
        api.post('Login/CreateUserMobile', jsonBody)
           .then(response => {
               setError("");
               setModalVisible(false);
               navigation.navigate("Login");


           })
           .catch(error => {
                setError("");
                setModalVisible(false);
                if (error.response.status == 400) {
                    setError("Houve um erro: " + error.response.status + "\n" + error.response.data.message);
                } else {
                    setError("Houve um erro: " + error.response.status);
                }
                
           });
    }

    const toLogin = () => {
        navigation.navigate("Login");
    }

    return (
        <>
        <ImageBackground 
            source={background} 
            style={styles.container}
            resizeMode="contain"
            imageStyle={{width: 274, height: 368 }}>

            <ScrollView>
                <View>
                    <TouchableOpacity onPress={toLogin}>
                        <Icon 
                            name="arrow-left" 
                            size={20} 
                            color="#000"
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.main}>
                    <Text style={styles.title}>Registrar Usuário</Text>
                </View>

                <View style={styles.footer}>
                    <TextInput 
                        style={styles.input}
                        placeholder="Digite seu nome"
                        value={nome}
                        autoCorrect={false}
                        onChangeText={setNome}
                    >
                    </TextInput>
                    <TextInput 
                        style={styles.input}
                        placeholder="Digite seu Email"
                        value={email}
                        autoCorrect={false}
                        onChangeText={setEmail}
                    >
                    </TextInput>

                    <DatePicker
                        style={{width: '100%', padding: 10}}
                        date={date}
                        mode="date"
                        placeholder="Digite sua data nascimento"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        }
                        }}
                        onDateChange={(date: any) => {setDate(date)}}
                    />

                    <DropDownPicker
                        style={styles.input}
                        placeholder="Selecione seu sexo"
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                    />

                    {/* <TextInput 
                        style={styles.input}
                        placeholder="Digite seu CPF"
                        value={cpf}
                        autoCorrect={false}
                        onChangeText={setCpf}
                        keyboardType="numeric"
                    >
                    </TextInput> */}

                    {/* <TextInput 
                        style={styles.input}
                        placeholder="Digite seu RG"
                        value={rg}
                        autoCorrect={false}
                        onChangeText={setRg}
                        keyboardType="numeric"
                    >
                    </TextInput> */}

                    <TextInput 
                        style={styles.input}
                        placeholder="Digite seu Login"
                        value={login}
                        autoCorrect={false}
                        onChangeText={setLogin}
                    >
                    </TextInput>


                    <TextInput 
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Digite sua senha"
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
                                    name="save" 
                                    color="#FFF" 
                                    size={24}
                                />
                            </Text>
                        </View>
                        <Text style={styles.buttonText}>Registrar-se</Text>
                    </RectButton>
                </View>
            </ScrollView>
        </ImageBackground>

        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}>

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Carregando</Text>
                        <Image source={require('./../../assets/loading.gif')}/>
                        
                    </View>
                </View>
            </Modal>
        </View>
        </>
    );
}

export default RegistrarUsuario;