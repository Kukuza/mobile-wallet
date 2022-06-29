import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FONTS, SIZES } from '../../styles/fonts/fonts'
import COLORS from '../../styles/colors/colors'

export default function BalanceCard({balance, kshBalance}) {
  return (
    <View style={stylesBalance.balance}>
      <View>
        <Text style={stylesBalance.text}>Current Balance</Text>
        <Text style={stylesBalance.cUSD}>cUSD {balance}</Text>
        <Text style={stylesBalance.ksh}>Ksh {kshBalance}</Text>
      </View>
  </View>
  )
}

const stylesBalance = StyleSheet.create({
    balance: {
        width: SIZES.width * 0.75,
        height: 101,
        marginLeft: (SIZES.width * 0.05) / 2,
        marginTop: -35,
        marginBottom: 10,
        borderRadius: 14,
        backgroundColor: COLORS.white,
        padding: 13,
        justifyContent: "space-between",
    
        shadowColor: COLORS.shadowColor,
        shadowOffset: { width: 10, height: 2.5 },
        shadowOpacity: 0.25,
        shadowRadius: 25,
        elevation: 100,
      },
    
      text: {
        ...FONTS.body9,
      },
    
      ksh: {
        ...FONTS.body4,
        color: COLORS.textPrimary,
        fontWeight: "bold",
        margin: 2,
      },
    
      cUSD: {
        ...FONTS.h2,
        color: COLORS.textPrimary,
        fontWeight: "bold",
        marginTop: 2,
      },
})