import { StyleSheet, View, Text, Pressable, Modal, TouchableOpacity } from "react-native";
import ScreenComponent from "../../../containers/ScreenComponent";
import { IStackScreenProps } from "../../../navigation/StackScreenProps";
import React, { useState } from "react";
import HeaderTitle from "../../../components/HeaderTitle";
import DefaultButton from "../../../components/buttons/DefaultButton";
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
  const cancelButtonHandler = () => {
    navigation.navigate("ConnectYourPhoneNumberScreen");
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const openModal = () => {
    setModalVisible(true)
  };

  return (
    <ScreenComponent>
      <View style={styles.container}>

        <SkipHeader cancelButtonHandler={cancelButtonHandler} skipButton={true} additionalStyling={styles.headerStyling}/>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Wave
              style={styles.waveBall}
              H={58}
              waveParams={[
                  {A: 15, T: 200, fill: '#454BC9'},
              ]}
              animated={true}
          />
          <Text style={styles.text}>
            58 %
          </Text>
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
});

export default AttestationLoaderScreen;
