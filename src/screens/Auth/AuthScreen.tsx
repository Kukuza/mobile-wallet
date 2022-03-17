import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ScreenComponent from "../../components/ScreenComponent";
import { COLORS } from "../../assets/styles/colors";
import { FONTS, SIZES } from "../../assets/fonts/fonts";
import PhoneInput from "react-native-phone-number-input";
import HeaderTitle from "../../components/HeaderTitle";
import { Magic } from "@magic-sdk/react-native";

export default function AuthScreen() {
  //todo Remove this
  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem("@viewedOnboarding");
    } catch (error) {
      console.log("Error @clearOnboarding: ", error);
    }
  };
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
  // magic
  const magicClient = new Magic("pk_live_5B2A9951805695BB", {
    network: {
      rpcUrl: "https://alfajores-forno.celo-testnet.org",
    },
  });

  const login = async () => {
    try {
      // todo remove
      const phoneNo = "+254726111690";

      const DID = await magicClient.auth.loginWithSMS({
        phoneNumber: phoneNo,
      });
      console.log("Works");

      //   magicClient.user.getMetadata().then(setUser);
    } catch (err) {
      alert(err);
    }
  };
  const title = "A community \nthat you \nwill love.";

  return (
    <ScreenComponent>
      <View style={styles.wrapper}>
        <HeaderTitle title={title} />
        <Text style={{ ...FONTS.body3, alignSelf: "center" }}>
          Enter your phone number to join or log in.
        </Text>
        <PhoneInput
          ref={phoneInput}
          defaultValue={value}
          defaultCode="KE"
          layout="first"
          onChangeText={(text) => {
            setValue(text);
          }}
          onChangeFormattedText={(text) => {
            setFormattedValue(text);
          }}
          withDarkTheme
          withShadow
          autoFocus
        />
        <TouchableOpacity onPress={login}>
          <Text>Loginss</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={clearOnboarding}>
            <Text>Clear Onboarding</Text>
        </TouchableOpacity> */}
      </View>
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 40,
  },

  buttonWrapper: {
    width: "100%",
    justifyContent: "flex-start",
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    height: 56,
    width: "100%",
  },

  buttonText: {
    fontSize: 20,
    lineHeight: 23.3,
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Rubik_700Bold",
  },
  orText: {
    textAlign: "center",
    padding: 15,
    color: COLORS.textDarker,
  },
  numberInputBlock: {
    flexDirection: "row",
    width: SIZES.width * 0.8,
    height: 40,
    borderColor: COLORS.textDarker,
    backgroundColor: COLORS.textDarker,
  },
  countryInput: {
    width: SIZES.width * 0.15,
    paddingLeft: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: COLORS.textDarker,
  },
  numberInput: {
    width: "80%",
    paddingLeft: 5,
    backgroundColor: COLORS.textDarker,
    borderBottomRightRadius: 10,
  },
  border: {
    backgroundColor: COLORS.textDarker,
    width: 1,
    height: 25,
    alignSelf: "center",
  },
  countrySelectorButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    backgroundColor: "#4840BB",
  },
});
