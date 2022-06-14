import React from "react";
import { Dimensions, View, StyleSheet,Text, Pressable } from "react-native";
import { Portal } from "@gorhom/portal";
import { Modalize } from "react-native-modalize";
import { RFPercentage } from "react-native-responsive-fontsize";
import COLORS from "../../styles/colors/colors";
import { FONTS } from "../../styles/fonts/fonts";

const { height } = Dimensions.get("screen");
const modalHeight = height * 0.4;

const BottomSheet = ({ modalRef, onClose, setCoinChoice, celo, bal}) => {
  const Coins = [{
    name:"cUSD",
    balance: bal
  },
{
  name:"CELO",
  balance:celo
},
{
  name:"KUZA",
  balance:20.67
}]
  function handleClose (index: any){
  setCoinChoice(Coins[index].name);
  onClose();
  }
  return (
    <Portal>
      <Modalize ref={modalRef} modalHeight={modalHeight}>
        <View style={styles.content}>
        <Text style={styles.title}>Select Asset</Text>
    {Coins.map((coin, index) => (
       <View key={index}>
       <Pressable key={index} onPress={() => handleClose(index)} style={styles.coinOption}>
         <Text style={styles.coinTitle}>{coin.name}</Text>
         <View style={{margin:0,bottom:0}}>
             <Text style={styles.coinAmount}>{coin.balance}</Text>
             <Text style={styles.kesAmount}>Ksh 1160</Text>
         </View>
       </Pressable>
       <View style={styles.textDivider}/>
       </View>
    ))}
       
        </View>
      </Modalize>                      
    </Portal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    height: modalHeight,
    width: "100%",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: "#FFF",
    justifyContent: "flex-start",
    padding: 10,
  },
  textDivider:{
    alignSelf:"center",
    width: '90%',
    height: RFPercentage(0.1), 
    backgroundColor: COLORS.dividerLine, 
    marginTop:0,
    opacity:0.2
  },
  title:{
...FONTS.body4,
color:COLORS.primary,
margin:RFPercentage(2),
  },
  coinOption:{
    marginTop:30,
    width:"95%",
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    padding:5,
    paddingHorizontal:20,

  },
  coinTitle:{
    ...FONTS.body4,
    color:COLORS.textPrimary,
  },
  coinAmount:{
    ...FONTS.body4,
    color:COLORS.textPrimary,

  },
  kesAmount:{
  marginTop: RFPercentage(0.8),
    ...FONTS.s3,
  color:COLORS.grayLighter
  }

});