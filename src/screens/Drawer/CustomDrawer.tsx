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
import Storage from "../../utils/Storage";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { FONTS, SIZES } from "../../styles/fonts/fonts";
import { COLORS } from "../../styles/colors/colors";
import { EventData } from "web3-eth-contract";
import { useDispatch, useSelector } from "react-redux";
import { getBalance }  from '../../store/Wallet';
import { getCurrency } from "../../store/Currency";
import { ICurrency } from "../../interfaces/ICurrency";
import Blockie from "../../assets/icons/Blockie";
import ReadContractDataKit from "../../utils/smart_contract_integration/read_data_utils/ReadContractDataKit";
import { ContractEventsListenerKit } from "../../utils/smart_contract_integration/read_data_utils/WakalaContractEventsKit";
import WriteContractDataKit from "../../utils/smart_contract_integration/write_data_utils/WriteContractDataKit";
import { ProfileKey } from "../../enums/ProfileKey";
import CurrencyLayerAPI from "../../utils/currencyLayerUtils";

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {

  const readDataContractKit = ReadContractDataKit.getInstance();
  const contractEventListenerKit = ContractEventsListenerKit.getInstance();

  const [balance, setBalance] = useState("--");
  const [kshBalance, setKshBalance] = useState("--");
  const loading = false;
  const loadingMessage = "Loading...";
  const dispatch = useDispatch();
  // const _bal: number = useSelector((state: any) => state.wallet.balance);

  // const convert: ICurrency = {
  //   from: "usd", 
  //   to: "kes", 
  //   amount: _bal
  // }

  const _local: number = useSelector((state: any) => state.currency.data);
  
  useEffect(() => {
    dispatch(getBalance());
    // dispatch(getCurrency(convert));
    walletBalance();
  }, []);

  const walletBalance = async () => {
    //Convert to local currency

    const profile: IProfile = await Storage.get(ProfileKey.PROFILE_KEY);
    const publicAddress = profile.publicAddress;  
    const balances = await readDataContractKit?.getCurrentAccountBalance(publicAddress);
    let money: any = balances?.cUSD;
    // change balance to cUSD.
    let amount = readDataContractKit?.kit?.web3.utils.fromWei(money?.toString(), "ether");
    const balance = Number(amount);
    console.log("Tx public address: ", publicAddress, balance);

    
    const visibleAmount = balance.toFixed(2);
      
    if(balance > 0) {
      setBalance(visibleAmount); 
      /*TODO: 
        factor in other local currencies eg. Naira
        currently fixed to usd to kes
        */
      const convert = new CurrencyLayerAPI();
      const kshBalance = await convert.usdToKsh(balance);
      setKshBalance(kshBalance.toFixed(2));
    }else {
      setBalance('--');
      setKshBalance('--');
    }
  };

  // listen for transaction completion event and update balance.
  contractEventListenerKit.wakalaEscrowContract?.once(
    "TransactionCompletionEvent",
     (error: Error, event: EventData) => {
      walletBalance();
    }
  );

  // listen for transaction initialization event and update balance.
  contractEventListenerKit.wakalaEscrowContract?.once(
    "TransactionInitEvent",
    (error: Error, event: EventData) => {
      walletBalance();
    }
  );

  let phoneNumber = "";

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
            <Blockie style={styles.identiconImg}/>

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
    ...FONTS.body4,
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
