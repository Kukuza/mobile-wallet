import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { FONTS, SIZES } from "../../../styles/fonts/fonts";
import COLORS from "../../../styles/colors/colors";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const NoOutline = (props) => {

   const title: string = props.title;
   const onPressHandle = props.onPressHandler; 
   
  return (
    <View>
        <Pressable
            onPress={onPressHandle}
            style={styles.button}
            >
                  <Text style={styles.buttonText} >{title}</Text>
        </Pressable>
    </View>
  );
};

export default NoOutline;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    borderRadius: (SIZES.width * 0.14) / 2,
    height:hp("4.7%"),
    width: 150,
    elevation:2
  },
  buttonText: {
    ...FONTS.body8,
      color: COLORS.accent1,
      alignSelf: 'center'
  }
});
