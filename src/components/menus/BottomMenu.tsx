import { StyleSheet, Text, View, Button, Alert } from "react-native";
import React from "react";
import { mainStyles } from "../../styles/componentTheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { COLORS } from "../../styles/theme";
import SendButton from "../buttons/SendButton";
import WithdrawButton from "../buttons/WithdrawButton";

const BottomMenu = () => {
  return (
    <View style={{ flexDirection: 'column' }}>
      <View style={[styles.container]}>
          <SendButton title={"Send"} onPressHandler={() => Alert.alert('Wakala Btn 1.')}></SendButton>

          <Pressable style={styles.scanQRCodeBtn} onPress={() => Alert.alert('Scan QR code.')}>
              <MaterialCommunityIcons name="qrcode-scan" size={24} color={COLORS.textLightBlue} />
          </Pressable>

          <WithdrawButton title={"Add/Withdraw"} onPressHandler={() => Alert.alert('Wakala Btn 2.')}></WithdrawButton>
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