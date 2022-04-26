import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { FONTS } from "../../styles/fonts/fonts";
import { COLORS } from "../../styles/colors/colors";
import { SUBHEADINGICON3 } from "../../assets/icons";

/**
 *
 * @param props {
 *                amount: the amount of the transaction.
 *                phoneNumber: The phone number of the recipient
 *               }
 * @returns
 */
const ConfirmMpesaPaymentCard = (props: any) => {
  return (
    <LinearGradient
      colors={COLORS.cardGradient}
      start={[0, 1]}
      end={[1, 0]}
      style={[styles.container, props.additionalStyling]}
    >
      <View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View style={styles.iconContainer}>
            <Image source={SUBHEADINGICON3} />
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={[styles.header, FONTS.h5]}>Confirm M-PESA Payment</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            alignSelf: "center",
          }}
        >
          <Text style={styles.bodyText}>
            The agent confirmed {"\n"} that{" "}
            <Text style={styles.highlight}>Ksh {props.amount}</Text> was sent to{" "}
            {"\n"}
            your M-Pesa number {"\n"}
            <Text style={styles.highlight}>{props.phoneNumber}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.borderSection}></View>

      <View style={{ marginTop: 15 }}>
        <Text style={styles.footerText}>
          If, yes, press the continue button.{" "}
        </Text>
      </View>
    </LinearGradient>
  );
};

export default ConfirmMpesaPaymentCard;

const styles = StyleSheet.create({
  borderSection: {
    borderBottomColor: COLORS.black,
    borderBottomWidth: 0.3,
    paddingTop: 30,
    marginTop: 100,
    marginRight: 10,
  },
  bodyText: {
    ...FONTS.h5,
    marginHorizontal: 30,
    textAlign: "center",
  },
  highlight: {
    color: COLORS.primary,
  },
  footerText: {
    ...FONTS.s3,
  },
  iconContainer: {
    width: 45,
    height: 38,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  header: {
    justifyContent: "center",
    textAlign: "center",
    margin: 50,
    color: COLORS.textPrimary,
  },

  container: {
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
  },
});
