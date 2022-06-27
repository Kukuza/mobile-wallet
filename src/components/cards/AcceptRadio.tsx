import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import COLORS from '../../styles/colors/colors';
import { FONTS } from '../../styles/fonts/fonts';

{/* TODO: use proper radio butoon component */}

const AcceptRadio = (props) => {
  return (
    <View>
    <TouchableOpacity onPress={() => props.handleSelect(props.code)}>
        <View style={styles.card}>
            <Text style={styles.acceptRadio}></Text>
            <Text style={styles.cardText}>{props.text}</Text>
        </View>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    card: {
        borderBottomColor: COLORS.grayLightest,
        width:wp("85%"),
        height:hp("7%"),
        padding:hp("1%"),
        flexDirection: 'row',
        alignItems:"center"
    },
    acceptRadio: {
        marginRight: '4%',
        width:wp("4.53%"),
        height:wp("4.533"),
        borderRadius:wp("50%"),
        borderWidth: 1,
        backgroundColor: COLORS.white
    },
    cardText: {
        ...FONTS.body1,
        color:COLORS.black,
        fontSize:hp("2.2%"),
        fontWeight: 'normal',
    }
});

export default AcceptRadio;