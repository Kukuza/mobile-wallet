import React, {useState} from 'react'
import KeyPad from '../../../components/buttons/KeyPad';
import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Switch } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { FONTS } from "../../../styles/fonts/fonts";
import COLORS from '../../../styles/colors/colors';
import ScreenComponent from '../../../containers/ScreenComponent';
export default function EnterPin() {
   const [pin, setPin] = useState('');
  function onChange(){
    setPin(pin)
  }
  return (
    <ScreenComponent>
    <View style={styles.navIcon}>
    <Feather name="chevron-left" size={32} color={COLORS.primary} />
    </View>
     <View style={styles.enterPin}>
     <Text style={styles.pinText}>Enter Pin</Text>
    </View>
     <View style={styles.pinIcons}>
         <Text style={styles.pinTXT}>****</Text>
    </View>
    <View style={styles.keyPad}>
    <KeyPad onChange={onChange}/>
    </View>
      
    </ScreenComponent>
  )
}

const styles = StyleSheet.create({
navIcon:{
margin: '3%',
},
enterPin:{
marginTop:'30%',
alignItems:'center',
justifyContent:'center',
},
pinText:{
    ...FONTS.body2,
    color: COLORS.textColor4,
    fontSize: RFPercentage(3.2),
    fontWeight:'bold' 
},
pinIcons:{
marginTop:'20%',
alignItems:'center',
justifyContent:'center',
},
keyPad:{
    margin:'5%',
},
pinTXT:{
    ...FONTS.body1,
    color: COLORS.textColor4,
    fontSize: RFPercentage(4),
    fontWeight:'bold'
}
})