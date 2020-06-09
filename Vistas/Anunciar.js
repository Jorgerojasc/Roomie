import React, { useState, useEffect } from 'react';
import { View,Text,TouchableWithoutFeedback,Keyboard,TextInput,StyleSheet ,TouchableOpacity, AsyncStorage} from 'react-native';
import Textarea from 'react-native-textarea';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Autocomplete from 'react-native-autocomplete-input';
import Icon from  '@expo/vector-icons/Foundation'
import Arrow from '@expo/vector-icons/Ionicons'
const Anunciar =({navigation})=>{
    const[descripcion,setDescripcion] = useState()
    const[costo,setCosto] = useState()
    // AsyncStorage.setItem('descripcion',descripcion) deben ir en la funcion onchangetext
    // AsyncStorage.setItem('costo',costo)
    const guardardatos = async()=>{
        AsyncStorage.setItem('Descripcion',descripcion)
        AsyncStorage.setItem('Costo',costo)
    }
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{height:'100%'}}>
            <View style={styles.titulo_container}>
                <Text style={styles.titulo_descripcion}>  Añade un descripción sobre la propiedad</Text>
            </View>
            <TextInput
              style={styles.textarea}
              multiline
              editable
              maxlength ={30}
              placeholder={'Descripcion breve, eje: Color azul, 2 recamaras y 3 ventanas....'}
              numberOfLines={4}
              onChangeText={(value)=>setDescripcion(value)}
        
            />
            <View style={styles.container_costo}>
                <TouchableOpacity style={styles.signo}>
                    <Icon name={'dollar'} size={40}/>
                </TouchableOpacity>
                <TextInput
                    keyboardType={'numeric'}
                    style={styles.input_costo}
                    onChangeText={(value)=>setCosto(value)}
                />
            </View>
            <Text style={styles.texto_costo}>*Ingresa el costo de la renta en pesos MX</Text>
            <TouchableOpacity style={styles.siguiente} onPress={()=>{navigation.navigate("Fotos");guardardatos()}}><Text style={styles.texto_siguiente}>Siguiente</Text><Arrow name={'ios-arrow-forward'} size={40} color={'white'} style={styles.arrow}/></TouchableOpacity>

        </View>
        </TouchableWithoutFeedback>
    )
}
export default Anunciar
const styles = StyleSheet.create({
    container:{
        height:'100%',
    },
    textarea:{
        backgroundColor:'white',
        height:hp(20),
        textAlignVertical: 'top',
        width:wp(95),
        marginLeft:wp(2.5),
        marginTop:wp(3),
        borderColor:'#bfbfbf',
        borderWidth:.4,
        backgroundColor:'#e6f2ff'
    },
    titulo_descripcion:{
        textAlignVertical:'bottom',
        width:wp(80),
        marginLeft:wp(10),
        marginTop:wp(3),
        fontWeight:'bold',
        color:'white'
    },
    titulo_container:{
        backgroundColor:'#1a75ff',
        height:hp(5),
        
    },
    siguiente:{
        backgroundColor:'#43CA88',
        width:wp(70),
        height:hp(7),
        alignSelf:'center',
        marginTop:wp(20),
    },
    texto_siguiente:{
        alignSelf:'center',
        marginTop:wp(5),
        color:'white',
        fontWeight:'bold'

    },
    input_costo:{
        backgroundColor:'white',
        width:wp(30),
        height:hp(5),
        alignSelf:'center',
        borderColor:'#D8DADC',
        borderWidth:1,
        marginLeft:wp(8),
        marginTop:wp(-10.8)
    },
    container_costo:{
        width:wp(40),
        height:hp(5),
        alignSelf:'center',
        marginTop:wp(10),
    },
    signo:{
        backgroundColor:'#a6a6a6',
        width:wp(9),
        height:hp(5),
        alignItems:'center',
    
    },
    texto_costo:{
       textAlign:'justify',
        width:wp(50),
        marginLeft:wp(32),
        fontSize:11,
        color:'#b3b3b3'
    },
    arrow:{
        marginLeft:wp(60),
        marginTop:wp(-7.5)

    }
});