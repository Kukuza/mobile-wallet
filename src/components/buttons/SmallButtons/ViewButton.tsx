import {Text, Pressable,StyleSheet } from 'react-native';
import React from 'react';
import COLORS from "../../../styles/colors/colors";
import { FONTS, SIZES } from "../../../styles/fonts/fonts";

const ViewButton = () => {
  return (
    <Pressable
    style={styles.viewButton}
    onPress={() =>null}
  >
    <Text style={styles.viewButtonTxt}>View</Text>
  </Pressable>
  )
}

export default ViewButton
const styles = StyleSheet.create({
    viewButton: {
      borderColor: COLORS.black,
      borderWidth: 0.2,
      borderRadius: 20,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 4,
      marginRight: 13,
      backgroundColor: COLORS.white,
    },
    viewButtonTxt: {
      ...FONTS.body6,
      color: COLORS.accent1,
    },
  });