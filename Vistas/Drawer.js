import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer'
import Notificaciones from './Notificaciones'
import stacknavigator from './Principal'
 const Drawstack = createDrawerNavigator({
    Roomie:{screen: stacknavigator},
    Notificaciones:{screen: Notificaciones}
 },
 {
    initialRouteName:'Roomie'
 }
)

const Appdraw = createAppContainer(Drawstack);
export  default function Drawer(){
    return(<Appdraw/>)
}
