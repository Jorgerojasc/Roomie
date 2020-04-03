import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { DrawerActions } from '@react-navigation/native';
import Notificaciones from '../Vistas/Notificaciones'
import Inicio from '../Vistas/Inicio'
import stacknavigator from '../Vistas/Principal'
import { View,Text, StyleSheet,TouchableOpacity } from 'react-native';
 const mydraw = createDrawerNavigator({
    Menu:{screen: stacknavigator},
    Notificaciones:{screen: Notificaciones}
 },
 {
    initialRouteName:'Menu'
 }
)

const Appdraw = createAppContainer(mydraw);
export default class midrawer extends Component{
    render(){
        return <Appdraw/>
    }
}