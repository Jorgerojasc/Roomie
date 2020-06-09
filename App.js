import React from 'react';
import { createAppContainer } from 'react-navigation';
import 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation-stack';
import Registro from './Vistas/Registro'
import Inicio from './Vistas/Inicio'
import Drawer from './Vistas/Drawer'
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings(['Warning: ...']);

console.disableYellowBox = true;//ocultaremos los warning en el celular


const stack = createStackNavigator({
  Login: {
    screen: Inicio,
  },
  Signup:{
    screen: Registro
  },
  Principal:{
    screen: Drawer
  },
},
{
  initialRouteName: 'Login',
  defaultNavigationOptions: {
     header:false,
  }
}
);
const App = createAppContainer(stack);
export default function Stack(){
  return(
    <App/>
  )
}
