import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createAppContainer } from 'react-navigation';
import Notificacion from '../Vistas/Notificaciones'
import Menu_principal from '../Vistas/Menu'
import { View,Text } from 'react-native';
const Barra = createDrawerNavigator({
    Menu_principal:{
        screen: Menu_principal   
    }
})
const Home = createAppContainer(Barra)
export default Home;