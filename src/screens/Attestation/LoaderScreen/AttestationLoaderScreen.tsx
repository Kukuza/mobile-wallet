import { StyleSheet, View, Text, Pressable, Modal, TouchableOpacity } from "react-native";
import ScreenComponent from "../../../containers/ScreenComponent";
import { IStackScreenProps } from "../../../navigation/StackScreenProps";
import React, { useEffect, useRef, useState } from "react";
import HeaderTitle from "../../../components/HeaderTitle";
import DefaultButton from "../../../components/buttons/MainButtons/DefaultButton";
import COLORS from '../../../styles/colors/colors';
import Wave from "react-native-waveview";
import { FONTS, SIZES } from '../../../styles/fonts/fonts';
import SkipHeader from "../../../components/SkipHeader";
import ScreenModal from "./ScreenModal";

/**
 * 
 * @param props Screen properties.
 * @returns 
 */
const AttestationLoaderScreen: React.FunctionComponent<IStackScreenProps> = (props) => {

  const { navigation, route } = props;
  const phoneNumber: string = route?.params?.phoneNumber;

  // The number of seconds expected for the loader to load.
  const loaderMaxTime = 120;
  const waveRef = useRef<any>();

  const [modalVisible, setModalVisible] = useState(false);
  const [timerProgress, setTimerProgress] = useState(0);
  const [timerProgressPercentage, setTimerProgressPercentage] = useState(0);
  const [startedAttestationProcess, setStatedAttestationLogic] = useState(false);
  const [displayMessage, setDisplayMessage] = useState("Connecting phone number...");


  /**
   * Skip button handler.
   */
  const skipHandler = () => {
    console.log("skip handler")
  }

  /**
   * Back button handler.
   */
  const cancelButtonHandler = () => {
    navigation.navigate("ConnectYourPhoneNumberScreen");
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const openModal = () => {
    setModalVisible(true)
  };

  const myTimeout = setTimeout(function() {incrementProgress(false)}, 1000);

  useEffect(() => {
    if (!startedAttestationProcess) {
      setStatedAttestationLogic(true);
      startAttestation();
    }
    
    return () => {
      // Anything in here is fired on component unmount.
      clearTimeout(myTimeout);
    }
  });

  const startAttestation = () => {
    console.log("startAttestation () ==> phoneNumber", phoneNumber);
    setTimeout(function () { 
      incrementProgress(true);
      navigation.navigate("AttestationCodeConfirmationScreen", {phoneNumber: phoneNumber})
    }, 30000);
  }

  // perform progress loader increment and do the necessary actions.
  const incrementProgress = (isDone: boolean) => {
    if (timerProgress <= loaderMaxTime) {
      if (isDone) {
        
        setTimerProgress(loaderMaxTime);
        setTimerProgressPercentage(100);
        clearTimeout(myTimeout);
      } else {
        setTimerProgress(timerProgress + 1);
        setTimerProgressPercentage(Math.round(timerProgress/loaderMaxTime * 100));
      }
    } else {
      clearTimeout(myTimeout);
    }

    if (timerProgressPercentage % 3 == 0) {
      setDisplayMessage("Connecting phone number...")
    } else {
      setDisplayMessage("Please don’t leave this screen or you will have to restart.")
    }
    waveRef.current.setWaterHeight(timerProgressPercentage);
  }

  

  return (
    <ScreenComponent>
      <View style={styles.container}>

        <SkipHeader cancelButtonHandler={cancelButtonHandler} skipButton={true} additionalStyling={styles.headerStyling}/>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Wave
              ref={waveRef}
              style={styles.waveBall}
              H={0}
              waveParams={[
                  {A: 15, T: 110, fill: COLORS.primary},
              ]}
              animated={true}
          />
          <Text style={styles.text}>
            {timerProgressPercentage} %
          </Text>

          <Text style={styles.displayMessage}>{displayMessage}</Text>
        </View>
       


        <Pressable onPress={openModal}>
            <Text style={styles.footerTxt}>
              Learn More
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
    container: {
          flex: 1,
          marginVertical: 10,
          paddingBottom: SIZES.height * 0.03,
          justifyContent: 'space-between',
          alignItems: 'center',
      },
      wave: {
          width: SIZES.height * 0.09,
          aspectRatio: 1,
          overflow: 'hidden',
          backgroundColor: 'white',
      },
      waveBall: {
          width: SIZES.height * 0.09,
          aspectRatio: 1,
          borderRadius: SIZES.height * 0.045,
          overflow: 'hidden',
      },
      text: {
        ...FONTS.body5,
        color: COLORS.accent1
      },
      headerStyling: {
        paddingHorizontal: SIZES.width * 0.09,
        paddingTop: SIZES.width * 0.05
      },

      footerTxt: {
        ...FONTS.body5,
        color: COLORS.primary
      },
      displayMessage: {
        ...FONTS.body9,
        color: COLORS.primary,
        marginTop: 20
      }
});

export default AttestationLoaderScreen;
