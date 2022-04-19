import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { FONTS } from "../../styles/fonts/fonts";
import COLORS from "../../styles/colors/colors";

const CopyButton = ({ onPress, text }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={{ ...FONTS.body8, color: COLORS.primary }}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CopyButton;

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    height: 29,
    width: 68,
    borderRadius: 8,
  },
  grandient: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
});
