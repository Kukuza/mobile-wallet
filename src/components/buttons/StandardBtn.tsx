import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../styles/colors/colors";
import { FONTS } from "../../styles/fonts/fonts";

const StandardBtn = ({ onPress, style, colors, text }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <LinearGradient 
        colors={colors}
        start={{ x: 0, y: 1}}
        end={{ x: 1, y: 1.4 }}
        style={style}>
          <Text style={{...FONTS.h4, color: COLORS.white, alignSelf:"center" }}>{text}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default StandardBtn;

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",

  },
});
