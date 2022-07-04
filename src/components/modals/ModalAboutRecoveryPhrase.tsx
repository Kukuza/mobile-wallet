import React from "react";
import COLORS from "../../styles/colors/colors";
import { FONTS, SIZES } from "../../styles/fonts/fonts";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ModalAboutRecoveryPhrase = (props) => {
    return (
        <View style={styles.container}>
         <LinearGradient
              colors={COLORS.wakalaModalLinearGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1.5 }}
              style={styles.linearGradient}>
                    <View style={styles.txtSection}>
                        <Text style={styles.title}>
                            Your recovery phrase
                        </Text>
                        <Text style={styles.text}>
                        Your recovery phrase is the most important part of your account 
                        </Text>
                    </View>
                    <View style={styles.txtSection}>
                        <Text style={styles.title}>
                            Without your recovery phrase, you can lose access forever
                        </Text>
                        <Text style={styles.text}>
                          If you lose your phone, you must have your recovery phrase to get your account back. Nobody not even Kukuza, 
                          will be able to recover your funds without it. 
                        </Text>
                    </View>
                    <View style={styles.txtSection}>
                        <Text style={styles.title}>
                           Write it down, and keep it private
                        </Text>
                        <Text style={styles.text}>
                          Anyone with your phrase will have access to your account and all its funds. Don't share it with others.
                        </Text>
                    </View>
                    <Pressable onPress={props.handleAction} style={styles.button}>
                        <Text style={styles.buttonText}>Dismiss</Text>
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
    buttonText: {
        ...FONTS.body5,
        color: COLORS.accent1
    },
  });

  export default ModalAboutRecoveryPhrase;