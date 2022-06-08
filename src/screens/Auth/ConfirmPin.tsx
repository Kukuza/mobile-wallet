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
import { createKeystore } from '../../redux/auth/authSlice';
import { retrieveStoredItem } from '../../redux/auth/session.key.storage.utils';
import { encryptPasswordWithNewMnemonic, getAccountFromMnemonic, getStoredMnemonic } from '../../redux/auth/auth.utils';
import WakalaContractKit from '../../utils/Celo-Integration/WakalaContractKit';

const ConfirmPin: React.FunctionComponent<IStackScreenProps> = (props) =>  {

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
        // Perform account creation and encryption.
        const pin = pinCharArray.join("")
        // dispatch(createKeystore(pin));
        const encryptedMnemonic = await retrieveStoredItem("mnemonic");

        // Instantiate wakala contract kit.
        if (encryptedMnemonic) {
          const mnemonic = await getStoredMnemonic(pin);
          const keys = await getAccountFromMnemonic(mnemonic ?? "");
          WakalaContractKit.createInstance(keys.privateKey);
          console.log("Your public address is: ", keys.address);
        } else {
          await encryptPasswordWithNewMnemonic(pin);
          const mnemonic = await getStoredMnemonic(pin);
          const keys = await getAccountFromMnemonic(mnemonic ?? "");
          WakalaContractKit.createInstance(keys.privateKey);
          console.log("Your public address is: ", keys.address);
        }

        //TODO: confirm pin screen should follow
        navigation.navigate("ConnectYourPhoneNumberScreen");
        //navigation.navigate("ConfirmPin");
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
    <Feather name="chevron-left" size={32} color={COLORS.primary} />
    </TouchableOpacity>
     <View style={styles.enterPin}>
     <Text style={styles.pinText}>Confirm PIN</Text>
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

export default ConfirmPin;

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
pinContainer:{
  display:'flex',
  flexDirection: 'row',
  width:40,
  height:40,
  backgroundColor:COLORS.keyPadTextBackGround,
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
  ...FONTS.h5,
  fontSize: 24,
  color: COLORS.primary,
  fontWeight:'bold',
  alignSelf:"center",
}
})