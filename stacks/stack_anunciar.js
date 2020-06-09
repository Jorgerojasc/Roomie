import React from 'react';
import { createAppContainer,createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import Anunciar from '../Vistas/Anunciar'
//import Headers from '../Diseño/Headers'
import Headers from '../Diseño/Secundary_Header'
import Fotos from '../Vistas_Anunciar/fotos'
import Ubicacion from '../Vistas_Anunciar/ubicacion'
import Drawer from '../Vistas/Drawer'
import Menu from '../Vistas/Menu'
import Principal from '../stacks/Principal'
const Stack = createStackNavigator({
    Anunciar:{
        screen:Anunciar,
        navigationOptions:({navigation})=>{
            return{
                headerTintColor:'#43CA88',
                headerLeft:()=><Headers navigation={navigation}/>,
                cardStyle:{
                    backgroundColor:'white'
                },
            }

        },

    },
    Fotos:{
        screen:Fotos,
        navigationOptions:({navigation})=>{
            return{
                title:'Anunciar',
                headerTitleStyle:{
                    color:'#43CA88'
                },
                headerBackTitle:'Atras',
                cardStyle:{
                    backgroundColor:'white'
                }
                
            }
        },
    },
    Ubicacion:{
        screen:Ubicacion,
        navigationOptions:({navigation})=>{
            return{
                title:'Ubicacion',
                headerTitleStyle:{
                    color:'#43CA88'
                },
                headerBackTitle:'Atras',
                cardStyle:{
                    backgroundColor:'white'
                }
            }
        }
    },
    Roomie:{
        screen:Menu
    },
    initialRouteName:'Anunciar',

})
/*const myswitch = createSwitchNavigator({
    Stack:{
       screen:Stack
    },
    Principal:{
       screen:Principal
    }
 })*/
const Stackapp = createAppContainer(Stack)
export default Stackapp