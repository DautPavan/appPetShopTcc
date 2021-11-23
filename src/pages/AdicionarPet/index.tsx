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

    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [peso, setPeso] = useState('');

    const [error, setError] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Femea', value: 1},
        {label: 'Macho', value: 2}
    ]);

    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState(null);
    const [items2, setItems2] = useState([
        {label: 'Pequeno', value: 1},
        {label: 'Medio', value: 2},
        {label: 'Grande', value: 3}
    ]);

    const [open3, setOpen3] = useState(false);
    const [value3, setValue3] = useState(null);
    const [items3, setItems3] = useState([]);
    
    type homeScreenProp = StackNavigationProp<RootStackParamList, 'AdicionarPet'>;
    const navigation = useNavigation<homeScreenProp>();

    const handleNavigateBack = async () => {
        setError("");
        setModalVisible(true);
        
        if (nome.length == 0 )
        {
            setError("Informe um nome")
            setModalVisible(false);
            return;
        }
        if (idade.length == 0 )
        {
            setError("Informe uma idade")
            setModalVisible(false);
            return;
        }
        if (peso.length == 0 )
        {
            setError("Informe um peso")
            setModalVisible(false);
            return;
        }
        if (nome.length == 0 )
        {
            setError("Informe um nome")
            setModalVisible(false);
            return;
        }
        if (value == null)
        {
            setError("Informe um sexo")
            setModalVisible(false);
            return;
        }
        if (value2 == null)
        {
            setError("Informe um Porte")
            setModalVisible(false);
            return;
        }
        if (value3 == null)
        {
            setError("Informe a raça")
            setModalVisible(false);
            return;
        }

        const jsonBody = {
            Nome : nome,
            Idade : parseInt(idade),
            Peso : parseInt(peso),
            GeneroBiologico : parseInt(value),
            PorteAnimal : parseInt(value2),
            RacaId : parseInt(value3)
        }
        api.post('Animal/Create', jsonBody)
           .then(response => {
               setError("");
               setModalVisible(false);
               navigation.goBack();

           })
           .catch(error => {
                setError("");
                setModalVisible(false);
                setError("Houve um erro: " + error.response.status)
                
           });
    }

    const toBack= () => {
        navigation.goBack();
    }

    useEffect(() => {
        setItems3([]);
        setModalVisible(true);       
      
        api.get('Raca/Buscar',)
           .then(response => {
               setError("");
               setModalVisible(false);
               const t:any = []; 

               response.data.map((el: any) => {
                    const obj = {label: el["Nome"], value: el["Id"]}

                    t.push(obj);
               });

               setItems3(t);

           })
           .catch(error => {
                setError("");
                setModalVisible(false);
                setError("Houve um erro: " + error.response.status)
                toBack();                
           });
        

           

    }, [])

    return (
        <>
        <ImageBackground 
            source={image} 
            style={styles.container}
            resizeMode="contain"
            imageStyle={{width: 274, height: 368 }}>

            <ScrollView>
                <View>
                    <TouchableOpacity onPress={toBack}>
                        <Icon 
                            name="arrow-left" 
                            size={20} 
                            color="#000"
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.main}>
                    <Text style={styles.title}>Regesitro de Animal</Text>
                </View>

                <View style={styles.footer}>
                    <TextInput 
                        style={styles.input}
                        placeholder="Digite o nome"
                        value={nome}
                        autoCorrect={false}
                        onChangeText={setNome}
                    >
                    </TextInput>

                    <TextInput 
                        style={styles.input}
                        placeholder="Digite a idade"
                        value={idade}
                        autoCorrect={false}
                        onChangeText={setIdade}
                        keyboardType="numeric"
                    >
                    </TextInput>

                    <TextInput 
                        style={styles.input}
                        placeholder="Digite a peso"
                        value={peso}
                        autoCorrect={false}
                        onChangeText={setPeso}
                        keyboardType="numeric"
                    >
                    </TextInput>

                    <DropDownPicker
                        zIndex={3000}
                        zIndexInverse={1000}
                        style={styles.input}
                        placeholder="Selecione a Raça"
                        open={open3}
                        value={value3}
                        items={items3}
                        setOpen={setOpen3}
                        setValue={setValue3}
                        setItems={setItems3}
                    />

                    <DropDownPicker
                        zIndex={2000}
                        zIndexInverse={2000}
                        style={styles.input}
                        placeholder="Selecione o Sexo"
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                    />

                    <DropDownPicker
                        zIndex={1000}
                        zIndexInverse={3000}
                        style={styles.input2}
                        placeholder="Selecione o Porte"
                        open={open2}
                        value={value2}
                        items={items2}
                        setOpen={setOpen2}
                        setValue={setValue2}
                        setItems={setItems2}
                    />

                    
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
                        <Text style={styles.buttonText}>Registrar</Text>
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