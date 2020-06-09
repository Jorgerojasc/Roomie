import React, { useEffect, useState } from 'react';
import { View,Text,TextInput ,StyleSheet, Keyboard,TouchableWithoutFeedback, AsyncStorage,Picker,Alert} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';//nos va servir para hacerla responsive a cualquier dispositivo
import { TouchableOpacity } from 'react-native-gesture-handler';
import Check from '@expo/vector-icons/FontAwesome5';
import Cancel from '@expo/vector-icons/MaterialCommunityIcons';
import { NavigationActions, StackActions } from 'react-navigation';
import Calle from '@expo/vector-icons/MaterialIcons'
import Hash from '@expo/vector-icons/FontAwesome';
import Verificar from '@expo/vector-icons/MaterialCommunityIcons'
const ubicacion =(props)=>{
    const { navigate } = props.navigation;
    const { replace } = props.navigation;
    const estados = [
        "Elige un estado",
        "Aguascalientes",
        "Baja California Norte",
        "Baja California Sur",
        "Campeche",
        "Chiapas",
        "Chiuhua",
        "Ciudad de México",
        "Coahuila",
        "Colima",
        "Durango",
        "Estado de México",
        "Guanajuato",
        "Guerrero",
        "Hidalgo",
        "Jalisco",
        "Michoacán",
        "Morelos",
        "Nayarit",
        "Nuevo Léon",
        "Oaxaca",
        "Puebla",
        "Querétaro",
        "Quintana Roo",
        "San Luis Potosí",
        "Sinaloa",
        "Sonora",
        "Tabasco",
        "Tamaulipas",
        "Tlaxcala",
        "Veracruz",
        "Yucatán",
        "Zacatecas"
    ]
    const nombre_imagenes =[]
    const [photo,setPhoto]=useState([])
    const [descripcion, setDescripcion] = useState()
    const [costo, setCosto] = useState()
    const [propietario, setPropietario] = useState()
    const[visible, setVisible] = useState(false)
    const[selector, setSelector] = useState()
    const[calle, setCalle] = useState()
    const[colonia, setColonia]= useState()
    const[numero_ext, setNumero_ext] = useState()
    const[entidad, setEntidad] = useState()
    const[direccion,setDireccion] = useState()
    const[coordenadas, setCoordenadas] = useState()
    useEffect(()=>{
        (async () => {
            const imagenes_array = await AsyncStorage.getItem('Imagenes_publicacion')
            const imagenes = JSON.parse(imagenes_array)
            const descripcion = await AsyncStorage.getItem('Descripcion')
            const costo = await AsyncStorage.getItem('Costo')
            const id = await AsyncStorage.getItem('id')
            setPhoto(imagenes)
            setDescripcion(descripcion)
            setCosto(costo)
            setPropietario(id)
          })();  
    },[photo,descripcion,costo,propietario])
    const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Principal' })],
        });
    const insertar_datos =()=>{
        console.log(coordenadas)
        var formData = new FormData()
        //console.log(photo)
        formData.append('descripcion',descripcion)
        formData.append('costo',costo)
        formData.append('propietario',propietario)
        formData.append('direccion',direccion)
        formData.append('coordenadas',JSON.stringify(coordenadas))
        for (const iterator2 of photo) {
            var name = iterator2.id
            nombre_imagenes.push({img:name.substring(0,36)})

        }
        formData.append('imgs',JSON.stringify(nombre_imagenes))

        fetch('http://192.168.100.17:3000/inserta_publicacion',{
            method:"POST",
            headers:{
                'Accept':'application/json',
                'Content-Type':'multipart/form-data',
            },
            body:formData
        }).then((response)=>response.json())
        .then((res)=>{
            if(res.code ==1){
                mover_foto()
                Alert.alert(
                    "Roomie",
                    "Se completo su solicitud correctamente!",
                    [
                      { text: "OK"}
                    ],
                    { cancelable: false }
                );
                navigate('Principal');
                replace(resetAction);
            }
            else{
                console.log("error 500")
                Alert.alert(
                    "Roomie",
                    "Parece que hubo un error, intente mas tarde :(",
                    [
                      { text: "OK"}
                    ],
                    { cancelable: false }
                );
                navigate('Principal');
                replace(resetAction);
            }

        })
    }
    const mover_foto =()=>{
        var formData = new FormData();
        for (const iterator of photo) {
            var name = iterator.id
            formData.append('fotos',{
                uri:iterator.uri,
                type:'image',
                name:name.substring(0,36)+'.jpg',
            })   
        }
        fetch('http://192.168.100.17:3000/crear_archivo_fotos',{
        method:"POST",
        headers:{
            'Accept':'application/json',
            'Content-Type':'multipart/form-data',
        },
          body:formData
        })
    
    }
    const verificar_direccion =()=>{
        fetch('http://192.168.100.17:3000/verifica_direccion',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                calle:calle,
                colonia:colonia,
                numero:numero_ext,
                estado:entidad,

            })
        }).then((response)=>response.json())
        .then((res)=>{
            if(res.code ==1 && res.resultado!=0){
                setVisible(true)
                setDireccion(res.direccion)
                setCoordenadas(res.coordenadas)
                Alert.alert(
                    "Roomie",
                    "Se verifico correctamente su dirección!",
                    [
                      { text: "OK"}
                    ],
                    { cancelable: false }
                );
            }
            else{
                Alert.alert(
                    "Roomie",
                    "No se encontro la dirección, Intenta colocar espacios!",
                    [
                      { text: "OK"}
                    ],
                    { cancelable: false }
                );
                setVisible(false)
            }

        })
    } 
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <View style={styles.container}>
            <View style={styles.titulo_container}>
                <Text style={styles.titulo_descripcion}>Coloca los datos de la ubicación de tu propiedad</Text>
            </View>
            <View style={styles.container_calle}>
                <TouchableOpacity style={styles.house}><Calle name={'streetview'} size={35} style={styles.icono_hash}/></TouchableOpacity>
                <TextInput placeholder={'Calle'} placeholderTextColor ='#b3d1ff' style={styles.calle}  onChangeText={(val)=>{setCalle(val);setVisible(false)}}/>
            </View>
            <View style={styles.container_colonia}>
                <TouchableOpacity style={styles.house}><Hash name={'home'} size={35} style={styles.icono_hash}/></TouchableOpacity>
                <TextInput placeholder={'Colonia'} placeholderTextColor ='#b3d1ff' style={styles.colonia} onChangeText={(val)=>{setColonia(val);setVisible(false)}}/>
            </View>
            <View style={styles.container_numero}>
                <TouchableOpacity style={styles.hashtag}><Hash name={'hashtag'} size={35} style={styles.icono_hash}/></TouchableOpacity>
                <TextInput keyboardType={'numeric'} placeholder={'Número exterior'} placeholderTextColor ='#b3d1ff' style={styles.numero} onChangeText={(val)=>{setNumero_ext(val);setVisible(false)}}/>
            </View>
            <Picker 
            style={styles.list} 
            itemStyle={styles.item} 
            onValueChange={(itemval,itemindex)=>{setSelector(itemval);setEntidad(itemval);setVisible(false)}} 
            selectedValue={selector}
            >
                {estados.map((item, index)=>{
                    return(<Picker.Item label={item} value={item}/>)
                })}
            </Picker>
            <View style={styles.container_button}>
                {visible ? (
                    <TouchableOpacity style={styles.finalizar} onPress={()=>{insertar_datos();}}>
                        <Text style={styles.texto_finalizar}>Finalizar</Text>
                        <Check name={"check-circle"} size={30} style={styles.check}/>
                    </TouchableOpacity>

                ):null}
                {!visible ?(
                    <TouchableOpacity style={styles.verificar} onPress={()=>verificar_direccion()}>
                        <Text style={styles.texto_verificar}>Verificar Dirección</Text>
                        <Verificar name={'shield-search'} size={30} style={styles.shield}/>
                    </TouchableOpacity>
                ):null}
                <TouchableOpacity style={styles.cancelar} >
                    <Text style={styles.texto_finalizar}>Cancelar</Text>
                    <Cancel name={"cancel"} size={30} style={styles.check}/>
                </TouchableOpacity>
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
}
export default ubicacion;
const styles = StyleSheet.create({
    container:{
        height:'100%',
    },
    map:{
        height: hp('45%'),
        marginTop:wp(1),
    },
    input:{
        // borderColor:'#bfbfbf',
        width: wp(90),
        height: hp(5),
        marginLeft:wp(5),
        marginTop:wp(-86),
     
    },
    boton_direcciones:{
        zIndex:999999999,
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
    finalizar:{
        backgroundColor:'#43CA88',
        width:wp(70),
        height:hp(7),
        alignSelf:'center',
    },
    texto_finalizar:{
        alignSelf:'center',
        marginTop:wp(5),
        color:'white',
        fontWeight:'bold',

    },
    cancelar:{
        backgroundColor:'red',
        width:wp(70),
        height:hp(7),
        alignSelf:'center',
        marginTop:wp(10),
    },
    check:{
        marginLeft:wp(55),
        marginTop:wp(-6.5),
        color:'white'

    },
    container_button:{
        marginTop:wp(15)
    },
    titulo_descripcion:{
        width:wp(95),
        marginLeft:wp(2.5),
        marginTop:wp(3),
        fontWeight:'bold',
        color:'white',
        textAlign:'center',
        
    },
    titulo_container:{
        backgroundColor:'#1a75ff',
        height:hp(6),
        
    },
    list:{
        alignSelf:'center',
        marginTop:wp(5),
        width: wp(50),
        height:hp(10), 
    },
    item:{
        marginTop:-10,
        height:100,
        color: 'black'
    },
    container_numero:{
        height:hp(5),
        marginTop:wp(10),
        width:wp(45),
        alignSelf:'center'
    },
    numero:{
        borderColor:'#1a75ff',
        borderWidth:0.5,
        width:wp(35),
        height:hp(5),
        marginTop:wp(-10.8),
        marginLeft:wp(9),
        paddingLeft:5
    },
    hashtag:{
        backgroundColor:'#1a75ff',
        width:wp(9),
        height:hp(5),
        alignItems:'center',
        
    },
    icono_hash:{
        marginTop:3,
        color:'white'
    },
    container_colonia:{
        height:hp(5),
        marginTop:wp(7),
        width:wp(89),
        alignSelf:'center'
    },
    colonia:{
        borderColor:'#1a75ff',
        borderWidth:0.5,
        width:wp(80),
        height:hp(5),
        marginTop:wp(-10.8),
        marginLeft:wp(9),
        paddingLeft:5
    },
    house:{
        backgroundColor:'#1a75ff',
        width:wp(9),
        height:hp(5),
    },
    container_calle:{
        height:hp(5),
        marginTop:wp(7),
        width:wp(89),
        alignSelf:'center'
        
    },
    calle:{
        borderColor:'#1a75ff',
        borderWidth:0.5,
        width:wp(80),
        height:hp(5),
        alignSelf:'center',
        marginTop:wp(-10.8),
        marginLeft:wp(9),
        paddingLeft:5
    },
    verificar:{
        backgroundColor:'#43CA88',
        width:wp(70),
        height:hp(7),
        alignSelf:'center',
    },
    texto_verificar:{
        alignSelf:'center',
        marginTop:wp(5),
        color:'white',
        fontWeight:'bold',
    },
    shield:{
        marginLeft:wp(55),
        marginTop:wp(-6.5),
        color:'white'
    }
});