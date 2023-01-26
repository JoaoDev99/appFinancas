import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Text, View, StatusBar} from 'react-native';
import firebase from './src/services/firebaseConfig';
import Routes from './src/routes';
import AuthProvider from './src/contexts/auth';

export default function appFinancas() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor="#131313" barStyle="light-content" />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
