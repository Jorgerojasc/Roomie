import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import Menu from '../Vistas/Menu'
import Headers from '../Diseño/Headers'


const stack = createStackNavigator({
  Roomie:{
      screen:Menu,
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