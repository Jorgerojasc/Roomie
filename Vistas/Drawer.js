import React, { useState, Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerItems, DrawerActions} from 'react-navigation-drawer'
import { View,Text, StyleSheet} from 'react-native';
import {AsyncStorage} from 'react-native';
import Notificaciones from './Notificaciones'
import stacknavigator from './Principal'
import stack_notificaciones from '../stacks/stack_notificaciones'
import ContentComponent from '../Vistas/ContentComponent'
import Icon from '@expo/vector-icons/FontAwesome';

const Drawstack = createDrawerNavigator({
   
    Principal:{
       screen: stacknavigator,

       navigationOptions:{
          drawerIcon:()=><Icon name={"home"} size={20} color={'#43CA88'}/>

       }
   },
    Notificaciones:{
       screen: stack_notificaciones,
       navigationOptions:{
          drawerIcon:()=><Icon name={"bell"} size={20} color={'#43CA88'}/>
       }

      }
 },
 {
    initialRouteName:'Principal',
    contentComponent:ContentComponent,//sirve para editar el menu desplegable
    contentOptions:{
       labelStyle:{
          color:'#43CA88',
         marginLeft:3

       },
       itemStyle:{
          marginTop:8,
       }
    },


   

 })

const Appdraw = createAppContainer(Drawstack);
export  default function Drawer(){
    return(<Appdraw/>)
}


