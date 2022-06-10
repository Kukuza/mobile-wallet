import React, {useState} from 'react'
import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View,TouchableOpacity } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { FONTS } from "../../styles/fonts/fonts";
import COLORS from '../../styles/colors/colors';
import ScreenComponent from '../../containers/ScreenComponent';
import KeyPad from '../../components/buttons/KeyPad'
import { IStackScreenProps } from '../../navigation/StackScreenProps';
import { useDispatch } from 'react-redux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const EnterPin: React.FunctionComponent<IStackScreenProps> = (props) =>  {

  // navigation object.
   const navigation = props.navigation;
   const dispatch = useDispatch();
   //Contains the pin number text as an array.
   const [pinCharArray, setPinTextArray] = useState(["", "", "", "", "", ""]);
  // The current index of the pin number entry.
   const [currentIndex, setCurrentIndex] = useState(0);

  //  Handles the change on the pin number input form the custom keypad.
  const handleChange = async (valPin) => {
    if (currentIndex < 7) {
      pinCharArray[currentIndex] = valPin;
      setCurrentIndex(currentIndex + 1);

      if (currentIndex == 5) {
        //TODO: pass pin to the confirm screen for match validation
        const pin = pinCharArray.join("");
        navigation.navigate("ConfirmPin");
      }
    } else {
      // unlikely path.
      navigation.navigate("ConfirmPin");
    }
  }

  // Handles deletion on the custom keypad.
  const onDelete = () => {
    if (currentIndex > 0) {
      pinCharArray[currentIndex - 1] = "";
      setCurrentIndex(currentIndex - 1);
    }
  }

  return (
    <ScreenComponent>
    <TouchableOpacity style={styles.navIcon}
    onPress={() => navigation.goBack()}
    >
    <Feather name="chevron-left" size={Number(wp("6.5%"))} color={COLORS.primary} />
    </TouchableOpacity>
     <View style={styles.enterPin}>
     <Text style={styles.pinText}>Create a PIN</Text>
    </View>
     <View style={styles.pinIcons}>
       {pinCharArray.map((text, index)=>
        <View key={index} style={styles.pinContainer}>
          {pinCharArray[index] == "" ?<Text style={styles.starText}>*</Text>: <Text style={styles.starText}>{pinCharArray[index]}</Text>}
        </View> 
        )}
       
    </View>
    <View style={styles.keyPad}>
    <KeyPad onChange={handleChange} onDelete={onDelete} />
    </View>
    </ScreenComponent>
  )
}

export default EnterPin;

const styles = StyleSheet.create({
navIcon:{
  marginTop: hp("5%"),
  marginLeft: wp("5%"),
},
enterPin:{
  marginTop:hp("10%"),
  alignItems:'center',
  justifyContent:'center',
},
pinText:{
  ...FONTS.displayBold,
  color: COLORS.textColor4,
},
pinIcons:{
  marginVertical:hp("3%"),
  alignItems:'center',
  justifyContent:'center',
  display:'flex',
  flexDirection: 'row',
},
keyPad:{
  marginHorizontal:wp("10%"),
},
pinContainer:{
  display:'flex',
  flexDirection: 'row',
  width:wp("10.667%"),
  height:wp("10.667%"),
  backgroundColor:COLORS.keyPadTextBackGround,
  justifyContent:'center',
  alignItems:'center',
  borderRadius:wp("2.667%"),
  marginHorizontal:RFPercentage(0.5)
},
starText:{
  ...FONTS.h3,
  color: COLORS.primary,
  alignSelf:"center",
}
})