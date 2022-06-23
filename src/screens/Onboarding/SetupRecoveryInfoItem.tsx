import React from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { COLORS } from "../../styles/colors/colors";
import { FONTS } from "../../styles/fonts/fonts";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
interface Props {
  id: string;
  title: string;
  description: string;
}

const SetupRecoveryInfoItem: React.FC<Props> = ({ id, title, description }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={({ width })}>
      <View style={styles.titleSection}>
        <Text style={styles.header}>{title}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  header: {
    ...FONTS.h3,
    color: COLORS.primary,
    fontWeight: "normal",
    textAlign: "center",
    marginHorizontal: wp("2%"),
  },
  description: {
    ...FONTS.body4,
    color: COLORS.textColor2,
    marginHorizontal: wp("8%"),
    flex: 0.5,
    textAlign: "center",
  },
  titleSection: {
      flex: 0.5,
      marginTop: hp("5%"),
      marginBottom: hp("2%"),
      marginHorizontal: wp("8%"),
      justifyContent: 'flex-end'
  }
});

export default SetupRecoveryInfoItem;