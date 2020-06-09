import React from 'react';
import Icon from '@expo/vector-icons/AntDesign';
import { View, Keyboard } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const Secundary_Header= ({navigation})=>{
    const abreMenu=()=>{
        Keyboard.dismiss()
        navigation.replace('Principal')
    }
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Principal' })],
    });
    return(
        <View>
            <Icon name="closecircleo"  size={30} style={{padding:5,marginLeft:wp(5),marginTop:wp(-1),color:'red'}} onPress={()=>navigation.replace(resetAction)}/>
        </View>
    )
}
export default Secundary_Header