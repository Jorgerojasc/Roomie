import React, { useState, useEffect } from 'react';
import { View,Text, StyleSheet,SafeAreaView,Image,ScrollView,TouchableOpacity,Alert } from 'react-native';
import {AsyncStorage} from 'react-native';
import { DrawerItems} from 'react-navigation-drawer'
import images from '../Imagenes/imagenes.js'
import StarRating from 'react-native-star-rating';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
const menu_usuario=(props)=>{
    const { navigation } = props;
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
    },[nombre,foto,calificacion,apellido])
    var calificacion_2 =""
    if(calificacion == "0" || calificacion==0){//no sirve para ponerle el decimal en caso de que sea 0.0, es meramente decorativo
        calificacion_2=".0"
        
    }
    else{
        calificacion_2=""
    }
    var convertir_float = parseFloat(calificacion)
    const cerrar_sesion=()=>{
        Alert.alert(
            "Roomie",
            "Estas seguro de Cerrar sesión?",
            [
              {
                text: "Cancelar",
                
              },
              { text: "OK", onPress: () => {AsyncStorage.removeItem('calificacion');AsyncStorage.clear();navigation.replace('Login')} }
            ],
            { cancelable: false }
        );
      
        // AsyncStorage.clear()
        // navigation.navigate('Login')
    }
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
            <TouchableOpacity style={{height:hp(5)}} onPress={()=>cerrar_sesion()}>
                <Icon name={'logout'} size={20} color={'#43CA88'} style={{marginTop:wp(3),width:wp(5),marginLeft:wp(5)}}/>
                <Text style={{color:'#43CA88',fontWeight:'bold',marginLeft:wp(15.5),marginTop:wp(-5.5)}}>Cerrar Sesión</Text>
            </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
       height:hp(22),
       backgroundColor:'#43CA88',
       marginTop:wp(-12)
      
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