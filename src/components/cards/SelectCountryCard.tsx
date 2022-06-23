import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import COLORS from '../../styles/colors/colors';
import { FONTS } from '../../styles/fonts/fonts';
const SelectCountryCard = (props) => {
  return (
    <View>
    <TouchableOpacity onPress={() => props.handleSelect(props.code)}>
        <View style={styles.card}>
            <Text style={styles.cardText}>{props.text}</Text>
            <Image source={props.imgSrc} style={styles.cardImage}/>
        </View>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    card: {
        marginTop:hp("3%"),
        backgroundColor:COLORS.white,
        width:wp("82%"),
        height:hp("10%"),
        padding:hp("2%"),
        borderRadius: wp("2.13%"),
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems:"center"
    },
    cardText: {
        ...FONTS.sh1,
        color:COLORS.primary,
        fontSize:hp("2.2%"),
        fontWeight: 'bold'
    },
    cardImage: {
        alignItems: 'center',
        width:wp("8.53%"),
        height:wp("8.533"),
        borderRadius:wp("50%"),
        resizeMode:"cover"
    }
});

export default SelectCountryCard;