import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import Notificaciones from '../Vistas/Notificaciones'
import { DrawerActions } from 'react-navigation-drawer';
import Icon from '@expo/vector-icons/FontAwesome';
import { Button } from 'react-native-paper';
import Headers from '../Diseño/Headers'

const stack = createStackNavigator({
  Notificaciones:{
      screen:Notificaciones,
      navigationOptions:({navigation})=>{
        return{
            headerTintColor:'#43CA88',
            headerLeft:()=><Headers navigation={navigation}/>
        }
      }
    
  },

},);
const Stackapp= createAppContainer(stack);
export default Stackapp