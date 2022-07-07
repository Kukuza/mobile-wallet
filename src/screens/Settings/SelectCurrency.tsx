import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity,StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { RadioButton } from "react-native-paper";
import { Feather } from "@expo/vector-icons";


import ScreenComponent from "../../containers/ScreenComponent";
import { FONTS } from "../../styles/fonts/fonts";
import { COLORS } from '../../styles/colors/colors';
function SelectCurrency() {
  const [list, setList] = useState([
    {
      currencyText: "USD",
      enable: "unchecked",
    },
    {
      currencyText: "KES",
      enable: "unchecked",
    },
    {
      currencyText: "CAD",
      enable: "unchecked",
    },
    {
      currencyText: "EUR",
      enable: "unchecked",
    },
    {
      currencyText: "MXN",
      enable: "unchecked",
    },
    {
      currencyText: "COP",
      enable: "unchecked",
    },
    {
      currencyText: "UGX",
      enable: "unchecked",
    },
    {
      currencyText: "CAD",
      enable: "unchecked",
    },
    {
      currencyText: "BRL",
      enable: "unchecked",
    },
    {
      currencyText: "CVE",
      enable: "unchecked",
    },
    {
      currencyText: "EUR",
      enable: "unchecked",
    },
    {
      currencyText: "MXN",
      enable: "unchecked",
    },
    {
      currencyText: "COP",
      enable: "unchecked",
    },
  ]);

 const handleCurrency = (index) => {
 const tempList = [...list];   
  for (let i = 0; i < tempList.length; i++) {
      if (i === index) {
        tempList[i].enable = "checked";
        setList(tempList);
      } else {
        tempList[i].enable = "unchecked";
      }
      
    }
  };

  return (
    <ScreenComponent>
      <View style={styles.currencyContainer}>
        <View style={styles.currencyHeadingContainer}>
        <TouchableOpacity>
            <Feather name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>
          <Text style={styles.currencyHeadingText}>Select Currency</Text>
        </View>
      </View>
      <ScrollView>
        <View
          style={styles.currencyListContainer}>
          {list?.map((item, i) => (
            <View key={i} style={styles.currencyListItem}>
            <View style={styles.currencyListDivider}/>
              <View style={styles.currencyListItemContainer}>
                <Text style={styles.currencyListItemText}>{item.currencyText}</Text>
                <View style={styles.radioButtonContainer}>
                  <RadioButton
                    value="first"
                    color={COLORS.radioButton}
                    status={item.enable.length < 8 ? "checked":'unchecked'}
                    onPress={() => handleCurrency(i)}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.currencyListDivider}/>
      </ScrollView>
    </ScreenComponent>
  );
}

export default SelectCurrency;
const styles = StyleSheet.create({
 currencyContainer:{
 
 },
 currencyHeadingContainer:{
    paddingLeft:'3%',
    width: '55%',
    flexDirection: 'row',
    alignItems:"center",
    marginTop: RFPercentage(3),
    marginLeft: RFPercentage(3) 
 },
 currencyHeadingText:{
    marginLeft:'auto',
    ...FONTS.body1,
    fontWeight: "bold",
    color: COLORS.textPrimary,
 },
 currencyListContainer:{
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    marginTop: RFPercentage(1),
 },
 currencyListDivider:{
    width: "100%",
    height: RFPercentage(0.15),
    backgroundColor: COLORS.dividerLine,
    marginTop: RFPercentage(3),
    opacity:0.3,
 },
 currencyListItem:{
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
 },
 currencyListItemContainer:{
    marginTop: RFPercentage(3),
    width: "80%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "center",
 },
 currencyListItemText:{
    ...FONTS.body1,
    marginLeft: RFPercentage(0.5),
    color: COLORS.textColor4,
    fontSize: RFPercentage(2.6),
 },
 radioButtonContainer:{
    marginLeft: RFPercentage(5),
 }


})