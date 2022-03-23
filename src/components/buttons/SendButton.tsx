import { StyleSheet, Text, View, Button, Alert, NativeSyntheticEvent, NativeTouchEvent, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTS, SIZES } from "../../styles/theme";

const SendButton = (props) => {

   const title: string = props.title;
   const onPressHandle = props.onPressHandler; 
   
  return (
    <View>
        <Pressable
            onPress={onPressHandle}
            style={styles.button}
            >
                <LinearGradient
                    colors={COLORS.wakalaBtn1LinearGradient}
                start={{ x: 0, y: 1 }}
                end={{ x: 1.2, y: 1.4 }}
                locations={[0.09, 0.5754, 1]}
                style={styles.button}
                >
                  <Text style={styles.buttonText} >{title}</Text>
            </LinearGradient>
        </Pressable>
    </View>
  );
};

export default SendButton;

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
