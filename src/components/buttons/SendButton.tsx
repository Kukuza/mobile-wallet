import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FONTS, SIZES } from "../../styles/fonts/fonts";
import COLORS from "../../styles/colors/colors";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
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
                    colors={[
                      "#133FDB",
                      "rgba(20, 63, 218, 0.994943)",
                      "rgba(183, 0, 77, 0.3)",
                    ]}
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
    height:hp("4.7%"),
    width: 150,
  },
  buttonText: {
    ...FONTS.body8,
      color: COLORS.white,
      alignSelf: 'center'
  }
});
