import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FONTS } from "../../../styles/fonts/fonts";
import COLORS from "../../../styles/colors/colors";
const SecondaryButton = ({ onPress, style, text, }) => {
  return (
    <View  style={styles.container}>
      <TouchableOpacity onPress={onPress}  style={styles.button}>
        <LinearGradient
          colors={COLORS.secondarybuttonGradient}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.grandient, style]}
        >
          <Text style={{ ...FONTS.h4, color: COLORS.white }}>{text}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  grandient: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp("50%"),
    flexDirection: "row",
    height:hp("6.89%"),
  },
});
