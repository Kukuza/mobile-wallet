import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Svg, {
    Rect,
    Path,
    Defs,
    LinearGradient,
    Stop,
  } from "react-native-svg"
import COLORS from '../../../styles/colors/colors';
import { FONTS } from '../../../styles/fonts/fonts';
import { ArrowRight } from '../../../assets/icons/Arrows';
const ExternalLinkCard = (props) => {
  return (
        <View style={styles.card}>
            <View style={styles.cardImage}>
            <Svg
    width={42}
    height={42}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Rect width={42} height={42} rx={21} fill="url(#a)" />
    <Path
      d="M23.473 22.825a6.426 6.426 0 0 0-5.173-.888c-.464.125-.123 1.21.31 1.1a5.289 5.289 0 0 1 4.175.717c.366.257 1.056-.672.688-.929Zm3.606-6.969-.048-.07-.08-.03c-1.317-.466-2.968-.515-4.366-.124l-.084.023-.052.07a2.816 2.816 0 0 0-.576 1.71 2.845 2.845 0 0 0 2.842 2.842 2.846 2.846 0 0 0 2.843-2.843c0-.561-.166-1.11-.479-1.578Zm-2.364 3.905a2.33 2.33 0 0 1-2.327-2.327c0-.43.123-.84.347-1.205-.006.05-.017.097-.017.148a1.293 1.293 0 0 0 2.585 0c0-.164-.035-.319-.09-.463a6.483 6.483 0 0 1 1.483.3 2.33 2.33 0 0 1-1.981 3.547Zm-4.588-2.327c0-.562-.166-1.11-.478-1.578l-.048-.07-.081-.03c-1.317-.466-2.967-.515-4.366-.124l-.084.023-.052.07a2.817 2.817 0 0 0-.576 1.71 2.845 2.845 0 0 0 2.842 2.842 2.846 2.846 0 0 0 2.843-2.843Zm-2.843 2.327a2.33 2.33 0 0 1-2.326-2.327c0-.43.123-.84.347-1.205-.006.05-.018.097-.018.148a1.293 1.293 0 0 0 2.585 0c0-.164-.034-.319-.09-.463a6.483 6.483 0 0 1 1.483.3 2.329 2.329 0 0 1-1.981 3.547Z"
      fill="url(#b)"
    />
    <Path
      d="M21 10.688a9.623 9.623 0 0 0-9.625 9.624c0 1.72.462 3.407 1.339 4.885-.135.308-.256.635-.272 1.047-.003.07-.008.145-.013.225-.046.707-.114 1.776.83 3.115.61.864 1.558 1.431 2.74 1.639.42.073.848.101 1.314.086.762-.026 1.297-.054 1.59-.586.248-.45-.038-.734.174-.981a9.623 9.623 0 0 0 11.548-9.43A9.623 9.623 0 0 0 21 10.688Zm-2.402 19.239c.095.584-.237 1.136-2.481.731-3.692-.666-3.442-4.16-2.845-5.418.438-.924.371-1.317.118-2.465-.23-1.041 1.737-.57 1.793.679.042.926-.315 1.398.13 1.805.991.911 3.854.412 5.789.002.828-.176 1.253.664.64 1.091-.656.458-1.423.644-2.558.728-.592.043.076.233-.017.796-.05.308-.373.298-.361.619.006.17.359.35.12.78-.072.128-.39.275-.328.652ZM21 29.078c-.528 0-1.044-.05-1.547-.14a.94.94 0 0 0-.095-.286c-.13-.254.515-.516.253-1.197.982-.161 1.712-.35 2.39-.735.727-.414.751-.864.702-1.096-.085-.386-.483-.705-.993-.794a1.43 1.43 0 0 0-.58.013c-1.074.26-3.645.611-4.945.383-.365-.065-.485-.151-.518-.186-.189-.19-.153-.552-.06-1.301.113-.921-.715-1.903-1.449-2.032l-.047-.008c-.405-.051-.766.066-.991.32-.252.285-.308.71-.156 1.164.12.357.147.644.124.899a8.719 8.719 0 0 1-.854-3.77c0-2.415.983-4.606 2.57-6.193.026.007.051.007.072-.005a4.567 4.567 0 0 1 3.87-.338c.176.068.456-.579.241-.66a5.257 5.257 0 0 0-2.59-.259A8.71 8.71 0 0 1 21 11.547a8.74 8.74 0 0 1 6.217 2.593 5.268 5.268 0 0 0-4.444.398c-.197.117.192.704.354.608a4.566 4.566 0 0 1 3.869-.34c.148.058.364-.382.306-.577a8.733 8.733 0 0 1 2.464 6.084c0 4.833-3.932 8.765-8.766 8.765Z"
      fill="url(#c)"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={21}
        y1={0}
        x2={21}
        y2={42}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#F7EFFA" />
        <Stop offset={1} stopColor="#FCF8ED" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={21}
        y1={15.369}
        x2={21}
        y2={23.798}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FF93E1" />
        <Stop offset={1} stopColor="#133FDB" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={21}
        y1={10.688}
        x2={21}
        y2={31.313}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FF93E1" />
        <Stop offset={1} stopColor="#133FDB" />
      </LinearGradient>
    </Defs>
  </Svg>
</View>
<View style={styles.middleText}>
<Text style={styles.titleText}>Cant find your country?</Text>
<Text style={styles.subTitleText}>Please give us more details. We are constantly looking to add more countries.</Text>
</View>
<TouchableOpacity>
<ArrowRight color={COLORS.primary}/>
</TouchableOpacity>
</View>
  );
}

const styles = StyleSheet.create({
    card: {
        marginTop:hp("3%"),
        backgroundColor:COLORS.white,
        width:wp("88%"),
        height:hp("10%"),
        padding:hp("2%"),
        borderRadius: wp("2.13%"),
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems:"center"
    },
    titleText: {
        ...FONTS.body7,
        color:COLORS.primary,
    },
    cardImage: {
        alignItems: 'center',
        width:wp("8.53%"),
        height:wp("8.533"),
        borderRadius:wp("50%"),
    },
    subTitleText:{
        ...FONTS.s4,
        color:COLORS.black
    },
    middleText:{
    padding:wp("2.67%")
    }
});

export default ExternalLinkCard;