
/*Esta pestaña sirvira para los botones de registro y iniciar sesion, en caso de que existan mas coin este mismo estilo*/ 
import React from 'react';
import { View,Text, StyleSheet,TouchableOpacity } from 'react-native';

export default function buttons(props){
    if(props.estilo=="con_estilo"){
        return(
         
            <View style={styles.container}>
                <TouchableOpacity style={styles.button_container} >
                    <Text style={styles.button_text}>{props.texto}</Text>
                </TouchableOpacity>
            </View>
        );
    }
    return(
        <View style={styles.container}>
            <TouchableOpacity>
                <Text style={styles.button_text_liga}>{props.texto}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center'
    },
    button_container: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 210,
      height: 50,
      backgroundColor: '#74d8a7',
      borderRadius: 5,
      marginTop: 30
    },
    button_text: {
      color: 'white',
      fontSize: 20,
      justifyContent: 'center',
    },
    button_text_liga:{
        color:'#009900',
        marginTop:10
    }
  });
