import { StyleSheet, Text, View } from "react-native";
import React, { useState, useRef } from "react";
import ScreenComponent from "../../containers/ScreenComponent";
import { SIZES } from "../../styles/fonts/fonts";
import { IStackScreenProps } from "../../navigation/StackScreenProps";
import HeaderTitle from "../../components/HeaderTitle";

const AddFundsConfirmationScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const { navigation, route } = props;

  return (
    <ScreenComponent>
      <View style={styles.screenContainer}>
        <HeaderTitle/>
      </View>
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    height: SIZES.height,
  },
  // Slide styles
  screenContainer: {
    flex: 1, // Take up all screen
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    paddingHorizontal: 40,
  },
});

export default AddFundsConfirmationScreen;
