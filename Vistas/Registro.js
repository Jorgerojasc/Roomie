import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Inputs from '../Diseño/Inputs';
import Buttons from '../Diseño/buttons'
import DatePicker from 'react-native-datepicker'
import Moment from 'moment';
const Registro =()=> {
  const [confirmar,setconfirmar] = useState("no")//sirve para que no se muestre una fecha cuando se incie el formulario de registro
  const [date, setDate] = useState(new Date());//se usan los hooks, para usar una funcion de set sin tener que crea una clase
  var mensaje =""//nos sirve para saber si no se h¿introdujo una fecha invalida
  const onChange = ( fechaseleccionada) => {//esta funcion lo que hace es obtener la fecha seleccionada y la cambia con  setDate y guarda o actualiza para la variable date
    
    const fecha = fechaseleccionada;
    setconfirmar("si")
    setDate(fecha);

  };
  var fecha_input = Moment(date).format('DD/MM/YYYY')//guardamos la fecha seleccionada poor el datapicker para autorellenar el TextInput
  //console.log(fecha_input)
  if(fecha_input == 'Invalid date' || confirmar=="no" ){
    mensaje="invalida"
  }
  else{
    mensaje ="valida"
  }
 
  
  //para mostrar icono del calendario es necesario ir a la carpeta de datepicker y abrir el js, en la linea que dice "whether or not show the icon" colocar true en showIcon
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Roomie</Text>
      <Inputs placeholder={"Nombre"} icon={"user"}/>
      <Inputs placeholder={"Apellidos"} />
      <Inputs placeholder={"Correo"} icon={"envelope"} />
      <Inputs placeholder={"Foto"} icon={"image"}  />
      
      <Inputs placeholder={"Fecha de nacimiento"} icon={"calendar"} fecha={fecha_input} fecha_valida={mensaje} />
      <DatePicker
        locale={"es"}
        style={{width: '100%',marginTop:-40,height:40,position:'fixed', marginLeft:-22}}
        date={date}
        mode="date"
        format="DD/MM/YYYY"
        maxDate={new Date()}
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
      <Inputs placeholder={"Contraseña"} icon={"lock"} password={true} />
      <Buttons texto={"Registrarse"} estilo={"con_estilo"}
      />
      <Buttons texto={"Ya tienes cuenta? Inicia Sesión Aquí"} estilo={"sin_estilo"} ventana ={"Login"} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#43CA88',
    justifyContent: 'center',
  },
  titulo:{
    marginTop:-50,
    color:'white',
    fontFamily:'Zapfino',
    fontWeight:'bold',
    fontSize:30,
    textAlign:'center'
  }
});

export default Registro;