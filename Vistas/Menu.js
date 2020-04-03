import React from 'react';
import { View,Text, Image, StyleSheet } from 'react-native';
//import { StyleSheet, Text, View } from 'react-native';
const Menu =()=>{
    return(
        <View style={styles.container}>
            <Text>Hola Menu</Text>
            
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#43CA88',
      justifyContent: 'center',
    },
});
export default Menu;