import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default function Inputs(props) {//validar que los campos esten llenos
    
    if(props.fecha_valida == "invalida" ){
        return (
            <View style={styles.input_container}>
                <Icon name={props.icon} size={20} />
                <TextInput style={styles.input} placeholder={props.placeholder} secureTextEntry={props.password} placeholderTextColor ='#b2cccc'   onChangeText={props.OnChangeText} />
            </View>
            
        );
        
        
    }
    return (
        <View style={styles.input_container}>
            <Icon name={props.icon} size={20} />
            <TextInput style={styles.input} placeholder={props.placeholder} secureTextEntry={props.password} placeholderTextColor ='#b2cccc' value={props.valor} onChangeText={props.OnChangeText}  />
        </View>
    );
    
    
}

const styles = StyleSheet.create({
    input_container: {
        width: wp('90%'),
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'transparent',
        borderWidth: 0.5,
        padding: 5,
        marginTop: wp(10),
        height:hp(4),
        marginLeft:wp(5),
        marginTop:wp(5),
        backgroundColor:'#278b5b',
        borderRadius:10
    },
    input: {
        color:'white',
        height: 40,
        fontSize: 20,
        marginLeft: 10,
        alignContent:'center',
        width:'97%'
    },
});