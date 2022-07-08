import React, { useEffect } from "react";
import { Dimensions, View, StyleSheet,Text, Pressable, TouchableOpacity } from "react-native";
import { Portal } from "@gorhom/portal";
import { Modalize } from "react-native-modalize";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import COLORS from "../../../styles/colors/colors";
import { FONTS } from "../../../styles/fonts/fonts";
import { LinearGradient } from "expo-linear-gradient";
const { height } = Dimensions.get("screen");
const modalHeight = height * 0.4;

const ResetAccountSheet = ({ modalRef, onClose,}) => {
  function handleClose (){
  onClose();
  }
  return (
    <Portal>
      <Modalize ref={modalRef} modalHeight={modalHeight}>
        <LinearGradient
        colors={COLORS.wakalaModalLinearGradient}
        start={[1, 0]}
        end={[1, 1]}
        style={styles.content}
        >
        <View >
        <Text style={styles.title}>Without your account key you will lose access to your funds forever.</Text>
        <Text style={styles.subTitle}>In order to reset Kukuza, you will need to confirm you’ve written your account key.</Text>
        <Text style = {styles.text}>Nobody, not even Kukuza, can recover your account without key</Text>
        </View>
        <View style={styles.buttons}>
            <TouchableOpacity onPress={() => handleClose()}>
                    <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                    <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
        </View>
        </LinearGradient>
      </Modalize>                      
    </Portal>
  );
};

export default ResetAccountSheet;

const styles = StyleSheet.create({
  content: {
    height: modalHeight,
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    margin:0,
    padding:20,
  },
  title:{
   ...FONTS.body3,
    color:COLORS.textPrimary,
    alignSelf:"center",
    marginVertical:hp("2%")
  },
  subTitle:{
    ...FONTS.headline,
    color:COLORS.textPrimary,
    alignSelf:"center",
    marginVertical:hp("2%")

  },
  text:{
    ...FONTS.headline,
    color:COLORS.textPrimary,
    alignSelf:"center",
    marginVertical:hp("2%")
  },
buttons:{
marginTop:hp("7%"),
display:"flex",
flexDirection:"row",
justifyContent:"space-around"
  },
  cancelText:{
    ...FONTS.sh1,
    color:COLORS.textPrimary,
    alignSelf:"center",
  },
  continueText:{
    ...FONTS.sh1,
    color:COLORS.primary,
    alignSelf:"center",
  }

});