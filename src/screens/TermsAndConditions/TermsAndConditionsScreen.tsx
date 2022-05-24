import React from "react";
import { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import DefaultButton from "../../components/buttons/DefaultButton";
import HeaderTitle from "../../components/HeaderTitle";
import ScreenComponent from "../../containers/ScreenComponent";
import { IStackScreenProps } from "../../navigation/StackScreenProps";
import COLORS from "../../styles/colors/colors";
import { FONTS, SIZES } from "../../styles/fonts/fonts";
import CodeInputComponent from "../Attestation/AttestationCodeConfirmationScreen/CodeInputComponent";

/**
 * 
 * @param props Screen properties.
 * @returns 
 */
const TermsAndConditionsScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  
  const { navigation, route } = props;

  const accept = () => {
    console.log("Accept T & C")
    navigation.navigate("EnterPin")
  };


  return (
    <ScreenComponent>

      <View style={styles.textContainer}>

          <Text style={styles.title}>
            Terms &amp; Conditions
          </Text>

          <Text style={styles.bodyTxt}>
            In order to use our services, please read and accept our User Agreement and Terms by blicking the accept button below. 
          </Text>

          <Text style={styles.subTitle}>
            Data and Privacy
          </Text>

          <Text style={styles.bodyTxt}>
          By joining this network, you give us permission to collect anonymous information about your use of the app. Additionally, if you connect your phone number, a hashed copy of it will be stored on the Celo network. If you grant Wakala access to your contact list, Wakala will import each contact's name and phone number to allow users to connect through the Wakala app. To learn how we collect and use this information please review our Privacy Policy.           </Text>

          <Text style={styles.subTitle}>
          Celo Dollar and Wakala Account
          </Text>

          <Text style={styles.bodyTxt}>
          When you create an "account" with Wakala you are creating a digital wallet to which only you hold the keys. No other person or entity, including Wakala, can recover your key, change or undo transactions, or recover lost funds. Be aware that cUSD are part of a new asset class and present the risk of financial loss. Carefully consider your financial circumstances and tolerance for financial risk before purchasing any asset. You can only send up to 1000 cUSD per day through Wakala (the "Daily Limit"). You must contact support@wakala.xyz and provide additional, personal information to request increasing this Daily Limit. There could be a delay to conduct required compliance          </Text>

      </View>
      
      <DefaultButton onPress={accept} style={styles.button} text="Accept"/>
      
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 0.6,
    marginHorizontal: SIZES.width * 0.09,
    marginVertical: SIZES.height * 0.1
  },
  button: {
    width: SIZES.width * 0.6
  },
  title: {
    ...FONTS.displayBold,
    color: COLORS.primary
  },
  bodyTxt: {
    ...FONTS.s3,
    width: SIZES.width * 0.8,
    marginBottom: 20,
    color: COLORS.textColor2
  },
  subTitle: {
    ...FONTS.h5,
    color: COLORS.primary,
  },
});

export default TermsAndConditionsScreen;
