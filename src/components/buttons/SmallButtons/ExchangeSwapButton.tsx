import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Svg, {Path } from "react-native-svg"
import COLORS from '../../../styles/colors/colors'
import {FONTS} from '../../../styles/fonts/fonts'
import React, { useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default function ExchangeSwapButton({options}) {
    const [showOption, setShowOption] = useState(false)
  return (
    <TouchableOpacity style={styles.container}
    onPress={() => setShowOption(!showOption)}
    >
      <Text style={styles.options}>{showOption === false ? `${options[0]}`:`${options[1]}` }</Text>
      <Svg
    width={17}
    height={17}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M6.723 13.962v-6.76h-.89v6.76l-1.657-1.649a.446.446 0 0 0-.725.147.445.445 0 0 0 .098.484l2.73 2.716 2.728-2.716a.445.445 0 1 0-.622-.631l-1.662 1.649ZM5.834 6.279V4.945h.889V6.28h-.889ZM5.834 4.054v-.889h.889v.89h-.889ZM8.438 4.09a.444.444 0 1 0 .627.632l1.657-1.649v6.76h.89v-6.76l1.662 1.649a.443.443 0 0 0 .75-.132.443.443 0 0 0-.128-.5l-2.73-2.701L8.439 4.09ZM10.723 12.054v-1.333h.888v1.333h-.888ZM10.723 13.834v-.89h.888v.89h-.888Z"
      fill={COLORS.primary}
    />
  </Svg>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        display:"flex",
        flexDirection:"row",
        padding:wp("1%"),
        borderRadius:wp("5%"),
        justifyContent:"space-evenly",
        backgroundColor:COLORS.white,
        alignItems:"center"
    },
    options:{
        ...FONTS.body8,
        color:COLORS.primary

    }
})