import React, { useState, useRef } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ScreenComponent from "../../containers/ScreenComponent";
import { COLORS } from "../../styles/colors/colors";
import { FONTS, SIZES } from "../../styles/fonts/fonts";
import PhoneInput from "react-native-phone-number-input";
import { magic } from "../../utils/magic";
import WakalaContractKit from "../../utils/Celo-Integration/WakalaContractKit";
import NavHeader from "../../containers/NavHeader";
const AuthScreen = (props) => {
  const navigation = props.navigation;
  //todo Remove this
  // const clearOnboarding = async () => {
  //   try {
  //     await AsyncStorage.removeItem("@viewedOnboarding");
  //   } catch (error) {
  //     console.log("Error @clearOnboarding: ", error);
  //   }
  // };
  const [value, setValue] = useState("");
  const [valid, setValid] = useState<boolean | any>(true);
  const [submitted, SetSubmitted] = useState(false);

  if (!WakalaContractKit?.getInstance()) {
    WakalaContractKit?.createInstance(magic);
  }

  const wakalaContractKit = WakalaContractKit.getInstance();
  const phoneInput = useRef<PhoneInput>(null);

  const login = async () => {
    try {
      const isValid = phoneInput.current?.isValidNumber(value);
      setValid(isValid);
      SetSubmitted(!submitted);
      console.log("Load data ====>");
      if (isValid) {
        Keyboard.dismiss();
        let DID = await magic.auth.loginWithSMS({
          phoneNumber: value, //pass the phone input value to get otp sms
        });

        // Consume decentralized identity (DID)
        if (DID !== null) {
          magic.user.getMetadata().then((userMetadata) => {
            wakalaContractKit?.setUserMetadata(userMetadata);
          });
        }

        let x = await magic.user.getMetadata();
        if (x) {
          wakalaContractKit?.setUserMetadata(x);
        }
        await wakalaContractKit?.init();
        navigation.navigate("MyDrawer");
      } else {
        setTimeout(() => {
          setValid(true);
        }, 2000);
      }
    } catch (err) {
      alert(err);
    }
  };
  // Logout of Magic session
  const logout = async () => {
    await magic.user.logout();
    WakalaContractKit.destroyInstance();
    console.log("logged out");
  };
  const title = "Join Wakala";
  const subTitle = "Enter your phone number to join or log in.";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScreenComponent>
        <NavHeader />
        <View style={styles.container}>
          <View style={{ marginHorizontal: 30 }}>
            <Text style={styles.headerTitle}>{title}</Text>
          </View>
          <Text style={{ ...FONTS.body3, marginHorizontal: 30, marginTop: 80 }}>
            {subTitle}
          </Text>
          <View style={{ marginHorizontal: 30, marginTop: 20 }}>
            <PhoneInput
              ref={phoneInput}
              defaultValue={value}
              defaultCode="KE"
              onChangeFormattedText={(text) => {
                setValue(text);
              }}
              withDarkTheme
              withShadow
              autoFocus
            />
          </View>
          <View style={{ marginTop: 150, alignItems: "center" }}>
            <TouchableOpacity onPress={() => login()}>
              <LinearGradient
                colors={COLORS.gradientBackground}
                start={[1, 0]}
                end={[0, 1]}
                style={styles.button}
              >
                <Text style={styles.buttonText}>
                  {submitted ? "Logging in..." : "Verify"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* todo Remove logout
          <View style={{ marginTop: 20, alignItems: "center" }}>
            <TouchableOpacity onPress={() => logout()}>
              <LinearGradient
                colors={COLORS.gradientBackground}
                start={[1, 0]}
                end={[0, 1]}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Logout</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View> */}

        </View>
      </ScreenComponent>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    ...FONTS.displayBold,
    color: COLORS.primary,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    height: 56,
    width: 286,
  },

  buttonText: {
    textAlign: "center",
    color: COLORS.white,
    ...FONTS.h4,
  },
});

export default AuthScreen;
