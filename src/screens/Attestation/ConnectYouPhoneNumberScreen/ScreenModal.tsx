import React from "react";
import COLORS from "../../../styles/colors/colors";
import { FONTS, SIZES } from "../../../styles/fonts/fonts";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ScreenModal = (props) => {
    return (
        <View style={styles.container}>
         <LinearGradient
              colors={COLORS.wakalaModalLinearGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1.5 }}
              style={styles.linearGradient}
              >
                    <View style={styles.txtSection}>
                        <Text style={styles.title}>
                            Phone Numbers and Wakala
                        </Text>

                        <Text style={styles.text}>
                            Confirming your phone number makes it easy to connect with your friends by allowing you to send and receive funds to your phone.
                        </Text>
                    </View>
                    
                    <View style={styles.txtSection}>
                        <Text style={styles.title}>
                            Can I do this later?
                        </Text>

                        <Text style={styles.text}>
                            Yes, but unconfirmed accounts can only send payment with QR codes or account addresses
                        </Text>
                    </View>
                   
                    <View style={styles.txtSection}>
                        <Text style={styles.title}>
                            Secure and Private
                        </Text>

                        <Text style={styles.text}>
                            Kukuza uses state of the art cryptography to keep your number private. 
                        </Text>
                    </View>
                   

                    <Pressable onPress={props.handleAction} style={styles.button}>
                        <Text style={styles.btnTxt}>Dismiss</Text>
                    </Pressable>

            </LinearGradient>
          </View>

    );
  };

const styles = StyleSheet.create({
    container: {
      height: SIZES.height * 0.9,
      justifyContent: 'space-evenly',
      alignSelf: 'center',
    },
    linearGradient: {
        borderRadius: 20, 
        shadowColor: COLORS.realBlack,
        shadowOpacity: 0.25,
        shadowRadius: 0,
        elevation: 24,
        width: SIZES.width * 0.9,
        height: SIZES.height * 0.75,
        justifyContent: 'space-evenly',
        alignItems: 'center',

    },  
    title: {
        ...FONTS.sh2,
        color: COLORS.textColor3,
        textAlign: "center",
    },
  
    text: {
        ...FONTS.headline,
        color: COLORS.textColor3,
        textAlign: "center",
    },

    txtSection: { 
        width: SIZES.width * 0.6,
        marginVertical: SIZES.height * 0.02 
    },
  
    button: {
      fontSize: 20,
      lineHeight: 24,
      color: COLORS.accent1,
      textAlign: "center",
      fontFamily: FONTS.sh1.fontFamily,
      marginTop: 60,
    },
    btnTxt: {
        ...FONTS.body5,
        color: COLORS.accent1
    },
  });

  export default ScreenModal;