import { StyleSheet, Text, View, Button, Alert, NativeSyntheticEvent, NativeTouchEvent, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTS, SIZES } from "../styles/theme";

const WakalaBtn2 = (props) => {

   const title: string = props.title;
   const onPressHandle = props.onPressHandler; 
   
  return (
      <Pressable
            onPress={onPressHandle}
            style={styles.button}
            >
                <LinearGradient
                    colors={COLORS.wakalaBtn2LinearGradient}
                    start={{ x: 0.2, y: -1.0 }}
                    end={{ x: 0.3, y: 1.1 }}
                    locations={[0.1, 1.5]}
                style={styles.button}
                >
                
                    <Text style={styles.buttonText} >{title}</Text>
            </LinearGradient>
        </Pressable>
  );
};

export default WakalaBtn2;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    borderRadius: (SIZES.width * 0.14) / 2,
    height: 38,
    minWidth: 150,
  },
  buttonText: {
    ...FONTS.buttonTitle,
  }
});
