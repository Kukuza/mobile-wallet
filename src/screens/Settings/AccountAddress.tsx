import React from 'react';
import { View, Text,StyleSheet, TouchableOpacity, Pressable, Share } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Feather } from "@expo/vector-icons";
import DefaultButton from '../../components/buttons/DefaultButton';

import ScreenComponent from '../../containers/ScreenComponent';
import COLORS from '../../styles/colors/colors';
import {FONTS} from '../../styles/fonts/fonts'
import WakalaContractKit from "../../utils/Celo-Integration/WakalaContractKit";


function AccountAddress({navigation}) {
    const publicAddress = WakalaContractKit.getInstance()?.userMetadata?.publicAddress;
    const onShare = async () => {
        try {
            const result = await Share.share({
                message:`${publicAddress}`
            });
            if(result.action === Share.sharedAction){
                if(result.activityType){
                    return
                }else {
                    return
                }
            } else if (result.action === Share.dismissedAction){
                console.log("Copying failed");
            }
        } catch (error) {
            console.warn("Cannot Copy");
        };
        
    }
    return (
        <ScreenComponent>
            <View style={styles.mainContainer}>
            <TouchableOpacity
            onPress={() => navigation.goBack()}
            >
            <Feather name="chevron-left" size={32} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Account Address</Text>
            </View>
            <View style={styles.textContainer}>
                <View style={styles.addressContainer}>
                    <View style={styles.addressWrapper}>
                        <Text style={styles.address}>
                         {publicAddress}
                        </Text>
                    </View>
                </View>
            </View>
            <Pressable
                  style={styles.shareButton}
                  onPress={onShare}
                >
                  <Text style={styles.shareButtonTxt}>Copy</Text>
                </Pressable>
            <View style={ styles.bottomBtn}>
                <DefaultButton
                text="Okay"
                onPress={() => navigation.goBack()}
                style={styles.button}
               />

          </View>
        </ScreenComponent>
    );
}

export default AccountAddress;
const styles = StyleSheet.create({
    button:{
        fontSize:RFPercentage(3),
        flex:1,
        height: RFPercentage(7),
        width: RFPercentage(30),
        borderRadius: RFPercentage(5),
        alignItems:"center",
    },
    bottomBtn:{
          position:'absolute',
          bottom:RFPercentage(10),
          left:RFPercentage(10),
    },
    mainContainer:{
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
        height: RFPercentage(20),
        borderRadius: RFPercentage(3),
    },
    addressContainer:{
        width: "99%",
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: COLORS.grayLightest1,
        height: RFPercentage(19.6),
        borderRadius: RFPercentage(3),
    },
    address:{
        ...FONTS.body4,
        color: COLORS.textColor2,
        fontSize:RFPercentage(2.2),
    },
    addressWrapper:{
        width: '90%', 
        marginTop: RFPercentage(7),
    },
    shareButton:{
        borderColor: COLORS.black,
        borderWidth: 0.2,
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 3,
        marginRight: 13,
        backgroundColor: COLORS.white,
        width:80,
        height:30,
        alignSelf:"center",
        marginTop:20,
        justifyContent:"center",
    },
    shareButtonTxt:{
        alignSelf:"center",
        ...FONTS.body8,
        color: COLORS.textPrimary,
    }
})