import React, { useEffect, useState } from 'react';
import { View,Text, StyleSheet, Button,TextInput,FlatList, Keyboard,TouchableWithoutFeedback,Image} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from '@expo/vector-icons/Entypo';
import Mylocation from '@expo/vector-icons/MaterialIcons'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';//nos va servir para hacerla responsive a cualquier dispositivo
import { TouchableOpacity } from 'react-native-gesture-handler';
import Autocomplete from 'react-native-autocomplete-input';
const menu =()=>{
    const[address, setAdress] = useState([])
    const[latitude, setLatitud] = useState("")
    const[longitude, setLongitude] = useState("")
    const[longitudeDelta,setDeltalongitude] = useState()
    const[latitudeDelta,setDeltalatitude] = useState()
    const[my_latitude,setMylatitude]=useState("")
    const[my_longitude, setMylongitude]=useState("")
    const[ocultar_lista,setOcultar]=useState(false)//sirve para ocultar la lista de direcciones al presionar sobre una de ellas
    const[input_text,setInput]=useState("")//sirve para que no se quede la direccion plasmada en el input de direccion al momento de darle click a alguna direccion
    const[direccion,setDireccion] = useState()
    const[coordenadas,setCoordenadas] = useState([])
    const[detalles,setDetalles] = useState(false)
    useEffect(()=>{//con esta funcion obtenemos nuestra ubicacion
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    "Roomie",
                    "Es necesario saber tu ubicacion, para poder usar algunas funciones dentro de la Aplicación!",
                    { cancelable: false }
                ); 
                setLatitud(24.126700122755626)
                setLongitude(-98.85990289938677)
                setDeltalongitude(0.94)
                setDeltalatitude(1.5)
                
            }
            let location = await Location.getCurrentPositionAsync({});
            setLatitud(location.coords.latitude)
            setLongitude(location.coords.longitude)
            setMylatitude(location.coords.latitude)
            setMylongitude(location.coords.longitude)
            setDeltalongitude(0.004)
            setDeltalatitude(0.0094)

            //Trae la informacion de viviendas 
            fetch('http://192.168.100.17:3000/markers',{
                
                
            }).then((response)=>response.json())
            .then((res)=>{
                if(res.code==1){
                    var coordenadas = JSON.parse(res.localizacion)
                    //var ubicacion = JSON.parse(res.ubicacion)
                    setCoordenadas(res.ubicacion)
                    //console.log(res.ubicacion)
                    setDireccion(res.direccion)
                }
            })

          })();  
    },[direccion])//EL arreglo vacio indica que solo se ejecutara una vez, puede ejecutarse si un valor cambia
    const busqueda = async (values)=>{
        fetch('http://192.168.100.17:3000/direcciones',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'             
            },
            body:JSON.stringify({
                direccion:values
              })
        })
        .then(response=>response.json())
        .then((res)=>{
            setAdress(res)
            setOcultar(false)
        })
    }
    const busca_ubicacion = (lat,lon)=>{
        Keyboard.dismiss()
        
        setLatitud(lat)
        setLongitude(lon)

    }
    const descripcion_casa =()=>{
        return(
            <View style={{backgroundColor:'red',marginTop:wp(10),height:hp(20),width:wp(95),alignSelf:'center',borderRadius:10}}>
                <Text>Informacio</Text>
            </View>
        )

    }
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <View style={styles.container}>

            <MapView
                provider={PROVIDER_GOOGLE} 
                showsUserLocation
                style={styles.map}
                region={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: latitudeDelta,
                    longitudeDelta: longitudeDelta,
                }}
                onPress={()=>Keyboard.dismiss()}
                >
                {/* <Marker coordinate={{
                    latitude:coordenadas.lat,
                    longitude:coordenadas.lon
                }}/> */}
                {coordenadas.map((item, index)=>{
                    return(<Marker coordinate={{
                        latitude:item.lat,
                        longitude:item.lon
                    }}
                    onPress={()=>setDetalles(true)}
                    ><Image source={require('../Iconos/casas.png')} style={{width:60,height:70}}/></Marker>)
                })}
            </MapView>
            <Autocomplete autoCapitalize="none" autoCorrect={false} data={address} defaultValue={''} onChangeText={(values)=>{busqueda(values);setInput(values)}} //Para modifcar mas los estilos es necesario ir a la ruta de react-native-autocomplte/index
                value={input_text}
                placeholder="Buscar lugares...."
                containerStyle={styles.input}
                hideResults={ocultar_lista}
                renderItem={({item,i})=>(
                    <TouchableOpacity style={styles.boton_direcciones} onPress={()=> {setOcultar(true);busca_ubicacion(item.lat,item.lon);setInput('')}}>
                        <Icon name={"location-pin"} size={25} style={styles.icono}/>
                        <Text style={styles.texto_direciones}>{item.address}</Text>
                    </TouchableOpacity>
                )}
            />
            <View style={{width:wp(11),marginLeft:wp(80),marginTop:wp(70)}}> 
                <TouchableOpacity style={styles.mylocation_button} onPress={()=>{setLatitud(my_latitude);setLongitude(my_longitude)}}>
                    <Mylocation name={'my-location'} size={25} style={styles.mylocation_icon}/>
                </TouchableOpacity>
            </View>

            {detalles ?( descripcion_casa()):null}
            
            
        </View>
        </TouchableWithoutFeedback>
    );
}
export default menu
const styles = StyleSheet.create({
    container:{
        height:'100%',
    },
    map:{
        height: hp('80%'),
        marginTop:wp(-5),
    },
    input:{
        // borderColor:'#bfbfbf',
        width: wp(90),
        height: hp(5),
        marginLeft:wp(5),
        marginTop:wp(-157),
        
        
     
    },
    boton_direcciones:{
        backgroundColor:'white',
        marginTop:0,
        borderBottomColor:'#bfbfbf',
        borderBottomWidth:1,
        flexGrow:1,
        flexShrink:1,
        flexDirection:'row',
        flexWrap:'wrap',
        flex:1,
        height:hp(5)
    },
    texto_direciones:{
        fontFamily:"Arial",
     
        width:0,
        height:hp(3.5),
        fontSize:15,
        flexGrow:1,
        flexShrink:1,
        flexDirection:'row',
        flexWrap:'wrap',
        flex:1,
        marginTop:wp(3),
    
    },
    icono:{
        marginTop:wp(2)
    },
    mylocation_button:{
        backgroundColor:'white',
        alignItems:'center',
        height:hp(5),
        width:wp(11),
        borderRadius:100,
        borderWidth:.5,
        borderColor:'#e6e6e6',
        
        
    },
    mylocation_icon:{
        marginTop:wp(2)
    }
});