import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View,Alert } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { FONTS } from "../../styles/fonts/fonts";
import COLORS from '../../styles/colors/colors';
import ScreenComponent from '../../containers/ScreenComponent';
import KeyPad from '../../components/buttons/KeyPad'
import { IStackScreenProps } from '../../navigation/StackScreenProps';
import { useDispatch, useSelector } from 'react-redux';
import { confirmedPin, createAccount, enterPin, pinMismatch }  from '../../store/Auth';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import NavHeader from '../../containers/NavHeader';

const ConfirmPin: React.FunctionComponent<IStackScreenProps> = (props) =>  {

   const navigation = props.navigation;
   const initPin = ["", "", "", "", "", ""];
   const dispatch = useDispatch();
   const prevPin = useSelector((state: any) => state.auth.pin);
   const created = useSelector((state: any) => state.auth);
   const confirmed = useSelector((state: any) => state.auth.pinConfirmed);

  useEffect(() => {
    connectPhoneNumber();
  }, [created.keys.publicKey]);

   const [pinCharArray, setPinTextArray] = useState(initPin);
  // The current index of the pin number entry.
   const [currentIndex, setCurrentIndex] = useState(0);

   useEffect(() => {
    setPinTextArray(initPin);
    setCurrentIndex(0);
  }, []);

  const handleChange = async (valPin) => {
    if (currentIndex < 6) {
      pinCharArray[currentIndex] = valPin;
      setCurrentIndex(currentIndex + 1);

      if (currentIndex == 5) {
        const pin = pinCharArray.join("");
        if (pin != prevPin) {
          dispatch(confirmedPin("PINs do not match"));
          navigation.navigate("EnterPin");
        }else {
          dispatch(createAccount(pin));
        } 
      }
    } else {
      navigation.navigate("EnterPin");
    }
  }

  const connectPhoneNumber = () => {
    if ((created.keys.pin == prevPin) 
      && created.keys.publicKey) {
        //Reset pin
        dispatch(enterPin(""));
      navigation.navigate("SetupRecovery");
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
      <NavHeader
          hideBackButton={false}
          showTitle={true}
          newTitle="Step 3 of 8"
      />
      {confirmed 
          ? <Text style={styles.pinError}>{confirmed}</Text> 
          : <Text style={styles.pinError}></Text>}
     <View style={styles.enterPin}>
     <Text style={styles.pinText}>Confirm PIN</Text>
    </View>
     <View style={styles.pinIcons}>
       {pinCharArray.map((text, index)=>
        <View key={index} style={styles.pinContainer}>
          {pinCharArray[index] == "" ?<Text style={styles.starText}></Text>: <Text style={styles.starText}>
            {pinCharArray[index] ? '*' : ''}
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

export default ConfirmPin;

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
  pinError:{
    marginTop: 20,
    ...FONTS.body2,
    color: COLORS.error,
    textAlign: "center",
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