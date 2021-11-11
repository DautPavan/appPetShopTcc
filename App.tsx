import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/pages/Login';
import AppLoading from 'expo-app-loading';
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu'
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto'
import Routes from './src/routes';

export default function App() {
  let [fontsLoaded] = useFonts({
    Ubuntu_700Bold,
    Roboto_400Regular,
    Roboto_500Medium
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <StatusBar style="auto" backgroundColor="transparent" translucent />
        <Routes />
      </>
    );
  }
}
