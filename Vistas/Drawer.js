import React from 'react';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator} from 'react-navigation-drawer'
import stack_principal from '../stacks/Principal'
import stack_notificaciones from '../stacks/stack_notificaciones'
import stack_Anunciar from '../stacks/stack_anunciar';
import stack_Agenda from '../stacks/stack_agenda'
import ContentComponent from '../Vistas/ContentComponent'
import Icon from '@expo/vector-icons/FontAwesome';
import Icon2 from '@expo/vector-icons/Octicons';
import Icon3 from '@expo/vector-icons/SimpleLineIcons'
import App from '../App'

const Drawstack = createDrawerNavigator({
   
   Principal:{
       screen: stack_principal,

       navigationOptions:{
          drawerIcon:()=><Icon name={"home"} size={20} color={'#43CA88'}/>

       }
   },
    Notificaciones:{
       screen: stack_notificaciones,
       navigationOptions:{
          drawerIcon:()=><Icon name={"bell"} size={20} color={'#43CA88'} onPress={()=>alert("hola")}/>
       }

   },
   Anunciar:{
      screen: stack_Anunciar,
      navigationOptions:{
         drawerIcon:()=><Icon2 name={"megaphone"} size={20} color={'#43CA88'}/>
      }
   },
   Agenda:{
      screen:stack_Agenda,
      navigationOptions:{
         drawerIcon:()=><Icon3 name={"notebook"} size={20} color={'#43CA88'} />
      }
   },
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
       },
       
    },
 })

const myswitch = createSwitchNavigator({
   Drawer:{
      screen:Drawstack
   },
   logout:{
      screen:App
   }
})
const Appdraw = createAppContainer(myswitch);
export default Appdraw


