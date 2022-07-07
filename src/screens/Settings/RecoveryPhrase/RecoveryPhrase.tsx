import React, { useState } from 'react';
import { View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Feather } from "@expo/vector-icons";
import DefaultButton from '../../../components/buttons/MainButtons/DefaultButton';
import ScreenComponent from '../../../containers/ScreenComponent';
import COLORS from '../../../styles/colors/colors';
import {FONTS} from '../../../styles/fonts/fonts';
import EnterPinElement from '../../../elements/EnterPinElement';
import NavHeader from '../../../containers/NavHeader';


function RecoveryPhrase({navigation}) {
    const [onPinSuccessful, setOnPinSuccessful] = useState(false);

    function onPinSuccess (){ setOnPinSuccessful(true) }
    return (
        <ScreenComponent>
          {onPinSuccessful === true ? <>
            <NavHeader
          hideBackButton={false}
          showTitle={true}
          newTitle="Recovery Phrase"
      />
            <View style={styles.textContainer}>
                <View style={styles.phraseContainer}>
                    <View style={styles.phraseWrapper}>
                        <Text style={styles.phrase}>
                        horse giraffe dog money book fire drink cup phone car jacket computer wire charger curtain router window plate floor plate wine glass oak
                        </Text>
                    </View>
                </View>
            </View>
            <View style={ styles.bottomBtn}>
                <DefaultButton
                text="Okay"
                onPress={() =>navigation.navigate("Settings") }
                style={styles.button}
               />
          </View>
          </>:<EnterPinElement pinInput="526422" onSucess={onPinSuccess}/>}
        </ScreenComponent>
    );
}
export default RecoveryPhrase;
const styles = StyleSheet.create({
    button:{
        fontSize:RFPercentage(3),
        flex:1,
        height: RFPercentage(7),
        width: RFPercentage(30),
        borderRadius: RFPercentage(3),
        alignItems:"center",
    },
    bottomBtn:{
          position:'absolute',
          bottom:RFPercentage(10),
          left:RFPercentage(10),
    },
    settingsContainer:{
        marginEnd:0,
        paddingLeft:"5%",
        alignSelf:"center",
        width: '100%',
        flexDirection: 'row',
        marginTop: RFPercentage(3),
        justifyContent: 'space-between',

    },
    headerText:{
        ...FONTS.body3,
        fontWeight: "bold",
        color: COLORS.textPrimary,
        alignSelf:"center",
        justifyContent: 'center',
        marginRight:"40%"
        
    },
    textContainer:{
        alignSelf:'center',
        marginTop: RFPercentage(20),
        width: "80%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        height: RFPercentage(26),
        borderRadius: RFPercentage(3),
    },
    phraseContainer:{
        width: "99%",
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: COLORS.grayLightest1,
        height: RFPercentage(25.6),
        borderRadius: RFPercentage(3),
    },
    phrase:{
        ...FONTS.body4,
        color: COLORS.textColor2,
        fontSize:RFPercentage(2.2),
    },
    phraseWrapper:{
        width: '90%', 
        marginTop: RFPercentage(7)
    }
})