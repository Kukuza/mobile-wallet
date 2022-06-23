import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DefaultButton from "../../components/buttons/DefaultButton";
import ScreenComponent from "../../containers/ScreenComponent";
import { IStackScreenProps } from "../../navigation/StackScreenProps";
import { FONTS, SIZES } from "../../styles/fonts/fonts";
import NavHeader from "../../containers/NavHeader";
import COLORS from "../../styles/colors/colors";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const SignUpScreen: React.FunctionComponent<IStackScreenProps> = (props) => {

  const createAccount = () => {
    props.navigation.navigate("TermsAndConditionsScreen");
  };

  // Logout of session
  const restoreAccount = async () => {
    props.navigation.navigate("TermsAndConditionsScreen")
  };

  return (
    
    <ScreenComponent>
        <NavHeader />
        <View style={styles.titleSection}>
            <Text style={styles.headerTitle}>
              Prepare to write down {`\n`}your recovery {`\n`}phrase
            </Text>
            <Text style={styles.titleDescription}>
              If your device gets lost or stolen, you can restore your wallet using your recovery phrase.
            </Text>
            <Text style={styles.titleDescription}>
              Get a pen and paper before you start.
            </Text>
          </View>
        
        <View style = {{ flex: 0.5, justifyContent: 'center'}}>
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
      marginVertical:hp("2%")
  },
  titleSection: {
      flex: 0.7,
      marginTop: hp("5%"),
      marginHorizontal: wp("8%"),
      justifyContent: 'flex-end'
  },
  icon: {
    width: 40,
    height: 40,
    marginVertical:hp("1%")
  },
  createAccountBtn: {
    width:wp("76%"),
    height:hp("6%"),
    marginVertical:hp("2%")
},
});

export default SignUpScreen;
