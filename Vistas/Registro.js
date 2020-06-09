import React,{useState} from 'react';
import { StyleSheet, Text, View, Button, ActionSheetIOS,Alert,TouchableWithoutFeedback,KeyboardAvoidingView,Keyboard } from 'react-native';
import Inputs from '../Diseño/Inputs';
import Buttons from '../Diseño/buttons'
import DatePicker from 'react-native-datepicker'
import Moment from 'moment';
import {AsyncStorage} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const Registro =({navigation})=> {
  
  //En esta funcion nos desplegara un menu para elegir como obtendremos la foto
  const opcionesfoto = () =>{
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Elegir foto de la biblioteca", "Tomar foto", "Cancelar"],
        cancelButtonIndex:2,
        //destructiveButtonIndex:2,
        cancelButtonBox:{
          backgroundColor:'red'
        }
        
      },
      buttonIndex => {
        if (buttonIndex === 3) {
          //Cancela las opciones
        } else if (buttonIndex === 0) {
          Elegirfoto()
        } else if (buttonIndex === 1) {
          Tomarfoto()
        }
      }
    );
  }
  // let uploadimage =(imagen,nombre_imagen)=>{
  //   return new Promise((resolve, reject)=>{
  //     let xmlhttp = new XMLHttpRequest()

  //    xmlhttp.onreadystatechange =()=>{
  //      if(xmlhttp.readyState==4 && xmlhttp.status==200){
  //        resolve(xmlhttp.response)
  //     }
  //   }
  //   xmlhttp.open("GET",imagen)
  //   xmlhttp.responseType="blob"
  //   xmlhttp.send()
  //   })

  // }
  
  //En esta funcion obtendremos una foto de nuestra biblioteca de fotos del celular
  const[foto_status,setFotostatus] = useState("user.png")//esta nos va a servir por si el usuario elige no subir foto
  let Elegirfoto = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        "Roomie",
        "Se requiere tene permisos para acceder a las fotos de su biblioteca!",
        { cancelable: false }
      );
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
    });

    var imagen_seleccionada = pickerResult.uri
    var renderizar = await ImageManipulator.manipulateAsync(imagen_seleccionada, [{resize:{width:720,height:1280}}],{compress:0.5})//optimizamos la imagen, ya que si es muy pesada tarda en cargarse
    const datos_imagen = {
      uri:renderizar.uri,
      type:"image",
      name:renderizar.uri,

    }
    if(imagen_seleccionada!==undefined){
      setFotostatus("subio_foto")
      setfoto(datos_imagen)
      Alert.alert(
        "Roomie",
        "Su foto se guardo correctamente!",
        [
          { text: "OK", onPress: () => setTexto("Cambiar Foto") }
        ],
        { cancelable: false }
      );
    }
    else{
      setTexto("Subir Foto")
        
    }
    // uploadimage(imagen_seleccionada,"perfil").then(resolve=>{
    //   var datos_imagen = JSON.stringify(resolve)
    //   var datos_imagen_2 = JSON.parse(datos_imagen)
    //   setType(datos_imagen_2._data.type)
    //   //console.log(datos_imagen_2._data.type)
    //   //setfoto(datos_imagen)
    // }).catch(err=>{
    //   console.log(JSON.stringify(err))
    // })
    

  }

  //En esta funcion obtendremos una foto tomada por la camara
  let Tomarfoto =async()=>{
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        "Roomie",
        "Se requiere tener permisos para acceder a la camara!",
        { cancelable: false }
      );
      return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync();
    var foto = pickerResult.uri
    //console.log(pickerResult)
    var imagen_seleccionada = pickerResult.uri
    var renderizar = await ImageManipulator.manipulateAsync(imagen_seleccionada, [{resize:{width:720,height:1280}}],{compress:0.5})//optimizamos la imagen, ya que si es muy pesada tarda en cargarse
    
   
    const datos_imagen = {
      uri:renderizar.uri,
      type:"image",
      name:renderizar.uri

    }
    //console.log('datos:',pickerResult)
    //console.log(renderizar)
    if(imagen_seleccionada!==undefined){
      setFotostatus("subio_foto")
      setfoto(datos_imagen)
      Alert.alert(
        "Roomie",
        "Su foto se guardo correctamente!",
        [
          { text: "OK", onPress: () => setTexto("Cambiar Foto") }
        ],
        { cancelable: false }
      );
    }
    else{
      setTexto("Subir Foto")
        
    }

    //console.log(pickerResult.uri);
  }
  let mover_foto =()=>{//esta funcion sirve para mover las imagenes subidas por el usuario a nuestro servidor, es decir a una carpeta
    var formData = new FormData();
    formData.append('foto', foto);
    fetch('http://192.168.100.17:3000/crear_archivo',{
      method:"POST",
      headers:{
        'Accept':'application/json',
        'Content-Type':'multipart/form-data',
      },
      body:formData
    })

  }
  //En esta funcion nos conectaremos a nuestra base de datos usando express, es necesario arrancar el servidor en otra consola "npm run server"
  const [nombre, setnombre] = useState("")
  const datos=()=>{
    var formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    formData.append('correo', correo);
    formData.append('fecha', fecha_input);
    formData.append('password', password);
    formData.append('foto_status',foto_status)//nos dira si o no se eligio foto
    formData.append('foto', foto);
    formData.append('apellido_materno',apellido_materno)
    fetch('http://192.168.100.17:3000/users',{//es obligatorio colocar la ip de nuestra maquina y el puerto

      method:"POST",
      headers:{
        'Accept':'application/json',
        'Content-Type':'multipart/form-data',
      },
      body:formData


    })
    .then((response)=>response.json())
    .then((res)=>{
      if(res.code == 1){
        mover_foto()//se ejecuta la funcion para mover la imagen, ya que si lo hacemos antes se crashea la app
        Alert.alert(
          "Roomie",
          "Bienvenido: "+res.nombre,
          { cancelable: false }
        );
        var nombre = res.nombre
        var id = res.id
        var foto_perfil = res.Foto
        AsyncStorage.setItem('nombre',nombre)
        AsyncStorage.setItem('id',id)
        AsyncStorage.setItem("foto",foto_perfil)
        AsyncStorage.setItem("apellido_paterno",res.apellido_paterno)
        AsyncStorage.setItem("calificacion",res.calificacion)
        navigation.replace("Principal")
      }
      else if(res.code ==2){
        Alert.alert(
          "Roomie",
          "Oops, Parece que olvidaste rellenar un campo!",
          { cancelable: false }
        );
      }
      else if(res.code == 3){
        setcorreo("")
        Alert.alert(
          "Roomie",
          "El correo introducido ya esta en uso!",
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
  const [texto_boton,setTexto]=useState("Subir Foto")
  const [confirmar,setconfirmar] = useState("no")//sirve para que no se muestre una fecha cuando se incie el formulario de registro
  const [date, setDate] = useState(new Date());//se usan los hooks, para usar una funcion de set sin tener que crea una clase
  var fecha_actual =  Moment(new Date()).format('YYYY/MM/DD')//convertimos la fecha actual a 'YYYY/MM/DD' porque si la ponemos 'DD/MM/YYYY' toma los dias como meses
  //console.log(fecha_actual)
  const[apellido,setapellido] = useState("")
  const[apellido_materno,setapellido_materno] = useState("")
  const[correo, setcorreo]=useState("")
  const[foto, setfoto] = useState("")
  const[password, setpassword] = useState("")
  var mensaje =""//nos sirve para saber si no se introdujo una fecha invalida
  const onChange = ( fechaseleccionada) => {//esta funcion lo que hace es obtener la fecha seleccionada y la cambia con  setDate y guarda o actualiza para la variable date
    
    const fecha = fechaseleccionada;
    setconfirmar("si")
    setDate(fecha);    

  };
  var fecha_input = Moment(date).format('DD/MM/YYYY')//guardamos la fecha seleccionada poor el datapicker para autorellenar el TextInput
  if(fecha_input == 'Invalid date' || confirmar=="no" ){
    mensaje="invalida"
  }
  else{
    mensaje ="valida"
  }
  //<Button onPress={fotitos} title="Choose photo"></Button>
  //para mostrar icono del calendario es necesario ir a la carpeta de datepicker y abrir el js, en la linea que dice "whether or not show the icon" colocar true en showIcon
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <KeyboardAvoidingView  style={styles.registro_container} behavior={"position"} enabled={true}>
        <Text style={styles.titulo}>Roomie</Text>
        <Inputs placeholder={"Nombre"} icon={"user"} OnChangeText = {(value)=>setnombre(value)}  />
        <Inputs placeholder={"Apellido Paterno"} OnChangeText={(value)=>setapellido(value)}/>
        <Inputs placeholder={"Apellido Materno"} OnChangeText={(value)=>setapellido_materno(value)}/>
        <Inputs placeholder={"Correo"} icon={"envelope"} OnChangeText={(value)=>setcorreo(value)} valor={correo}/>
        <Inputs placeholder={"Fecha de nacimiento"} icon={"calendar"} valor={fecha_input} fecha_valida={mensaje}  />
        <DatePicker
          locale={"es"}
          style={{width: '100%',marginTop:-40,height:40,position:'fixed', marginLeft:-22}}
          date={date}
          mode="date"
          maxDate={fecha_actual}
          minDate={'1930/12/31'}
          
          confirmBtnText="Aceptar"
          cancelBtnText="Cancelar"
          hideText
          customStyles={{        
            dateInput: {
              borderColor:'transparent',
              marginLeft: 36,
            }
            
          }
          
        }
        onDateChange={onChange}
        
        />
        <Inputs placeholder={"Contraseña"} icon={"lock"} password={true} OnChangeText={(value)=>setpassword(value)} />
      </KeyboardAvoidingView>
      <Buttons texto={texto_boton} estilo={"con_estilo"} press={()=>opcionesfoto()} icono={'image'}/>
      <Buttons texto={"Registrarse"} estilo={"con_estilo"} press={()=>datos()}
      />
      <Buttons texto={"Ya tienes cuenta? Inicia Sesión Aquí"} estilo={"sin_estilo"} ventana ={"Login"}  />
    </View>
    </TouchableWithoutFeedback>
    
  );
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#43CA88',
    justifyContent: 'center',
  },
  titulo:{
    marginTop:wp(-10),
    color:'white',
    fontFamily:'Zapfino',
    fontWeight:'bold',
    fontSize:30,
    textAlign:'center'
  },
  registro_container:{
    flex:0
  }
});

export default Registro;