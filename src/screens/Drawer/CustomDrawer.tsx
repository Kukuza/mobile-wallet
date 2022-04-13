import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { FONTS, SIZES } from "../../styles/fonts/fonts";
import { COLORS } from "../../styles/colors/colors";
import WakalaContractKit from "../../utils/Celo-Integration/WakalaContractKit";
import { EventData } from "web3-eth-contract";

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  const wakalaContractKit = WakalaContractKit.getInstance();
  const [balance, setBalance] = useState("Loading...");

  const loading = false;
  const kshBalance = (Number(balance) * 115).toFixed(2);
  const cUSDBalance = 5.67;
  const loadingMessage = "Loading...";

  const publicAddress =
    WakalaContractKit?.getInstance()?.userMetadata?.publicAddress;

  useEffect(() => {
    walletBalance();
  }, []);

  const walletBalance = async () => {
    const kit = WakalaContractKit?.getInstance()?.kit;
    let totalBalance = await kit.getTotalBalance(publicAddress);
    let money = totalBalance.cUSD;
    let amount = kit.web3.utils.fromWei(money.toString(), "ether");
    const toNum = Number(amount);
    const visibleAmount = toNum.toFixed(2);
    setBalance(visibleAmount);
  };

  wakalaContractKit?.wakalaContractEvents?.wakalaEscrowContract?.once(
    "TransactionCompletionEvent",
    async (error: Error, event: EventData) => {
      await walletBalance();
    }
  );

  wakalaContractKit?.wakalaContractEvents?.wakalaEscrowContract?.once(
    "TransactionInitEvent",
    async (error: Error, event: EventData) => {
      await walletBalance();
    }
  );

  let phoneNumber = wakalaContractKit?.userMetadata?.phoneNumber ?? "";

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <LinearGradient
          colors={COLORS.cardGradient}
          start={[0, 1]}
          end={[1, 0]}
          style={styles.header}
        >
          <View style={{ marginBottom: 80, marginTop: 31 }}>
            <Image
              source={require("../../assets/images/drawer/dummyimages/dummy_identicone.png")}
              style={styles.identiconImg}
            ></Image>

            <View style={{ flexDirection: "row", height: "auto" }}>
              <Image
                source={require("../../assets/images/drawer/dummyimages/kenya_flag.png")}
                style={styles.phoneCountryFlag}
              />

              <Text style={styles.phoneNumberTest}>{phoneNumber}</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => props.navigation.closeDrawer()}
            style={{ marginTop: 20 }}
          >
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <View style={stylesBalance.balance}>
        {!loading ? (
          <View>
            <Text style={stylesBalance.text}>Current Balance</Text>
            <Text style={stylesBalance.cUSD}>cUSD {balance}</Text>
            <Text style={stylesBalance.ksh}>Ksh {kshBalance}</Text>
          </View>
        ) : (
          <View style={stylesBalance.loadingDiv}>
            <Progress.CircleSnail color={["black"]} size={23} thickness={2} />
            <Text style={stylesBalance.loadingMessage}>{loadingMessage}</Text>
          </View>
        )}
      </View>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <Text style={styles.versionNumber}>Version 2.0.1</Text>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SIZES.width * 0.8,
    height: SIZES.height,
    backgroundColor: COLORS.menuBackground,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  header: {
    height: "auto",
    width: SIZES.width * 0.8,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingTop: 25,
  },
  identiconImg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
  },
  phoneCountryFlag: {
    width: 16,
    height: 11,
    marginTop: 20,
    backgroundColor: COLORS.white,
  },
  phoneNumberTest: {
    ...FONTS.s4,
    color: COLORS.textPrimary,
    paddingTop: 20,
    marginLeft: 5,
  },
  versionNumber: {
    ...FONTS.s4,
    marginTop: 30,
    marginLeft: 40,
    color: COLORS.primary,
  },
  drawerElement: {
    paddingLeft: 41,
    color: COLORS.primary,
  },
});

const stylesBalance = StyleSheet.create({
  balance: {
    width: SIZES.width * 0.75,
    height: 101,
    marginLeft: (SIZES.width * 0.05) / 2,
    marginTop: -35,
    marginBottom: 10,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    padding: 13,
    justifyContent: "space-between",

    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 10, height: 2.5 },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 100,
  },

  text: {
    ...FONTS.body9,
  },

  ksh: {
    ...FONTS.body3,
    color: COLORS.textPrimary,
    fontWeight: "bold",
    margin: 2,
  },

  cUSD: {
    ...FONTS.h2,
    color: COLORS.textPrimary,
    fontWeight: "bold",
    marginTop: 2,
  },

  loadingMessage: {
    ...FONTS.body4,
    marginTop: 2,
    marginBottom: 10,
  },
  loadingDiv: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
  },
});
