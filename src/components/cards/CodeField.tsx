import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import COLORS from '../../styles/colors/colors';
import { FONTS } from '../../styles/fonts/fonts';
import LoaderIcon from '../../assets/icons/LoaderIcon';
import ConfirmedIcon from '../../assets/icons/ConfirmedIcon';
const CodeField = (props) => {
    const [state, setState] = useState("Confirmed")
  return (
    <View style={styles.card}>
        <Text style={styles.codeTitle}> Code 3</Text>
            {state === "Empty" ? (
                <TouchableOpacity 
                style={{ marginTop:hp("1%"), padding:wp("1%")}}
                onPress={() => setState("Loading")}
                >
                    <Text>Paste code</Text>
                </TouchableOpacity>
            ):(
            <View style={styles.wrapper} >
                {state ==="Loading" ? (
                    <>
                    <Text style={styles.cardText}>458753</Text>
                    <LoaderIcon/>
                    </>

                ):(
                    <>
                    <Text style={styles.cardText}>458753</Text>
                    <ConfirmedIcon/>
                    </>
                )}
            </View>
            )}

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
    },
    cardText: {
        ...FONTS.sh1,
        color:COLORS.textDarkBlue,
        fontSize:hp("2.2%"),
        fontWeight: 'bold'
    },
    cardImage: {
        alignItems: 'center',
        width:wp("8.53%"),
        height:wp("8.533"),
        borderRadius:wp("50%"),
        resizeMode:"cover"
    },
    codeTitle:{
        ...FONTS.body8,
        color:COLORS.grayLighter
    },
    wrapper:{
        marginTop:hp("1%"),
        flexDirection: 'row',
        justifyContent: "space-between",
      
    },
    pasteCode:{
        ...FONTS.body3,
        color:COLORS.grayLight,
    }
});

export default CodeField;