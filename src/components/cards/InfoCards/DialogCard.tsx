import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tip } from "react-native-tip";
import { FONTS } from '../../../styles/fonts/fonts';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../../../styles/colors/colors';
import InfoIcon from '../../../assets/icons/InfoIcon';

export default function DialogCard() {
  return (
        <Tip
        id={1}
        tipContainerStyle={styles.tipContainer}
        renderTip={() => <LinearGradient
            colors={["#F7EFFA", "#FCF8ED"]}
            start={[1, 0]}
            end={[1, 1]}
            style={styles.container}
        >
            <Text style={styles.tooltipText}>Small fee necessary.... To learn more about fees, visit</Text><Text style={styles.toolTipLink}>kukuza.xyz/fees.</Text>

        </LinearGradient>}
        >
        <InfoIcon/>
        </Tip>
  )
}

const styles = StyleSheet.create({
    tooltipText:{
        ...FONTS.headline,
        color:COLORS.textDarkBlue

    },
    toolTipLink:{
        ...FONTS.headline,
        color:COLORS.accent1
    },
    container:{
        width:"auto",
        height:"auto",
        elevation:3,
        borderRadius:10,
        padding:20
    },
    tipContainer:{
        margin:0,
        padding:0
    }
})