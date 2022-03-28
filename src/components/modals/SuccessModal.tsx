import { StyleSheet, Text, View, Pressable, Image, Alert } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../styles/colors/colors";
import { FONTS, SIZES } from "../../styles/fonts/fonts";
import { Ionicons } from "@expo/vector-icons";

/**
 * 
 * @param props {
 *      title: Modal title,
        message: Message title,
        btnText: button text,
        imageSrc: the image file to be displayed,
 *      onPressHanlder: the action to be taken on pressing the button.
 * }
 * @returns large modal component.
 */
const SuccessModal = (props) => {

  return (
        <View style={styles.container}>
          <LinearGradient
              colors={COLORS.wakalaModalLinearGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1.5 }}
              style={styles.linearGradient}
              >
                  <View style={props.contentDivStyle}>
                      
                      <Ionicons name="checkmark-circle" size={34} color="black" style={styles.icons}/>

                      <Text style={styles.modalTitle}>{props.title}</Text>
                      <Text style={styles.modalMessage}>{props.message}</Text>

                      <Pressable onPress={props.onPressHanlder}>
                          <Text style={styles.pressableText}>{props.btnText}</Text>
                      </Pressable>

                  </View>
                  
          </LinearGradient>
        </View>
  );
};

export default SuccessModal;

/**
 * Default handler method for on onEnd.
 */
 const handler = async () => {
  Alert.alert("Pass handler method on prop (onPressHanlder) and (imageSrc)")
}

/**
* Default values for expected props.
* @title the title of the button.
* @message the modal message.
* @btnText the buttons text.
* @imageSrc the image source.
* @handleAction the method to be executed on onEnd call.
*/
SuccessModal.defaultProps = {
    title: "Prop {title}",
    message: "Prop {message}",
    btnText: "Prop {btnText}",
    imageSrc: require("../../assets/images/modals/Connectivity.png"),
    onPressHanlder: handler
  }

const styles = StyleSheet.create({
  container: {
    alignSelf: 'baseline'
  },
  linearGradient: {
      borderRadius: 20, 
      shadowColor: COLORS.realBlack,
      shadowOpacity: 0.25,
      shadowRadius: 0,
      elevation: 24,
      width: SIZES.width,
      paddingBottom: 58,
      paddingTop: 168,
      alignSelf: 'flex-end',
      height: SIZES.height * 0.598522167,
  },
  contentDivStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center', 
  },
  icons: {
    alignSelf: 'center',
    marginBottom: 36,
    color: COLORS.primary, 
  },
  modalTitle: {
    ...FONTS.body3,
    alignSelf: 'center',
    marginBottom: 26,
    color: COLORS.primary, 
  },
  pressableText: {
    ...FONTS.h1,
    color: COLORS.primary, 
    alignSelf: 'center'
  },
  modalMessage: {
    ...FONTS.headline,
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 70,
    width: SIZES.width * 0.7,
  },
});
