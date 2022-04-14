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
import HeaderTitle from "../../components/HeaderTitle";
import { connect, useDispatch } from "react-redux";
import { magic } from "../../utils/magic";
import WakalaContractKit from "../../utils/Celo-Integration/WakalaContractKit";
const AuthScreen = (props) => {
  const dispatch = useDispatch();
  const [user, setUser] = React.useState({});
  // const { navigation, route, magic } = props;
  // const magic = props.magic;
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
  const [formattedValue, setFormattedValue] = useState("");
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
            setUser(userMetadata);
            wakalaContractKit?.setUserMetadata(userMetadata);
            dispatch({
              type: "LOGIN",
              payload: { phoneNumber: value, userMetadata: userMetadata },
            });
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

      console.log("works");
      // navigation.navigate("MyDrawer");
    } catch (err) {
      console.log("AuthScreen", err);
      console.error(err);

      alert(err);
    }
  };
  // Logout of Magic session
  const logout = async () => {
    await magic.user.logout();
    // setUser("");
    WakalaContractKit.destroyInstance();
    console.log("logged out");
  };
  const title = "Join Wakala";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
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
            onChangeFormattedText={(text) => {
              setValue(text);
            }}
            withDarkTheme
            withShadow
            autoFocus
          />
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

          {/* todo Remove logout */}
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

          <magic.Relayer />
        </View>
      </ScreenComponent>
    </KeyboardAvoidingView>
  );
};
const mapStateToProps = (state) => {
  return {
    magic: state.magic,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: async (action) => {
      await dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);

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
    width: 200,
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

// export default AuthScreen;
