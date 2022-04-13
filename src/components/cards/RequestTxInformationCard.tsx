import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { FONTS } from "../../styles/fonts/fonts";

import { COLORS } from "../../styles/colors/colors";

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
const RequestTxInformationCard = (props: any) => {
  return (
    <LinearGradient
      colors={COLORS.cardGradient}
      start={[0, 1]}
      end={[1, 0]}
      style={[styles.container, props.additionalStyling]}
    >
      {/* <Text style={styles.cardTitle}>M-PESA to cUSD Deposit Request</Text> */}

      <View>
        <Text style={styles.cardSubTitle}>{props.cardSubtitle}</Text>

        <View style={{ flexDirection: "column" }}>
          <Text style={styles.grossAmount}>Ksh {props.grossAmount * 115}</Text>
          {/* <TextInputMask
            type={"only-numbers"}
            // options={{
            //   unit: "cUSD ",
            //   // zeroCents: true,
            //   // separator: ",",
            //   // precision: 0,
            // }}
            value={props.grossAmount}
            style={styles.grossAmount}
            placeholder="cUSD 10 "
            placeholderTextColor={COLORS.textPrimary}
          /> */}

          <View style={{ justifyContent: "space-between", marginTop: 15 }}>
            <Text style={styles.earningsLabel}>{props.cardSubtitle2} </Text>

            <Text style={styles.earningsValue}>
              cUSD {props.earnings ? props.earnings : "0.05"}
            </Text>

            {/* <TextInputMask
              type={"only-numbers"}
              // options={{
              //   unit: "cUSD ",
              //   // zeroCents: true,
              //   // separator: ",",
              //   // precision: 0,
              // }}
              value={props.earnings}
              style={styles.earningsValue}
              placeholder="cUSD 0.01"
              placeholderTextColor={COLORS.textPrimary}
            /> */}
          </View>
        </View>
      </View>
      <View style={styles.borderSection}></View>

      <View style={{ justifyContent: "space-between", marginTop: 15 }}>
        <Text style={styles.totalLabel}>Total you receive</Text>
        <Text style={styles.totalValue}>
          cUSD {(props.grossAmount - 0.05).toFixed(2)}
        </Text>
        {/* <TextInputMask
          type={"only-numbers"}
          // options={{
          //   unit: "cUSD ",
          //   // zeroCents: true,
          //   // separator: ",",
          //   // precision: 0,
          // }}
          value={props.netValue}
          style={styles.totalValue}
          placeholder="Ksh 1,000"
          placeholderTextColor={COLORS.primary}
        /> */}
      </View>

      <Text style={styles.cardFooter}>
        The total amount will be sent from your wallet to the Wakala escrow
        account.
      </Text>
    </LinearGradient>
  );
};

export default RequestTxInformationCard;

const styles = StyleSheet.create({
  borderSection: {
    borderBottomColor: COLORS.black,
    borderBottomWidth: 0.3,
    paddingTop: 30,
    // paddingBottom: 50,
    marginRight: 10,
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
    ...FONTS.h1,
    color: COLORS.primary,
  },
  totalLabel: {
    ...FONTS.body4,
    color: COLORS.textDarkBlue,
    marginTop: 15,
  },
  cardFooter: {
    ...FONTS.s4,
    marginTop: 32,
  },
});
