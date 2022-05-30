import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import DefaultButton from "../../components/buttons/DefaultButton";
import ScreenComponent from "../../containers/ScreenComponent";
import { IStackScreenProps } from "../../navigation/StackScreenProps";
import { FONTS, SIZES } from "../../styles/fonts/fonts";
import NavHeader from "../../containers/NavHeader";
import COLORS from "../../styles/colors/colors";

const SignUpScreen: React.FunctionComponent<IStackScreenProps> = (props) => {

  const createAccount = () => {
    console.log("createAccount()====>");
    props.navigation.navigate("TermsAndConditionsScreen");
  };

  // Logout of session
  const restoreAccount = async () => {
    console.log("restoreAccount()====>");
    props.navigation.navigate("TermsAndConditionsScreen")
  };

 
  return (
    
    <ScreenComponent>
        <NavHeader />
        <View style={styles.titleSection}>
            <Image
                source={require("../../assets/icons/icon.png")}
                style={styles.icon}
              />
            <Text style={styles.headerTitle}>
              Welcome to Wakala
              {`\n`}
              lorem ipsum 
            </Text>

            <Text style={styles.titleDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in ligula tellus. Morbi at velit tincidunt, facilisis nunc at, consectetur leo.
            </Text>
          </View>
        
        <View style = {{ flex: 0.5, justifyContent: 'flex-end',  }}>
          <DefaultButton onPress={createAccount} style={styles.createAccountBtn} text={"Create new account"}/>

          <DefaultButton onPress={restoreAccount} style={styles.createAccountBtn} text={"Restore my account"}/>
        </View>

    </ScreenComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    height: SIZES.height,
  },
  headerTitle: {
    ...FONTS.displayBold,
    color: COLORS.primary,
  },
    titleDescription: {
      ...FONTS.body4,
      color: COLORS.textDarkBlue,
      marginVertical: 20
  },
  restoreAccountBtn: {
    width: SIZES.width * 0.7,
    marginTop: SIZES.height * 0.2
  },
  titleSection: {
      // marginVertical: SIZES.height * 0.05,
      flex: 0.4,
      marginTop: SIZES.height * 0.05,
      marginHorizontal: 0.08 * SIZES.width,
      justifyContent: 'flex-end'
  },
  icon: {
    width: 40,
    height: 40,
    marginVertical: 20
  },
  createAccountBtn: {
    width: SIZES.width * 0.7,
},
});

export default SignUpScreen;
