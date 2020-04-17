import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { View } from 'react-native';
export default function headers ({navigation}){
    const abreMenu=()=>{
        navigation.openDrawer()
    }

    
    return(
        <View>
            <Icon name="bars" size={30} style={{padding:10}} onPress={abreMenu}/>
        </View>
    )
}
