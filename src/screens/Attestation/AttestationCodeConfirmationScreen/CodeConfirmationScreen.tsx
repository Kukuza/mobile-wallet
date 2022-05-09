import { StyleSheet, View, Text, Pressable } from "react-native";
import ScreenComponent from "../../../containers/ScreenComponent";
import { FONTS, SIZES } from "../../../styles/fonts/fonts";
import { IStackScreenProps } from "../../../navigation/StackScreenProps";
import React, { useState } from "react";
import HeaderTitle from "../../../components/HeaderTitle";
import DefaultButton from "../../../components/buttons/DefaultButton";
import COLORS from '../../../styles/colors/colors';
import CodeInputComponent from "./CodeInputComponent";

/**
 * 
 * @param props Screen properties.
 * @returns 
 */
const CodeConfirmationScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  
  const { navigation, route } = props;

  const [modalVisible, setModalVisible] = useState(false);

  /**
   * Skip button handler.
   */
  const skipHandler = () => {
    console.log("skip handler")
  }

  /**
   * Back button handler.
   */
  const backButtonHandler = () => {
    console.log("back handler")
  }


  const continueHandler = () => {
    navigation.navigate("AttestationLoaderScreen");
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const openModal = () => {
    setModalVisible(true)
  };


  return (
    <ScreenComponent>

      <HeaderTitle skipAction={skipHandler} backButtonHandler={backButtonHandler} skipButton={true} additionalStyling={styles.headerStyling}/>
      
      <View style={styles.textContainer}>

          <Text style={styles.title}>
            Verify
          </Text>

          <Text style={styles.bodyTxt}>
          
            We sent three codes to <Text style={{ ...FONTS.body5 }}> +254 706 111 427,</Text>
            {"\n"} 
            please enter them below
          </Text>

        <CodeInputComponent inputLabel="Code 1"/>

          <CodeInputComponent inputLabel="Code 2"/>

          <CodeInputComponent inputLabel="Code 3"/>
      </View>
      
      <View style={styles.buttonContainer}>

          <Pressable onPress={openModal}>
            <Text style={styles.footerTxt}>
            Resend all messages
            </Text>
          </Pressable>
      </View>

    </ScreenComponent>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 0.9,
    marginHorizontal: SIZES.width * 0.09
  },

  buttonContainer: {
    flex: 0.2,
    justifyContent: 'space-evenly',
    marginHorizontal: SIZES.width * 0.09,
    alignItems: 'center'
  },
  button: {
    width: SIZES.width * 0.6
  },
  title: {
    ...FONTS.displayBold,
    color: COLORS.primary,
    width: SIZES.width * 0.5
  },
  bodyTxt: {
    ...FONTS.headline,
    width: SIZES.width * 0.8,
    marginBottom: 20
  },
  footerTxt: {
    ...FONTS.body5,
    color: COLORS.primary
  },
  headerStyling: {
    paddingHorizontal: SIZES.width * 0.09,
    paddingTop: SIZES.width * 0.05
  },
});

export default CodeConfirmationScreen;
