
/*Esta pestaña sirvira para los botones de registro y iniciar sesion, en caso de que existan mas coin este mismo estilo*/ 
import React from 'react';
import 'react-native-gesture-handler';
import { View,Text, StyleSheet,TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from '@expo/vector-icons/FontAwesome';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const buttons  = (props)=>{
    const { navigation } = props;
    if(props.estilo=="con_estilo"){//en este if dara un estilo a los botones que arrojen dicho texto "con_estilo"
        return(
         
            <View style={styles.container}>
                <TouchableOpacity style={styles.button_container} onPress={props.press}>
                    <Icon style={styles.icono} name={props.icono} size={20} />
                    <Text style={styles.button_text}>{props.texto}</Text>
                </TouchableOpacity>
            </View>
        );
        
    }//en caso de que arroje "sin_estilo" el boton se vera como un link, es decir sin estilos
    return(
        
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>navigation.replace(props.ventana)}>
                <Text style={styles.button_text_liga}>{props.texto}</Text>
            </TouchableOpacity>
            
        </View>
        //props.texto plasmara el texto que tendra el boton
    )
}
const styles = StyleSheet.create({
    container:{
        alignItems:'center'
    },
    button_container: {
      justifyContent: 'center',
      alignItems: 'center',
      width: wp(50),
      height: hp(7),
      backgroundColor: '#74d8a7',
      borderRadius: 5,
      marginTop: wp(5)
    },
    button_text: {
      color: 'white',
      fontSize: 20,
      justifyContent: 'center',
      position:'absolute'
    },
    button_text_liga:{
        color:'#009900',
        marginTop:10,
        borderRadius:1200
    },
    icono:{
        marginLeft:-150,
    }
  });

  export default withNavigation(buttons);//withNavigation nos da la propiedad de cambiar las ventanas