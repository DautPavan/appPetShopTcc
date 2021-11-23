import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Text, View, ScrollView, Modal, Pressable } from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler'
import { Feather as Icon } from '@expo/vector-icons'
import styles from './styles';
import image from '../../assets/logo.png';
import background from '../../assets/home-background.png';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../rootStackNavigator';
import { useNavigation } from '@react-navigation/core';
import * as SecureStore from 'expo-secure-store';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../services/api';

function Menu() {
    const [value, setValue] = React.useState('');
    const [value2, setValue2] = React.useState('');
    const [modalVisible, setModalVisible] = useState(false);
    
    type homeScreenProp = StackNavigationProp<RootStackParamList, 'Menu'>;
    const navigation = useNavigation<homeScreenProp>();

    function handleNavigateBack(){
        navigation.goBack();
    }

    useEffect(() => {
        setModalVisible(true);  
      
        api.get('Animal/Buscar',)
           .then(response => {
            setModalVisible(false);

           })
           .catch(error => {
            setModalVisible(false);
           });
        
    }, [])

    const getToken = async () => {
        let result = await SecureStore.getItemAsync('token');
        if (result) {
            setValue(result)
        }
    }

    const getNome = async () => {
        let result = await SecureStore.getItemAsync('Nome');
        if (result) {
            setValue2(result)
        }
    }

    const goPet = () => {
        navigation.navigate("Pet");
    }
    const goAgendar = () => {
        navigation.navigate("Agendar");
    }


    useEffect(() => {
        getToken()
        getNome()   
    })

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon 
                        name="arrow-left" 
                        size={20} 
                        color="#000"
                    />
                </TouchableOpacity>

                <Text style={styles.title}>
                    Bem vindo {value2}.
                </Text>

                <View style={styles.mapContainer}>
                    
                </View>
            </View>
            <View style={styles.itemsContainer}>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 20}}>
                    <TouchableOpacity style={styles.item} onPress={goAgendar}>
                        <Icon 
                            name="clock" 
                            size={42} 
                            color="#ffd364"
                        />
                        <Text style={styles.itemTitle}>Agendar</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.item} onPress={goPet}>
                        <MaterialCommunityIcons 
                            name="dog" 
                            size={42} 
                            color="#ffd364"
                        />
                        <Text style={styles.itemTitle}>Pet</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            
        </>
    );
}

export default Menu;