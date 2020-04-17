import React, { Component, useEffect, useState } from 'react';
import { View,Text, StyleSheet, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import {AsyncStorage} from 'react-native';

const menu =()=>{
    const[latitude, setLatitud] = useState("")
    const[longitude, setLongitude] = useState("")
    const[longitudeDelta,setDeltalongitude] = useState()
    const[latitudeDelta,setDeltalatitude] = useState()
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
            setDeltalongitude(0.004)
            setDeltalatitude(0.0094)
          })();
    })
    return(
        <View style={styles.container}>
            <MapView
                //provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                showsUserLocation
                style={styles.map}
                region={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: latitudeDelta,
                    longitudeDelta: longitudeDelta,
                }}
                >
            </MapView>
               
        </View>
    );
}
export default menu
// export default class Menu extends Component{//usamos la clase debido a que se necesita usar el navigationOptions, esto para que aparezca el icono de
//     state ={
//         nombre:[],
//     }
//     static navigationOptions = ({screenProps})=>({
//         headerLeft:( <Icon name="bars" size={30} style={{padding:10}} onPress={()=>screenProps.openDraw() }/>),//colocamos un boton en forma de imagen
//     })
//     componentDidMount(){
//         this.datos_usuario().done()
//     }
//     datos_usuario = async()=>{
//         var nombre =  await AsyncStorage.getItem("nombre")//traemos el nombre del usuarion guardado en el storage
//         if(nombre !==null){//si la variable nombre tiene un dato, lo coloca en el nombre
//             this.setState({nombre:nombre})
//         }
//     }
//     render(){
//         return(
//             <View style={styles.container}>
//                 <MapView
//                     provider={PROVIDER_GOOGLE} // remove if not using Google Maps
//                     style={styles.map}
//                     region={{
//                         latitude: 20.60502127318271,
//                         longitude: -100.16261193241418,
//                         latitudeDelta: 1.1,
//                         longitudeDelta: 1.121,
//                     }}
//                     >
//                 </MapView>
//                 <Text>{this.state.nombre}</Text>    
//             </View>
//         );
//     }
// }
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
    },
    map:{
        marginTop:-360,
        height:'50%'
    }
});