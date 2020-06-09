import React, { useState, useEffect } from 'react';
import { View,Text, TouchableOpacity, StyleSheet,Modal,ScrollView,Image,FlatList, AsyncStorage } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ImageBrowser } from 'expo-multiple-media-imagepicker';
import Arrow from '@expo/vector-icons/Ionicons'
const fotos =(props)=>{
    // const l = {
    //     uri: "assets-library://asset/asset.JPG?id=5710F8F7-D228-4A20-84C0-2A75279A5CAA&ext=JPG",
    //     type:"image",
    //     name:'IMG_0996.JPG'

    // }
    const { navigate } = props.navigation;//obtenemos las propiedades de stack_Anunciar
    const[visible,setVisible]=useState(false)
    const[photos,setPhotos] = useState([])
    const respuestaopcion =(callback)=>{
        callback.then((photo)=>{
            setVisible(false)
            setPhotos(photo)
        }).catch((e)=>{
            console.log(e)
        })

    }
    const guardardatos = async()=>{
        AsyncStorage.setItem('Imagenes_publicacion',JSON.stringify(photos))
    }
    return(
        <View style={styles.container}>
            <Modal visible={visible}>
                <ImageBrowser
                    max={5}
                    headerCloseText={'Cancelar'}
                    headerDoneText={'Añadir'}
                    headerSelectText={'seleccionada(s)'}
                    callback={respuestaopcion}
                />
            </Modal>
            <View style={styles.container_titulo}>
                <Text style={styles.container_texto}>Añade fotos de tu propiedad</Text>
            </View>
            <View style={styles.preview}>
                <ScrollView style={{position:'absolute',top:0,left:0,right:0,bottom:0,marginTop:4,marginLeft:2.5}} contentContainerStyle={{flexDirection:'row',flexWrap:'wrap'}} >
                    {
                        photos.map((item,i)=>(
                           <View style={{backgroundColor:'red'}}>
                                <Image        
                                    style={{ height: 110, width: 110 }}
                                    source={{ uri: item.uri }}
                                    key={i}
                                />
                           </View>
                            
                        ))
                    }
                    
                </ScrollView>

            </View>
            <View>
                
            </View>
            <TouchableOpacity style={styles.foto} onPress={()=>setVisible(true)}>
                <Text style={styles.titulo_boton}>Subir Fotos</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.siguiente} onPress={()=>{navigate("Ubicacion");guardardatos();prueba();mover_foto()}}></TouchableOpacity> */}
            <TouchableOpacity style={styles.siguiente} onPress={()=>{navigate("Ubicacion");guardardatos();}}>
                <Text style={styles.texto_siguiente}>Siguiente</Text>
                <Arrow name={'ios-arrow-forward'} size={40} color={'white'} style={styles.arrow}/>
            </TouchableOpacity>
        </View>
    )
}
export default fotos

const styles = StyleSheet.create({
    container:{

        height:hp(100)
    },
    container_titulo:{
        width:wp(100),
        backgroundColor:'#1a75ff',
        alignSelf:'center',
        height:hp(5),

    },
    container_texto:{
        alignSelf:'center',
        color:'white',
        fontWeight:'bold',
        marginTop:wp(3)
    },
    foto:{
        backgroundColor:'#43CA88',
        width:wp(60),
        alignSelf:'center',
        marginTop:wp(5),
        height:hp(6)
    },
    titulo_boton:{
        alignSelf:'center',
        marginTop:wp(4.2),
        fontWeight:'bold',
        color:'white',
    },
    preview:{
        backgroundColor:'#f2f2f2',
        height:hp(40),
        width:wp(90),
        marginTop:wp(2),
        marginLeft:wp(5),
        borderColor:'#20232a',
        borderWidth: 1,
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
    arrow:{
        marginLeft:wp(60),
        marginTop:wp(-7.5)

    }

});