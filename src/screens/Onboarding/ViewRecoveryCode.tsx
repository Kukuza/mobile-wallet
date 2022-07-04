import { StyleSheet, View, Text, Pressable, Modal, Alert, TextInput } from "react-native";
import ScreenComponent from "../../containers/ScreenComponent";
import { FONTS, SIZES } from "../../styles/fonts/fonts";
import { IStackScreenProps } from "../../navigation/StackScreenProps";
import React, { useEffect, useState } from "react";
import DefaultButton from "../../components/buttons//MainButtons/DefaultButton";
import COLORS from '../../styles/colors/colors';
import NavHeader from "../../containers/NavHeader";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useSelector } from "react-redux";
import AcceptRadio from "../../components/cards/AcceptRadio";
import ModalAboutRecoveryPhrase from "../../components/modals/ModalAboutRecoveryPhrase";

const ViewRecoveryCode: React.FunctionComponent<IStackScreenProps> = (props) => {
  
  const { navigation, route } = props;
  const [phraseWritten, setPhraseWritten] = React.useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const recoveryPhrase = useSelector((state: any) => state.auth.recoveryPhrase);

  //TODO: toggle phraseWritten to enable Continue button

  const continueHandler = () => {
    confirmRecovveryPhrase();
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const openModal = () => {
    setModalVisible(true)
  };

  const confirmRecovveryPhrase = () => {
    if (recoveryPhrase) {
      //TODO: add recovery confirmation screens
      navigation.navigate("RecoveryPhraseSaved");
    }else {
      navigation.navigate("RecoveryCodePin");
    }
  }

  return (
    <ScreenComponent>
      <NavHeader
          hideBackButton={true}
          showTitle={true}
          newTitle="Step 5 of 8"
      />
      <View style={styles.container}>
        <Text style={styles.title}>Write down your recovery phrase</Text>
        <Text style={styles.titleDescription}>
          Here is your recovery phrase. 
          Write it down and store in a safe place. Do not save it in your phone or your email.
        </Text>
        <Text style={styles.text}>{recoveryPhrase}</Text>
        <View style={styles.accept}>
          <AcceptRadio 
                  text="Yes, I have written my phrase"
                  imgSrc={0} 
                  code={true}
                  handleSelect={continueHandler} /> 
        </View>
      </View>
      <View style = {{justifyContent: 'center'}}>
        <DefaultButton onPress={continueHandler} style={styles.button} text="Continue" />

        <Pressable onPress={openModal}>
            <Text style={styles.footer}>
              Learn about your recovery phrase
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
        <ModalAboutRecoveryPhrase handleAction={closeModal}  />
      </Modal>
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    justifyContent: "center",
    height: SIZES.height,
    marginTop: hp("5%"),
     marginHorizontal: wp("8%")
  },
  title: {
    ...FONTS.body1,
    color: COLORS.black,
    fontWeight: "bold",
    textAlign: "center"
  },
    titleDescription: {
      ...FONTS.body4,
      textAlign: "center",
      color: COLORS.textDarkBlue,
      marginVertical:hp("2%")
  },
  text: {
    height: hp("25%"),
    backgroundColor: '#fff',
    marginTop: hp("4%"),
    padding: 25,
    borderRadius: 15,
    ...FONTS.body1,
  },
  accept: {
    marginTop: hp("4%"),
    ...FONTS.body1,
  },
  button: {
    width:wp("76%"),
    height:hp("6%"),
    marginVertical:hp("2%")
},
footer: {
  ...FONTS.body5,
  marginTop:hp("5%"),
  textAlign: "center",
  color: COLORS.primary
},
});

export default ViewRecoveryCode;