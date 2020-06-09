import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import Notificaciones from '../Vistas/Notificaciones'
import Headers from '../Diseño/Secundary_Header'
import Menu from '../Vistas/Menu'
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
  Roomie:{
    screen:Menu
  },
  initialRouteName:'Notificaciones'

});
const Stackapp= createAppContainer(stack);
export default Stackapp