import { StyleSheet, Text,View, TouchableOpacity, Pressable, Alert, TextInput,FlatList, Image } from 'react-native';
import React,{useEffect, useState} from 'react';
import Tooltip from 'rn-tooltip';
import ScreenComponent from '../../containers/ScreenComponent';
import { Feather } from "@expo/vector-icons";
import COLORS from "../../styles/colors/colors";
import { FONTS } from "../../styles/fonts/fonts";
import { MaterialIcons } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";


export default function Description({route,navigation}) {
    const [description, setDescription] = useState("");

    const {Name, Phone,Amount} = route.params;

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
            <View style={styles.estiMated}>
              <View style={{flexDirection:"row", alignItems:"center"}}>
              <Text style={{...FONTS.s3, color:COLORS.black}} >Estimated Fees</Text>
              <Tooltip actionType='press' popover={<Text>Info here</Text>}>
              <Pressable>
              <MaterialIcons name="info-outline" size={15} color={COLORS.grayLighter} />
              </Pressable>
              </Tooltip>
              </View>
                <Text style={{...FONTS.s3, color:COLORS.black}}>Ksh 10</Text>
            </View>
            <View style={styles.estiMated}>
                <Text style={{...FONTS.body7, color:COLORS.black}}>Total</Text>
                <Text style={{...FONTS.body7, color:COLORS.black}}>Ksh 1,000</Text>
            </View>
        </View>
        <View style={styles.textInput}>
        <TextInput
          style={styles.input}
          placeholder="Add Description ..."
          onChangeText={(value) => setDescription(value)}
        />
        </View>
        <View style={styles.reView}>
        <TouchableOpacity
          onPress={() => navigation.navigate("SwipeToSend", {
            Name: Name,
            Phone:Phone,
            Desc:description,
            Amount:Amount
        })}
        >
          <LinearGradient
            colors={["rgba(183, 0, 76, 0.3)", "rgba(19, 63, 219, 1)"]}
            start={[1, 0]}
            end={[0, 1]}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Review</Text>
          </LinearGradient>
        </TouchableOpacity>
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
        paddingHorizontal:RFPercentage(5)
    },
    textInput:{
        marginRight:10,
        margin:RFPercentage(4),
        alignSelf:"center",
        width:"85%",
        aspectRatio:2,
        padding:RFPercentage(4),
        backgroundColor:COLORS.white,
        borderRadius:15,
    

    },
    reView:{

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