import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Text, View, TextInput, TouchableOpacity, ScrollView, Modal, LogBox, Alert  } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'
import { Feather as Icon } from '@expo/vector-icons'
import styles from './styles';
import image from '../../assets/logo.png';
import background from './../../assets/home-background.png';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../rootStackNavigator';
import api from '../../services/api';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-datepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function RegistrarUsuario() {
    LogBox.ignoreAllLogs();
    const [error, setError] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    var apoio = new Date();

    const [date, setDate] = useState(apoio.getFullYear() + "-" + (apoio.getMonth() + 1) + '-' + apoio.getDate());

    const [horarios, setHorarios] = useState([]);

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    const [open3, setOpen3] = useState(false);
    const [value3, setValue3] = useState(null);
    const [items3, setItems3] = useState([]);

    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState(null);
    const [items2, setItems2] = useState([
        {label: '08:00', value: 800},
        {label: '08:30', value: 830},
        {label: '09:00', value: 900},
        {label: '09:30', value: 930},
        {label: '10:00', value: 1000},
        {label: '10:30', value: 1030},
        {label: '11:00', value: 1100},
        {label: '11:30', value: 1130},
        {label: '12:00', value: 1200},
        {label: '12:30', value: 1230},
        {label: '13:00', value: 1300},
        {label: '13:30', value: 1330},
        {label: '14:00', value: 1400},
        {label: '14:30', value: 1430},
        {label: '15:00', value: 1500},
        {label: '15:30', value: 1530},
        {label: '16:00', value: 1600},
        {label: '16:30', value: 1630},
        {label: '17:00', value: 1700},
        {label: '17:30', value: 1730},
        {label: '18:00', value: 1800},
    ]);

    type homeScreenProp = StackNavigationProp<RootStackParamList, 'Agendar'>;
    const navigation = useNavigation<homeScreenProp>();
 
    const handleNavigateBack = async () => {
        setError("");
        setModalVisible(true);
       
        console.log(date)

        if (value == null)
        {
            setError("Informe um Serviço")
            setModalVisible(false);
            return;
        }
        if (value2 == null)
        {
            setError("Informe um Horario")
            setModalVisible(false);
            return;
        }
        if (value3 == null)
        {
            setError("Informe um Animal")
            setModalVisible(false);
            return;
        }          
        

        var arrayDate = date.toString().split('-');
        var hora = items2.find(el => el.value == value2)
        var horaSeparada: string[] = [];
        if (hora != undefined){
            var horaSeparada = hora.label.split(':');
        }
        console.log(arrayDate)
        console.log(horaSeparada)
         
        var horarioAgendado = new Date(parseInt(arrayDate[0]), parseInt(arrayDate[1]) - 1, parseInt(arrayDate[2]), parseInt(horaSeparada[0]), parseInt(horaSeparada[1]) );

        
        const jsonBody = {
            HoraAgendada : horarioAgendado,
            AnimalId : parseInt(value3),
            ServicoId : parseInt(value),
        }

        api.post('Agenda/Create', jsonBody)
           .then(response => {
               setError("");
               setModalVisible(false);
               navigation.goBack();

           })
           .catch(error => {
               console.log(error)
                setError("");
                setModalVisible(false);
                setError("Houve um erro: " + error.response.status)
                
           });
    }

    const toBack = () => {
        navigation.goBack();
    }

    useEffect(() => {
        setItems([]);
        setModalVisible(true);       
      
        api.get('Servico/BuscarTodos',)
        .then(response => {
            setError("");
            setModalVisible(false);
            const t:any = []; 

            response.data.map((el: any) => {
                const obj = {label: el["Descricao"], value: el["Id"]}

                t.push(obj);
            });
            console.log(response.data)

            setItems(t);

        })
        .catch(error => {
        console.log(error)
        console.log(error.response.status)
            setError("");
            setModalVisible(false);
            setError("Houve um erro: " + error.response.status)
            toBack();                
        });

    }, [])

    useEffect(() => {
        setItems3([]);
        setModalVisible(true);       
      
        api.get('Animal/Buscar',)
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

    useEffect(() => {
        setHorarios([]);
        setModalVisible(true);

        api.get('Agenda/ListaMobiPessoa')
        .then(response => {
            console.log("aqui")
            console.log(response.data)
            setHorarios(response.data);
            setError("");
            setModalVisible(false);
        })
        .catch(error => {
             setError("");
             setModalVisible(false);
             setError("Houve um erro: " + error.response.status)
             
        });           

    }, [])

    return (
        <>
        <ImageBackground 
            source={background} 
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
                    <Text style={styles.title}>Agendar</Text>
                </View>                

                <View style={styles.footer}>

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
                        zIndex={3000}
                        zIndexInverse={1000}
                        style={styles.input2}
                        placeholder="Selecione o Animal"
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
                        style={styles.input2}
                        placeholder="Selecione um Serviço"
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
                        style={styles.input}
                        placeholder="Selecione o Horário"
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
                        <Text style={styles.buttonText}>Agendar</Text>
                    </RectButton>
                </View>

                <View style={styles.itemsContainer}>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{paddingHorizontal: 20}}>

                        {
                            horarios.map((el, index) => {
                                return (
                                    <TouchableOpacity style={styles.item}>
                                        <View style={styles.GroupImgitem}>
                                            <Icon 
                                                style={styles.imgRelogio}
                                                name="clock" 
                                                size={42} 
                                                color="#ffd364"
                                            />
                                            <Text style={styles.itemTitle}>
                                                {
                                                    el["Status"] == 0 ? "Espera" : el["Status"] == 1 ? "Iniciado" : "Concluído" 
                                                }
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={styles.itemTitle2}>
                                                {el["HoraAgendada"].toString().split("T")[0].split("-")[2]}
                                                /{el["HoraAgendada"].toString().split("T")[0].split("-")[1]}
                                                /{el["HoraAgendada"].toString().split("T")[0].split("-")[0]}
                                            </Text>
                                            <Text style={styles.itemTitle2}>{el["HoraAgendada"].toString().split("T")[1].replace("Z","")}</Text>
                                            <Text style={styles.itemTitle2}>{el["Animal"]["Nome"]}-{el["Dono"]["Nome"]}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }

                    </ScrollView>
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