import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
  import { LinearGradient } from "expo-linear-gradient";
  import { FONTS } from "../../styles/fonts/fonts";
import COLORS from "../../styles/colors/colors";
  const DefaultButton = ({ onPress, style, text }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <LinearGradient 
              colors={["rgba(19, 63, 219, 1)", "rgba(183, 0, 76, 0.3)"]}
              start={{ x: 0.1, y: 0 }}
              end={{ x: 0.99, y: 0 }}
              locations={[-2.5, 1.5]}
              style={[styles.grandient, style]}
            >
            <Text style={{ ...FONTS.h4, color: COLORS.white }}>{text}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default DefaultButton;
  
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
    grandient: {
      justifyContent: "center",
      alignItems: "center",
      height: 56,
      borderRadius: 50,
      flexDirection: "row",
    }
  });
  