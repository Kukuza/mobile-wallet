import { StyleSheet, Text, View, Button, Alert } from "react-native";
import React from "react";
import { mainStyles } from "../../styles/componentTheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { COLORS } from "../../styles/theme";
import WakalaBtn1 from "../WakalaButton1";
import WakalaBtn2 from "../WakalaButton2";

const BottomMenu = () => {
  return (
    <View style={{ flexDirection: 'column' }}>
      <View style={[styles.container]}>
          <WakalaBtn1 title={"Send"} onPressHandler={() => Alert.alert('Wakala Btn 1.')}></WakalaBtn1>

          <Pressable style={styles.scanQRCodeBtn} onPress={() => Alert.alert('Scan QR code.')}>
              <MaterialCommunityIcons name="qrcode-scan" size={24} color={COLORS.textLightBlue} />
          </Pressable>

          <WakalaBtn2 title={"Add/Withdraw"} onPressHandler={() => Alert.alert('Wakala Btn 2.')}></WakalaBtn2>
      </View>
    </View>
  );
};

export default BottomMenu;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: 'space-evenly',
    paddingBottom: 20,
    paddingTop: 20,
    borderRadius: 5,
    backgroundColor: COLORS.menuBackground,
    
  },
  scanQRCodeBtn: {
    marginTop: 6
  },

});