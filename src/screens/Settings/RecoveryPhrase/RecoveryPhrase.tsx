import { StyleSheet, View, Text} from "react-native";
import ScreenComponent from "../../../containers/ScreenComponent";
import { FONTS, SIZES } from "../../../styles/fonts/fonts";
import { IStackScreenProps } from "../../../navigation/StackScreenProps";
import React, { useEffect, useState } from "react";
import DefaultButton from "../../../components/buttons//MainButtons/DefaultButton";
import COLORS from '../../../styles/colors/colors';
import NavHeader from "../../../containers/NavHeader";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useSelector } from "react-redux";

const RecoveryPhrase: React.FunctionComponent<IStackScreenProps> = (props) => {
  const { navigation,} = props;
  const recoveryPhrase = useSelector((state: any) => state.auth.recoveryPhrase);

  return (
    <ScreenComponent>
      <NavHeader
          hideBackButton={false}
          showTitle={true}
          newTitle="Recovery Phrase"
      />
      <View style={styles.container}>
        <Text style={styles.text}>{recoveryPhrase}</Text>
      </View>
      <View style = {{justifyContent: 'center'}}>
        <DefaultButton onPress={() => navigation.navigate("Settings")} style={styles.button} text="Okay" />
      </View>
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    justifyContent: "center",
    height: SIZES.height,
    marginTop: hp("5%"),
     marginHorizontal: wp("8%")
  },
  title: {
    ...FONTS.body1,
    color: COLORS.black,
    fontWeight: "bold",
    textAlign: "center"
  },
    titleDescription: {
      ...FONTS.body4,
      textAlign: "center",
      color: COLORS.textDarkBlue,
      marginVertical:hp("2%")
  },
  text: {
    height: hp("25%"),
    backgroundColor: '#fff',
    marginTop: hp("4%"),
    padding: 25,
    borderRadius: 15,
    ...FONTS.body1,
  },
  accept: {
    marginTop: hp("4%"),
    ...FONTS.body1,
  },
  button: {
    width:wp("76%"),
    height:hp("6%"),
    marginVertical:hp("2%")
},
footer: {
  ...FONTS.body5,
  marginTop:hp("5%"),
  textAlign: "center",
  color: COLORS.primary
},
});

export default RecoveryPhrase;