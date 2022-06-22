import { StyleSheet, View, Alert } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import SendButton from "../buttons/MediumButtons/SendButton";
import WithdrawButton from "../buttons/MediumButtons/WithdrawButton";
import COLORS from "../../styles/colors/colors";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const BottomMenu = ({ navigation }) => {

  return (
    <View style={{ flexDirection: "column" }}>
      <View style={[styles.container]}>
        <SendButton
          title={"Send"}
          onPressHandler={() => navigation.navigate("Send")}
        ></SendButton>

        <Pressable
          style={styles.scanQRCodeBtn}
          onPress={() => navigation.navigate("Qr", {initialRoute:"MyCode"})}
        >
          <MaterialCommunityIcons
            name="qrcode-scan"
            size={24}
            color={COLORS.accent1}
          />
        </Pressable>

        <WithdrawButton
          title={"Top up/Withdraw"}
          onPressHandler={() => navigation.navigate("TransactionType")}
        ></WithdrawButton>
      </View>
    </View>
  );
};

export default BottomMenu;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 20,
    paddingTop: 20,
    borderRadius: 5,
    backgroundColor: COLORS.menuBackground,
  },
  scanQRCodeBtn: {
    marginTop: 6,
  },
});
