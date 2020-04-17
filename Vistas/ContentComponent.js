import React, { useState, useEffect } from 'react';
import { View,Text, StyleSheet,SafeAreaView,Image,ScrollView,TouchableOpacity } from 'react-native';
import {AsyncStorage} from 'react-native';
import { DrawerItems} from 'react-navigation-drawer'
import images from '../Imagenes/imagenes.js'
import StarRating from 'react-native-star-rating';
const menu_usuario=(props)=>{
    const[nombre,setNombre]=useState("")
    const[id, setId]=useState("")
    const[foto,setFoto]=useState("")
    const[calificacion,setCalificacion] = useState("")
    const[apellido,setApellido] = useState("")
    useEffect(()=>{//lo usamos en vez del component didmount
        const datos_usuario = async()=>{
            var nombre =  await AsyncStorage.getItem("nombre")//traemos el nombre del usuarion guardado en el storage
            var id =  await AsyncStorage.getItem("id")
            var foto = await AsyncStorage.getItem("foto")
            var calificacion = await AsyncStorage.getItem("calificacion")
            var apellido = await AsyncStorage.getItem("apellido_paterno")
            if(nombre !==null && id!==null && foto!==null){//si la variable nombre tiene un dato, lo coloca en el nombre
                setNombre(nombre)
                setId(id)
                setFoto(foto)
                setCalificacion(calificacion)
                setApellido(apellido)
               
            }
        }
        datos_usuario()
    },[setNombre],[setId],[setFoto],[setCalificacion],[setApellido])
    var calificacion_2 =""
    if(calificacion == "0" || calificacion==0){//no sirve para ponerle el decimal en caso de que sea 0.0, es meramente decorativo
        calificacion_2=".0"
        
    }
    else{
        calificacion_2=""
    }
    var convertir_float = parseFloat(calificacion)
    //console.log(images.Imagen[foto])
    return(
        <SafeAreaView style={{flex:1}}>
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>alert("Settings")} >
                   <Image source={images.Imagen[foto]} style={styles.imagen}/>
                </TouchableOpacity>
                <Text style={styles.nombre_dinamico}>{nombre} {apellido}</Text>
                <View style={styles.container_star}>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={convertir_float}
                        starSize={15}
                        containerStyle={{width:20}}
                        emptyStarColor={'white'}
                        halfStarColor={'white'}
                        fullStarColor={'white'}
                    />
                </View>
                <Text style={styles.calificacion}>{calificacion+calificacion_2}</Text>

            </View>
            <ScrollView>
            <DrawerItems {...props}/>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
       height:180,
       backgroundColor:'#43CA88',
       marginTop:-44
      
    },
    imagen:{
      width:80,
      height:80,
      borderRadius:50,
      marginLeft:20,
      marginTop:60
    },
    nombre_dinamico:{
        marginLeft:120,
        marginTop:-60,
        fontSize:17,
        color:'white'
    },
    calificacion:{
        marginLeft:195,
        marginTop:-13,
        fontSize:10.5,
        color:'white'
    },
    container_star:{
        marginLeft:120,
        marginTop:5
    }
});

export default menu_usuario