import React, { useState } from 'react';
import { StyleSheet, Text, View,Alert } from 'react-native';
import Inputs from '../Diseño/Inputs'
import Buttons from '../Diseño/buttons' 
import {AsyncStorage} from 'react-native';

const  Inicio = ( {navigation})=> {

  const datos=()=>{
    fetch('http://192.168.100.17:3000/login',{//es obligatorio colocar la ip de nuestra maquina y el puerto

      method:"POST",
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        correo:correo,
        password:password,
      })


    })
    .then((response)=>response.json())
    .then((res)=>{
      if(res.code == 1){
        Alert.alert(
          "Roomie",
          "Bienvenido: "+res.nombre,
          { cancelable: false }
        );
        AsyncStorage.setItem('nombre',res.nombre)
        AsyncStorage.setItem('id',res.id)
        AsyncStorage.setItem("foto",res.foto)
        AsyncStorage.setItem('calificacion',res.calificacion)
        AsyncStorage.setItem('apellido_paterno',res.apellido_paterno)
        navigation.replace("Principal")
      }
      else if(res.code==2){
        Alert.alert(
          "Roomie",
          "Oops, Parece que olvidaste rellenar un campo",
          { cancelable: false }
        );        
      }
      else if(res.code == 4){
        setpassword("")
        Alert.alert(
          "Roomie",
          "Correo o Contraseña Incorrectos!",
          { cancelable: false }
        ); 
      }
      else{
        Alert.alert(
          "Roomie",
          "Oops, parece que hubo un error en nuestro servidor :(",
          { cancelable: false }
        );       
      }
    })
    .done()

    
  }
  const[correo,setcorreo] = useState("")
  const[password,setpassword] = useState("")
  
    return (
      <View style={styles.container}>
    
        <Text style={styles.titulo}>Roomie</Text>
        <Inputs placeholder={"Correo"} icon={"envelope"} OnChangeText={(value)=>setcorreo(value)} />
        <Inputs placeholder={"Contraseña"} icon={"lock"} password={true} OnChangeText={(value)=>setpassword(value)} valor={password}/>
        <Buttons texto={"Iniciar sesión"} estilo={"con_estilo"} ventana ={"Principal"} press={()=>datos()}/>
        <Buttons  texto={"Aún no te haz registrado? Registrate Aquí"} estilo={"sin_estilo"} ventana ={"Signup"}  />
        <Buttons texto={"¿Haz olvidado tu contraseña?"} estilo={"sin_estilo"} />
      </View>
      //sirve para crear nuestros botones, ya con un estilo definido, sin tener que usar demasidos estilos
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#43CA88',
      justifyContent: 'center',
    },
    titulo:{
      marginTop:-300,
      color:'white',
      fontFamily:'Zapfino',
      fontWeight:'bold',
      fontSize:30,
      textAlign:'center'
    }
  });
 
  export default Inicio