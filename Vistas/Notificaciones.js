import React from 'react';
import { View,Text, Image,TextInput,TouchableWithoutFeedback,Keyboard,KeyboardAvoidingView } from 'react-native';
//import { StyleSheet, Text, View } from 'react-native';
const notificaciones =(props)=>{
    
    //es por el view
    return(
        
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            
            <View style={{height:'100%'}}>
                <Text >Notificaciones</Text>
            </View>
        </TouchableWithoutFeedback>
       
    );
}
export default notificaciones;