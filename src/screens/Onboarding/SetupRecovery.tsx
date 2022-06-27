import { StyleSheet, View, Text, Pressable, Modal, Alert } from "react-native";
import ScreenComponent from "../../containers/ScreenComponent";
import { FONTS, SIZES } from "../../styles/fonts/fonts";
import { IStackScreenProps } from "../../navigation/StackScreenProps";
import React, { useEffect, useState } from "react";
import DefaultButton from "../../components/buttons/MainButtons/DefaultButton";
import COLORS from '../../styles/colors/colors';
import NavHeader from "../../containers/NavHeader";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const SetupRecovery: React.FunctionComponent<IStackScreenProps> = (props) => {
  
  const { navigation, route } = props;
  const continueHandler = () => {
    navigation.navigate("SetupRecoveryInfo");
  }

  return (
    <ScreenComponent>
      <NavHeader
          hideBackButton={true}
          showTitle={true}
          newTitle="Step 4 of 8"
      />
      <View style={styles.titleSection}>
        <Text style={styles.headerTitle}>
          Set up your recovery phrase
        </Text>
        <Text style={styles.titleDescription}>
          Your recovery phrase is the most important part of your account.
        </Text>
        <Text style={styles.titleDescription}>
          Please find a private place to set up your phrase. It takes about five minutes.
        </Text>
      </View>
      <View style = {{ flex: 0.5, justifyContent: 'center'}}>
        <DefaultButton onPress={continueHandler} style={styles.button} text="Set up"/>
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
  headerTitle: {
    ...FONTS.displayBold,
    color: COLORS.primary,
  },
    titleDescription: {
      ...FONTS.body4,
      color: COLORS.textDarkBlue,
      marginVertical:hp("2%")
  },
  titleSection: {
      flex: 0.7,
      marginTop: hp("5%"),
      marginHorizontal: wp("8%"),
      justifyContent: 'flex-end'
  },
  button: {
    width:wp("76%"),
    height:hp("6%"),
    marginVertical:hp("2%")
},
});

export default SetupRecovery;