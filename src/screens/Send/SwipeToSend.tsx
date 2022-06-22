import { StyleSheet, Text,View, TouchableOpacity, Pressable, Alert, TextInput,FlatList, Image } from 'react-native';
import React,{useEffect, useState} from 'react';
import ScreenComponent from '../../containers/ScreenComponent';
import { Feather } from "@expo/vector-icons";
import COLORS from "../../styles/colors/colors";
import { FONTS } from "../../styles/fonts/fonts";
import { RFPercentage } from "react-native-responsive-fontsize";
import SwipeButton from '../../components/buttons/MainButtons/SwipeButton';


export default function SwipeToSend({route,navigation}) {
    const {Name, Phone, Desc, Amount} = route.params;
    const handleAction = () =>{
        navigation.navigate("Home")
    }
  return (
    <ScreenComponent>
    <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>  
        <Text style={{...FONTS.body4  , color:COLORS.textPrimary}}>Send</Text>
        </View>
        <View style={styles.userDetails}>
            <View style={styles.userImage}>

            </View>
            <Text style={{...FONTS.body4  , color:COLORS.textPrimary}}>{Name}</Text>
            <Text style={{...FONTS.headline, color:COLORS.textPrimary}}>{Phone}</Text>
        </View>
        <View style={styles.midSection}>
            <Text style={{...FONTS.body9, color:COLORS.textPrimary}}>Sending</Text>
            <TextInput style={styles.Texttitle} placeholder="Ksh 200">
                         Ksh {Amount}
            </TextInput>
        </View>
        <View style={styles.textInput}>
            <Text style={{...FONTS.body4, color:COLORS.textColor2}}>{Desc}</Text>
        </View>
        <View style={styles.reView}>
            <SwipeButton
            title="Swipe to Send"
            handleAction={handleAction}
            />
        </View>
     
      
    </ScreenComponent>
  )
}

const styles = StyleSheet.create({
    topContainer:{
        width:"55%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        padding:15,
        marginHorizontal:10,
        marginVertical:10,
    },
    userDetails:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    userImage:{
        width:60,
        height:60,
        borderRadius:30,
        backgroundColor:COLORS.white,
        alignSelf:"center",

    },
    midSection:{
        marginTop:RFPercentage(2),
        display:"flex",
        flexDirection:"column",
        paddingHorizontal:RFPercentage(5),
        marginBottom:RFPercentage(5),
    },
    textInput:{
        margin:RFPercentage(4),
        alignSelf:"center",
        width:"85%",
        aspectRatio:2,
        padding:RFPercentage(2),
    },
    reView:{
        alignSelf:"center"
    },
    button:{
        alignSelf:"center",
        height: 56,
        width: "80%",
        marginTop: 10,
        borderRadius: 28,
        marginBottom: 30,
        justifyContent: "center",
    },
    buttonText:{
        fontSize: 20,
        lineHeight: FONTS.displayBold.lineHeight,
        textAlign: "center",
        color: COLORS.white,
        fontFamily: FONTS.displayBold.fontFamily,
    },
    Texttitle:{
        fontSize: 28,
        lineHeight: 34,
        marginBottom: 30,
        color: COLORS.primary,
        fontFamily: FONTS.displayBold.fontFamily,
    },
    estiMated:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        marginVertical:10, 
    },
    input:{
    width:"100%",
    }

})