import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login';
import Menu from './pages/Menu';
import App from '../App';
import RegistrarUsuario from './pages/RegistrarUsuario';
import Pet from './pages/Pet';
import AdicionarPet from './pages/AdicionarPet';
import Agendar from './pages/Agendar';

const AppStack = createStackNavigator();

const Routes = () => {
    return(
        <NavigationContainer>
            <AppStack.Navigator 
                screenOptions={{ 
                                headerShown: false,
                                cardStyle: {
                                    backgroundColor: '#F0F0F5'
                                }
                            }}
            >
                <AppStack.Screen name="Login" component={Login}/>
                <AppStack.Screen name="Pet" component={Pet}/>
                <AppStack.Screen name="Menu" component={Menu}/>
                <AppStack.Screen name="AdicionarPet" component={AdicionarPet}/>
                <AppStack.Screen name="RegistrarUsuario" component={RegistrarUsuario}/>
                <AppStack.Screen name="Agendar" component={Agendar}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;