import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { SUCCESS, WALLET } from "../../assets/icons";
import { FONTS } from "../../styles/fonts/fonts";
import COLORS from "../../styles/colors/colors";
import ScreenComponent from "../../containers/ScreenComponent";
import { LinearGradient } from "expo-linear-gradient";

const TransactionSuccess = (props) => {
  return (
    <ScreenComponent>
      <View style={styles.container}>
        <Image source={SUCCESS} />

        <Text style={styles.headingText}>Transaction Successfull</Text>
        <Text style={styles.subHeadingText}>
          Your cUSD has been deposited to your wallet
        </Text>
        <SuccessCard />
        <View style={{ marginTop: 120 }}>
          <Text
            style={styles.textButton}
            onPress={() => props.navigation.navigate("Rating")}
          >
            Okay
          </Text>
        </View>
      </View>
    </ScreenComponent>
  );
};

const SuccessCard = () => {
  return (
    <LinearGradient
      colors={COLORS.cardGradient}
      start={[0, 1]}
      end={[1, 0]}
      style={[styles.cardContainer]}
    >
      <View>
        <Text style={styles.cardHeader}>Your New Balance</Text>
      </View>
      <View style={styles.imageContainer}>
        <View style={{ marginRight: 10 }}>
          <Image source={WALLET} />
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.textContainer}>cUSD 10.23</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
  },
  imageContainer: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "center",
  },
  textContainer: {
    textAlign: "center",
    justifyContent: "center",
    fontFamily: FONTS.displayBold.fontFamily,
    fontSize: 24,
    lineHeight: 36,
  },
  cardContainer: {
    minWidth: 344,
    paddingBottom: 25,
    paddingTop: 23,
    paddingLeft: 10,
    borderColor: COLORS.white,
    borderWidth: 0.4,
    borderRadius: 11,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomStartRadius: 10,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    marginTop: 100,
  },
  headingText: {
    color: COLORS.primary,
    fontFamily: FONTS.body3.fontFamily,
    fontSize: FONTS.body3.fontSize,
    lineHeight: FONTS.body3.lineHeight,
    marginTop: 10,
  },
  subHeadingText: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.headline.fontFamily,
    fontSize: FONTS.headline.fontSize,
    lineHeight: FONTS.headline.lineHeight,
    marginTop: 15,
  },
  cardHeader: {
    fontFamily: FONTS.headline.fontFamily,
    fontSize: FONTS.headline.fontSize,
    lineHeight: FONTS.headline.lineHeight,
    textAlign: "center",
    color: COLORS.textPrimary,
  },
  textButton: {
    fontFamily: FONTS.sh2.fontFamily,
    fontSize: 20,
    color: COLORS.accent1,
  },
});

export default TransactionSuccess;
