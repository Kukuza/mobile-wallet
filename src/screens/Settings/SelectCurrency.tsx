import React, { useState } from "react";
import { View, Text, ScrollView,StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import ScreenComponent from "../../containers/ScreenComponent";
import { FONTS } from "../../styles/fonts/fonts";
import { COLORS } from '../../styles/colors/colors';
import NavHeader from "../../containers/NavHeader";
import RadioIcon from "../../assets/icons/RadioIcon";
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
<NavHeader
          hideBackButton={false}
          showTitle={true}
          newTitle="Select Currency"
      />
      <ScrollView>
        <View
          style={styles.currencyListContainer}>
          {list?.map((item, i) => (
            <View key={i} style={styles.currencyListItem}>
            <View style={styles.currencyListDivider}/>
              <View style={styles.currencyListItemContainer}>
              <View>
                    <RadioIcon/>
              </View>
                <Text style={styles.currencyListItemText}>{item.currencyText}</Text>
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
    marginLeft: RFPercentage(3),
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
    marginLeft: RFPercentage(2),
    color: COLORS.primary,
 },
})