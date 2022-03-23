import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { FONTS } from "../../styles/fonts/fonts";

import { COLORS } from "../../styles/theme";

/**
 * 
 * @param props {
 *                grossAmount: the gross amount of the transaction.
 *                earnings: the amount the agent is expected to earn.
 *                netValue: the final amount after all calculations.
 *              }
 * @returns 
 */
const RequestTxInformationCard = (props) => {
    return (
      
         <LinearGradient
                colors={COLORS.drawerMenuGradient}
                start={[0, 1]}
                end={[1, 0]}
                style={styles.container}
            >

            <Text style={styles.cardTitle}>M-PESA to cUSD Deposit Request</Text>

            <View style={ styles.borderSection }>
              
                <Text style={styles.cardSubTitle}>Member want to deposit</Text>

                <View style={{ flexDirection: 'column'}}>
                    <TextInputMask
                        type={"money"}
                        options={{
                          unit: "Ksh ",
                        }}
                        value={props.grossAmount}
                        style={styles.grossAmount}
                        placeholder="Ksh 1,000 "
                        placeholderTextColor={COLORS.textBlack}
                      />

                    <View style={{ justifyContent: 'space-between', marginTop: 15  }}>

                      <Text style={styles.earningsLabel}>You earn </Text>

                      <TextInputMask
                        type={"money"}
                        options={{
                          unit: "Ksh ",
                        }}
                        value={props.earnings}
                        style={styles.earningsValue}
                        placeholder="Ksh 10"
                        placeholderTextColor={COLORS.textBlack}
                      />
                    </View>
                </View>
            </View>

            <View style={{ justifyContent: 'space-between', marginTop: 15}}>
                      <Text style={styles.totalLabel}>Total you Send</Text>
                      <TextInputMask
                        type={"money"}
                        options={{
                          unit: "Ksh ",
                        }}
                        value={props.netValue}
                        style={styles.totalValue}
                        placeholder="Ksh 900 "
                        placeholderTextColor={COLORS.primary}
                      />
              </View>
            
            <Text style={styles.cardFooter}>The total amount will be sent from your wallet to the Wakala escrow account.</Text>
         
          </LinearGradient>
      
    );
  };
  
  export default RequestTxInformationCard;
  
  const styles = StyleSheet.create({
    borderSection: {
        borderTopColor: COLORS.black,
        borderBottomColor: COLORS.black,
        borderBottomWidth: 0.3,
        borderTopWidth: 0.3,
        paddingTop: 30,
        paddingBottom: 50,
        marginRight: 10 
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
      color: COLORS.darkBlue,
      marginBottom: 30,
    },
    cardSubTitle: {
      ...FONTS.body9
    },
    grossAmount: {
      ...FONTS.h1
    },
    earningsValue: {
      ...FONTS.h3,
      
    },
    earningsLabel: {
      ...FONTS.body4,
      color: COLORS.lightGray
    },
    totalValue: {
      ...FONTS.h1,
      color: COLORS.primary
    },
    totalLabel: {
      ...FONTS.body4,
      color: COLORS.darkBlue,
      marginTop: 15
    },
    cardFooter: {
      ...FONTS.s4,
      marginTop: 32
    }
  });
  