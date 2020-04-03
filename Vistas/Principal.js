import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { DrawerActions } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation-stack';
import Menu from '../Vistas/Menu'
import Icon from '@expo/vector-icons/FontAwesome';
import Notificaciones from '../Vistas/Notificaciones'
import { withNavigation } from 'react-navigation';
import Inicio from '../Vistas/Inicio'
import { View,Text, StyleSheet,TouchableOpacity } from 'react-native';


const Drawer = createDrawerNavigator({
  Menu: { screen: Notificaciones},
  Otro: {screen:Inicio }
});
const stack = createStackNavigator({
  Menu:{
      screen:Menu
  },
  Drawer:Drawer
  

},

{
  
  defaultNavigationOptions:({navigation})=> {
    return {
      headerLeft: <Icon name="bars" size={30} style={{padding:10}} onPress={()=>navigation.dispatch(DrawerActions.openDrawer()) }/>
      
    }
    
  }
}
);
const Principal = createAppContainer(stack);
export default withNavigation(Principal)