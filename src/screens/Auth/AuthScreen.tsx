import { StyleSheet, Text, View, Image,TouchableOpacity } from "react-native";
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
      flex: 0.4,
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
    width:wp("76%%"),
    height:hp("6%"),
    marginVertical:hp("1%")
},
});

export default SignUpScreen;
