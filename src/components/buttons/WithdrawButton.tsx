import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FONTS, SIZES } from "../../styles/fonts/fonts";
import COLORS from "../../styles/colors/colors";

const WithdrawButton = (props) => {

   const title: string = props.title;
   const onPressHandle = props.onPressHandler; 
   
  return (
      <Pressable
            onPress={onPressHandle}
            style={styles.button}
            >
                <LinearGradient
                    colors={["#133FDB", "rgba(183, 0, 77, 0.3)"]}
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

export default WithdrawButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    borderRadius: (SIZES.width * 0.14) / 2,
    height: 38,
    minWidth: 150,
  },
  buttonText: {
    ...FONTS.body8,
    color: COLORS.white,
    alignSelf: 'center'
  }
});
