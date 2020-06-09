import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import Agenda from '../Vistas/Agenda'
import Menu from '../Vistas/Menu'
import Headers from '../Diseño/Secundary_Header'

const stack = createStackNavigator({
    Agenda:{
        screen:Agenda,
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
})
const stackapp = createAppContainer(stack)
export default stackapp