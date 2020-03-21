import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import Inputs from './Diseño/Inputs';
import Buttons from './Diseño/buttons'
export default function App() {
  
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Roomie</Text>
      <Inputs placeholder={"Usuario"} icon={"user"} />
      <Inputs placeholder={"Contraseña"} icon={"lock"} password={true} />
      <Buttons texto={"Iniciar sesión"} estilo={"con_estilo"}
      />
      <Buttons texto={"Aún no te haz registrado? Registrate Aquí"} estilo={"sin_estilo"} />
      <Buttons texto={"¿Haz olvidado tu contraseña?"} estilo={"sin_estilo"} />
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
    marginTop:-300,
    color:'white',
    fontFamily:'Zapfino',
    fontWeight:'bold',
    fontSize:30,
    textAlign:'center'
  }
});
