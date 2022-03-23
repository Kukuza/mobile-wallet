import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInputMask } from "react-native-masked-text";

import { FONTS } from "../../font/fonts/fonts";
import { COLORS } from "../../styles/theme";

const AcceptTXRequestDetailsCard = (props) => {
    return (
      
         <LinearGradient
                colors={COLORS.drawerMenuGradient}
                start={[0, 1]}
                end={[1, 0]}
                style={styles.container}
            >

            <Text style={styles.cardTitle}>Member want to deposit</Text>

            <View style={{ flexDirection: 'column'}}>
                <TextInputMask
                    type={"money"}
                    options={{
                      unit: "Ksh ",
                    }}
                    value={props.value}
                    style={styles.grossAmount}
                    placeholder="Ksh 1,000 "
                    placeholderTextColor={COLORS.primary}
                  />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15  }}>

                  <Text style={styles.earningsLabel}>You earn </Text>

                  <TextInputMask
                    type={"money"}
                    options={{
                      unit: "Ksh ",
                    }}
                    value={props.value}
                    style={styles.earningsValue}
                    placeholder="Ksh 10"
                    placeholderTextColor={COLORS.textBlack}
                  />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                  <Text style={styles.totalLabel}>Total you Send</Text>
                  <TextInputMask
                    type={"money"}
                    options={{
                      unit: "Ksh ",
                    }}
                    value={props.value}
                    style={styles.totalValue}
                    placeholder="Ksh 900 "
                    placeholderTextColor={COLORS.textBlack}
                  />
                </View>
            </View>
         
          </LinearGradient>
      
    );
  };
  
  export default AcceptTXRequestDetailsCard;
  
  const styles = StyleSheet.create({
    container: {
      minWidth: 327,
      paddingBottom: 45,
      paddingTop: 15,
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
      ...FONTS.body9
    },
    grossAmount: {
      ...FONTS.displayBold
    },
    earningsValue: {
      ...FONTS.s3,
      alignSelf: 'flex-end',
      marginRight: 42
    },
    earningsLabel: {
      ...FONTS.s3,
    },
    totalValue: {
      ...FONTS.body7,
      alignSelf: 'flex-end',
      marginRight: 25,
    },
    totalLabel: {
      ...FONTS.body7
    }
  });
  