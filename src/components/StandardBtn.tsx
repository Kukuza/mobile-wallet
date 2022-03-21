import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FONTS } from "../styles/fonts/fonts";
const StandardBtn = ({ onPress, style, colors, text }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <LinearGradient colors={colors} style={style}>
          <Text style={{ color: "#ffffff" }}>{text}</Text>
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
    // width: 150,
    justifyContent: "center",
    alignItems: "center",
  },
});
