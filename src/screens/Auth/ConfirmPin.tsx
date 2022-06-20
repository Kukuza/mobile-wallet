import React, {useEffect, useState} from 'react'
import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View,TouchableOpacity, Alert } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { FONTS } from "../../styles/fonts/fonts";
import COLORS from '../../styles/colors/colors';
import ScreenComponent from '../../containers/ScreenComponent';
import KeyPad from '../../components/buttons/KeyPad'
import { IStackScreenProps } from '../../navigation/StackScreenProps';
import { useDispatch, useSelector } from 'react-redux';
import { createAccount, storePublicAddress }  from '../../store/Auth';
import { getProfile } from '../../store/Profile';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { MNEMONIC_STORAGE_KEY, getStoredMnemonic, getAccountFromMnemonic, encryptPasswordWithNewMnemonic } from '../../redux/auth/auth.utils';
import { retrieveStoredItem } from '../../redux/auth/session.key.storage.utils';
import WakalaContractKit from '../../utils/Celo-Integration/WakalaContractKit';
import { AttestationUtils } from '../../utils/attestation.utils';

const ConfirmPin: React.FunctionComponent<IStackScreenProps> = (props) =>  {

   const navigation = props.navigation;
   const dispatch = useDispatch();
   const prevPin = useSelector((state: any) => state.auth.pin);

   useEffect(() => {dispatch(getProfile())}, []);

   const [pinCharArray, setPinTextArray] = useState(["", "", "", "", "", ""]);
  // The current index of the pin number entry.
   const [currentIndex, setCurrentIndex] = useState(0);

  const handleChange = async (valPin) => {
    if (currentIndex < 7) {
      pinCharArray[currentIndex] = valPin;
      setCurrentIndex(currentIndex + 1);

      if (currentIndex == 5) {
        const pin = pinCharArray.join("");
        if (pin != prevPin) {
          //TODO: replace with Modal
          pinMismatchAlert();
          navigation.navigate("EnterPin");
        }else {
          // dispatch(createAccount(pin));
          await createAccount(pin);
          // navigation.navigate("ConnectYourPhoneNumberScreen");
        } 
      }
    } else {
      // unlikely path.
      navigation.navigate("ConfirmPin");
    }
  }

  const createAccount = async (pin: string) =>{
    const encryptedMnemonic = await retrieveStoredItem(MNEMONIC_STORAGE_KEY);
    let keys: any;

    if (encryptedMnemonic) {
        const mnemonic = await getStoredMnemonic(pin);
        keys = await getAccountFromMnemonic(mnemonic ?? "");
        WakalaContractKit.createInstance(keys.privateKey);
    }else {
        await encryptPasswordWithNewMnemonic(pin);
        const mnemonic = await getStoredMnemonic(pin);
        keys = await getAccountFromMnemonic(mnemonic ?? "");
        WakalaContractKit.createInstance(keys.privateKey);
    }

    await storePublicAddress(keys.address);
    const attestationUtil = new AttestationUtils(keys.privateKey);
    // await attestationUtil.init();

  }
  
  const pinMismatchAlert = () =>
    Alert.alert(
      "PIN mismatch", 
      "Please try again", 
      [{ text: 'Ok' }]
    );

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