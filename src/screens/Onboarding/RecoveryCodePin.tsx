import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { FONTS } from "../../styles/fonts/fonts";
import COLORS from '../../styles/colors/colors';
import ScreenComponent from '../../containers/ScreenComponent';
import KeyPad from '../../components/buttons/KeyPad'
import { IStackScreenProps } from '../../navigation/StackScreenProps';
import { useDispatch, useSelector } from 'react-redux';
import { getMnemonic }  from '../../store/Auth';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import NavHeader from '../../containers/NavHeader';

const RecoveryCodePin: React.FunctionComponent<IStackScreenProps> = (props) =>  {

  const dispatch = useDispatch();
  const initPin = ["", "", "", "", "", ""];
  const navigation = props.navigation;
   //Contains the pin number text as an array.
   const [pinCharArray, setPinTextArray] = useState(initPin);
  // The current index of the pin number entry.
   const [currentIndex, setCurrentIndex] = useState(0);
   const recoveryPhrase = useSelector((state: any) => state.auth.recoveryPhrase);

   useEffect(() => {
    setPinTextArray(initPin);
    setCurrentIndex(0);
  }, []);

  //  Handles the change on the pin number input form the custom keypad.
  const handleChange = async (valPin) => {
    if (currentIndex < 6) {
      pinCharArray[currentIndex] = valPin;
      setCurrentIndex(currentIndex + 1);
      
      if (currentIndex == 5) {
        const pin = pinCharArray.join("");
        dispatch(getMnemonic(pin))
      }
    } else {
      navigation.navigate("SetupRecoveryInfo");
    }
  }

  useEffect(() => {
    viewRecovveryPhrase();
  }, [recoveryPhrase]);

  const viewRecovveryPhrase = () => {
    if (recoveryPhrase) 
      navigation.navigate("ViewRecoveryCode");
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
      <NavHeader
          hideBackButton={false}
          showTitle={false}
          newTitle="Step 4 of 8"
      />
      <View style={styles.enterPin}>
      <Text style={styles.pinText}>Enter PIN</Text>
      </View>
      <View style={styles.pinIcons}>
        {pinCharArray.map((text, index)=>
          <View key={index} style={styles.pinContainer}>
            {pinCharArray[index] == "" ?<Text style={styles.starText}></Text>: <Text style={styles.starText}>
              {pinCharArray[index] ? '*' : ""}
              </Text>}
          </View> 
          )}
      </View>
      <View style={styles.keyPad}>
      <KeyPad onChange={handleChange} onDelete={onDelete} />
      </View>
    </ScreenComponent>
  )
}

export default RecoveryCodePin;

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