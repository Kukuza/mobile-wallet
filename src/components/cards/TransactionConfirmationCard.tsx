import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { FONTS } from "../../styles/fonts/fonts";

import { COLORS } from "../../styles/colors/colors";
import { Ionicons } from "@expo/vector-icons";
import CopyButton from "../buttons/Copy";
import { WakalaEscrowTransaction } from '../../utils/Celo-Integration/wakala_types';

/**
 *
 * @param props {
 *                grossAmount: the gross amount of the transaction.
 *                earnings: the amount the agent is expected to earn.
 *                netValue: the final amount after all calculations.
 *                additionalStyling: Additional stylings
 *              }
 * @returns
 */
const TransactionConfirmationCard = (props: any) => {

  let transaction: WakalaEscrowTransaction = props.transaction;

  let amount = Math.trunc(transaction.amount * 115)

  const copyToClipboard = () => {
    // todo
    console.log("copy button works");
  };
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
            <Ionicons name="md-paper-plane-sharp" size={20} color="white" />
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={[styles.header, FONTS.h5]}>
            Did you send{" "}
            <Text style={{ color: COLORS.primary }}>Ksh {amount}</Text> to M-Pesa
            number{" "}
            <Text style={{ color: COLORS.primary }}>{transaction.agentPhoneNumber}?</Text>
          </Text>
        </View>
      </View>
      <View style={styles.borderSection}></View>

      <View style={{ justifyContent: "space-between", marginTop: 15 }}>
        <Text style={styles.totalLabel}>Send</Text>
        <Text style={styles.totalValue}>Ksh {amount}</Text>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          marginTop: 15,
          marginBottom: 20,
        }}
      >
        <Text style={styles.totalLabel}>To</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 4 }}>
          <Text style={styles.totalValue}>{transaction.agentPhoneNumber}</Text>
          </View>
          <View style={{ flex: 2, justifyContent: "center" }}>
            <CopyButton text="Copy" onPress={copyToClipboard} />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default TransactionConfirmationCard;

const styles = StyleSheet.create({
  borderSection: {
    borderBottomColor: COLORS.black,
    borderBottomWidth: 0.3,
    paddingTop: 30,
    // paddingBottom: 50,
    marginRight: 10,
  },
  iconContainer: {
    width: 45,
    height: 38,
    borderRadius: 6,
    backgroundColor: "#4840BB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  header: {
    justifyContent: "center",
    textAlign: "center",
    margin: 30,
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
  cardTitle: {
    ...FONTS.body3,
    color: COLORS.textDarkBlue,
    marginBottom: 30,
  },
  cardSubTitle: {
    ...FONTS.body4,
  },
  grossAmount: {
    ...FONTS.h1,
  },
  earningsValue: {
    ...FONTS.h3,
  },
  earningsLabel: {
    ...FONTS.body4,
    color: COLORS.grayLight,
    marginTop: 20,
  },
  totalValue: {
    ...FONTS.h5,
    color: COLORS.primary,
  },
  totalLabel: {
    ...FONTS.body7,
    color: COLORS.grayLight,
    marginTop: 15,
  },
  cardFooter: {
    ...FONTS.s4,
    marginTop: 32,
  },
});
