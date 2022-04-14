import React, {useState} from 'react'
import KeyPad from '../../../components/buttons/KeyPad';
import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View, Image } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { FONTS } from "../../../styles/fonts/fonts";
import COLORS from '../../../styles/colors/colors';
import ScreenComponent from '../../../containers/ScreenComponent';
export default function EnterPin() {
   let pinText=["1","2","3","4"]
   const [pin, setPin] = useState('');

   function handleChange(valPin) {
    setPin(valPin);
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
       {pinText.map((text, index)=>
        <View key={index} style={styles.PinContainer}>
          {pinText[index] != "" ?<Text style={styles.starText}>*</Text>:null}
        </View> 
        )}
       
    </View>
    <View style={styles.keyPad}>
    <KeyPad value={pin} onChange={handleChange} />
    </View>
      
    </ScreenComponent>
  )
}

const styles = StyleSheet.create({
navIcon:{
marginTop: "7%",
marginLeft: '8%',
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
marginTop:'15%',
alignItems:'center',
justifyContent:'center',
display:'flex',
flexDirection: 'row',
},
keyPad:{
    marginBottom:'5%',
    marginTop:"15%",
    marginHorizontal:'10%',
},
PinContainer:{
  display:'flex',
  flexDirection: 'row',
  width:40,
  height:40,
  backgroundColor:COLORS.white,
  justifyContent:'center',
  alignItems:'center',
  borderRadius:10,
  marginHorizontal:RFPercentage(0.5)
},
iconImage:{
  width:20,
  height:20,
  resizeMode:'contain',
  
},
starText:{
  ...FONTS.displayBold,
    color: COLORS.textColor4,
    fontWeight:'bold',
    alignSelf:"center",
    fontSize:RFPercentage(6),
    marginTop:12,
}
})