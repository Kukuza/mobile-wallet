import { StyleSheet, View, Text, Pressable, Modal, Alert } from "react-native";
import ScreenComponent from "../../../containers/ScreenComponent";
import { FONTS, SIZES } from "../../../styles/fonts/fonts";
import { IStackScreenProps } from "../../../navigation/StackScreenProps";
import React, { useState } from "react";
import HeaderTitle from "../../../components/HeaderTitle";
import DefaultButton from "../../../components/buttons/DefaultButton";
import COLORS from '../../../styles/colors/colors';
import ScreenModal from "./ScreenModal";
import { encryptComment } from "../../../utils/commentEncryptionUtil";

/**
 * 
 * @param props Screen properties.
 * @returns 
 */
const ConnectYourPhoneNumberScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  
  const { navigation, route } = props;

  const [modalVisible, setModalVisible] = useState(false);

  /**
   * Skip button handler.
   */
  const skipHandler = () => {
    navigation.navigate("MyDrawer");
  }

  /**
   * Back button handler.
   */
  const backButtonHandler = () => {
    navigation.goBack()
  }


  const continueHandler = async () => {
    // navigation.navigate("AttestationLoaderScreen");
    const rst = await encryptComment("+254791725651", "0x2f254ceA58719E3AE7DF82E1117Ea7C1cE2Ce30d", "0x41B87470C3598740019c57f459FF4dbc36dC9311")
    console.log(rst);
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
          Connect Your Phone Number
        </Text>

        <Text style={styles.bodyTxt}>
          On Wakala you can send money directly to people's phone numbers. Therefore we need to connect your phone number to your wallet.
          {"\n"}
          {"\n"}
          To connect your number we will send you 3 SMS codes. The whole process will take about 3 minutes.
        </Text>
      </View>

      
      <View style={styles.buttonContainer}>

          <DefaultButton onPress={continueHandler} style={styles.button} text={"Connect"}></DefaultButton>

          <Pressable onPress={openModal}>
            <Text style={styles.footerTxt}>
              Do I need to connect my number?
            </Text>
          </Pressable>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      > 
        <ScreenModal handleAction={closeModal}  />
      </Modal>
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 0.5,
    justifyContent: 'space-between',
    marginHorizontal: SIZES.width * 0.09
  },

  buttonContainer: {
    flex: 0.6,
    justifyContent: 'space-evenly',
    marginHorizontal: SIZES.width * 0.09,
    marginTop: SIZES.height * 0.25,
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
    paddingTop: -SIZES.height * 0.5
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

export default ConnectYourPhoneNumberScreen;
