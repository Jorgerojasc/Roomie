import React from 'react';
import { createAppContainer } from 'react-navigation';
import 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation-stack';
import Registro from './Vistas/Registro'
import Inicio from './Vistas/Inicio'
import Drawer from './Vistas/Drawer'



const stack = createStackNavigator({
  Login: {
    screen: Inicio
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
const app = createAppContainer(stack);
export default app
