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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SecureStore from 'expo-secure-store';

function RegistrarUsuario() {
    LogBox.ignoreAllLogs();

    const [pets, setPets] = useState([]);

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [email, setEmail] = useState('');

    const [error, setError] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [open, setOpen] = useState(false);
    const [value, setValue] = React.useState('');
    const [items, setItems] = useState([
        {label: 'Masculino', value: 'Masculino'},
        {label: 'Feminino', value: 'Feminino'}
    ]);

    const [date, setDate] = useState(new Date());
    
    type homeScreenProp = StackNavigationProp<RootStackParamList, 'Pet'>;
    const navigation = useNavigation<homeScreenProp>();

    const toMenu = () => {
        navigation.goBack();
    }

    const toAdd = () => {
        navigation.navigate("AdicionarPet");
    }

    const deletar = (id: string) => {
        setModalVisible(true); 

        api.delete(`Animal/Deletar/${id}`,)
        .then(response => {
            setError("");
            setModalVisible(false);

            setModalVisible(true);
            setPets([])        
          
            api.get('Animal/Buscar',)
               .then(response => {
                   setError("");
                   setModalVisible(false);
                   setPets(response.data);    
    
               })
               .catch(error => {
                    setError("");
                    setModalVisible(false);
                    setError("Houve um erro: " + error.response.status)
                    toMenu();                
               });

        })
        .catch(error => {
            setError("");
            setModalVisible(false);
            setError("Houve um erro: " + error.response.status)
            toMenu();                
        });

    }

    useEffect(() => {
        setModalVisible(true);
        setPets([])        
      
        api.get('Animal/Buscar',)
           .then(response => {
               setError("");
               setModalVisible(false);
               setPets(response.data);

           })
           .catch(error => {
                setError("");
                setModalVisible(false);
                setError("Houve um erro: " + error.response.status)
                toMenu();                
           });
        
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setModalVisible(true);
            setPets([])        
          
            api.get('Animal/Buscar',)
               .then(response => {
                   setError("");
                   setModalVisible(false);
                   setPets(response.data) 
               })
               .catch(error => {
                    setError("");
                    setModalVisible(false);
                    setError("Houve um erro: " + error.response.status)
                    toMenu();                
               });

        });
        return unsubscribe;
    }, [navigation]);


    return (
        <>
        <ImageBackground 
            source={background} 
            style={styles.container}
            resizeMode="contain"
            imageStyle={{width: 274, height: 368 }}>

            <ScrollView>
                <View>
                    <TouchableOpacity onPress={toMenu}>
                        <Icon 
                            name="arrow-left" 
                            size={20} 
                            color="#000"
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.main}>
                    <Text style={styles.title}>Seus Pets</Text>
                </View>

                {
                    pets.map((el, index) => {
                        return (
                        <View style={styles.mapContainer} key={index}>
                            <View style={styles.profile}>
                                <MaterialCommunityIcons 
                                    name="dog" 
                                    size={42} 
                                    color="#ffd364"
                                />

                                <View style={styles.profileInfo}>
                                    <Text style={styles.name}>
                                        {el["Nome"]}
                                    </Text>
                                    <Text style={styles.subject}>
                                        Idade: {el["Idade"]}
                                    </Text>
                                    <Text style={styles.subject}>
                                        Raça: {el["Raca"]["Nome"]}
                                    </Text>
                                </View>

                                <View style={styles.remover}>
                                    <TouchableOpacity onPress={() => {deletar(el["Id"])}}>
                                        <MaterialCommunityIcons 
                                        name="delete" 
                                        size={35} 
                                        color="#d12c38"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        );
                    })
                }

                <RectButton style={styles.button} onPress={toAdd}>
                    <View style={styles.buttonIcon}>                        
                        <Text>
                            <Icon 
                                name="save" 
                                color="#FFF" 
                                size={24}
                            />
                        </Text>
                    </View>
                    <Text style={styles.buttonText}>Adicionar</Text>
                </RectButton>
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