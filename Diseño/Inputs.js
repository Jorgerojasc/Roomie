import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import Icon from '@expo/vector-icons/FontAwesome';

export default function Inputs(props) {
    return (
        <View style={styles.input_container}>
            <Icon name={props.icon} size={20} />
            <TextInput style={styles.input} placeholder={props.placeholder} secureTextEntry={props.password} placeholderTextColor ='#b2cccc' underlineColorAndroid='blue' />
        </View>
    );
}

const styles = StyleSheet.create({
    input_container: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'transparent',
        borderWidth: 0.5,
        padding: 5,
        marginTop: 10,
        height:35,
        marginLeft:15,
        marginTop:30,
        backgroundColor:'#278b5b',
        borderRadius:10
    },
    input: {
        color:'green',
        height: 40,
        fontSize: 20,
        marginLeft: 10,
        alignContent:'center',
        width:'97%'
    },
});