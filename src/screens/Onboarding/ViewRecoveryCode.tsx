import { StyleSheet, View, Text, Pressable } from "react-native";
import ScreenComponent from "../../containers/ScreenComponent";
import { FONTS, SIZES } from "../../styles/fonts/fonts";
import { IStackScreenProps } from "../../navigation/StackScreenProps";
import React, { useEffect, useState } from "react";
import DefaultButton from "../../components/buttons//MainButtons/DefaultButton";
import COLORS from '../../styles/colors/colors';
import NavHeader from "../../containers/NavHeader";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useSelector } from "react-redux";
import SwitchButton from "../../assets/icons/SwitchButton";

const ViewRecoveryCode: React.FunctionComponent<IStackScreenProps> = (props) => {
  
  const { navigation, route } = props;
  const [phraseWritten, setPhraseWritten] = React.useState(false);
  const recoveryPhrase = useSelector((state: any) => state.auth.recoveryPhrase);

  //TODO: toggle phraseWritten to enable Continue button
  const continueHandler = () => {
    confirmRecovveryPhrase();
  }

  const pendingHandler = () => {
    console.log("Not yet accepted");
  }

  const getOptionValue = () => {
    setPhraseWritten(!phraseWritten);

    if(phraseWritten) {
      //TODO: enable continue button
      console.log("ENABLED");
    }else {
      //TODO: disable continue button
      console.log("DISABLED");
    }
  }

  const handleAboutRecoveryPhrase = () => {
    navigation.navigate("SetupRecovery");
  };

  const confirmRecovveryPhrase = () => {
    if (recoveryPhrase) {
      //TODO: add recovery confirmation screens
      navigation.navigate("RecoveryPhraseSaved");
    }else {
      navigation.navigate("RecoveryCodePin");
    }
  }

  return (
    <ScreenComponent>
      <NavHeader
          hideBackButton={true}
          showTitle={true}
          newTitle="Step 5 of 8"
      />
      <View style={styles.container}>
        <Text style={styles.title}>Write down your recovery phrase</Text>
        <Text style={styles.titleDescription}>
          Here is your recovery phrase. 
          Write it down and store in a safe place. Do not save it in your phone or your email.
        </Text>
        <Text style={styles.text}>{recoveryPhrase}</Text>
        <View style={styles.accept}>
          
          <View style={styles.acceptItem}>
              <SwitchButton style={styles.acceptRadio} onPress={getOptionValue}/>
              <Text style={styles.acceptText}>Yes, I have written my phrase</Text>
          </View>
          
        </View>
      </View>
      <View style = {{justifyContent: 'center'}}>
        
      { phraseWritten 
        ? <DefaultButton onPress={continueHandler} style={styles.button} text="Continue" /> 
        : <DefaultButton onPress={pendingHandler} style={styles.buttonDisabled} text="Continue" /> 
      }

        <Pressable onPress={handleAboutRecoveryPhrase}>
            <Text style={styles.footer}>
              Learn about your recovery phrase
            </Text>
          </Pressable>

      </View>
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    justifyContent: "center",
    height: SIZES.height,
    marginTop: hp("5%"),
     marginHorizontal: wp("8%")
  },
  title: {
    ...FONTS.body1,
    color: COLORS.black,
    fontWeight: "bold",
    textAlign: "center"
  },
    titleDescription: {
      ...FONTS.body4,
      textAlign: "center",
      color: COLORS.textDarkBlue,
      marginVertical:hp("2%")
  },
  text: {
    height: hp("25%"),
    backgroundColor: '#fff',
    marginTop: hp("4%"),
    padding: 20,
    borderRadius: 15,
    ...FONTS.body1
  },
  accept: {
    marginTop: hp("4%"),
    ...FONTS.body1,
  },
  button: {
    width:wp("76%"),
    height:hp("6%"),
    marginVertical:hp("2%")
},
buttonDisabled: {
  width:wp("76%"),
  height:hp("6%"),
  marginVertical:hp("2%"),
},
footer: {
  ...FONTS.body5,
  marginTop:hp("5%"),
  textAlign: "center",
  color: COLORS.primary
},

acceptItem: {
  width:wp("85%"),
  height:hp("7%"),
  padding:hp("1%"),
  flexDirection: 'row',
  alignItems:"center"
},
acceptRadio: {
  marginRight: '4%',
  width:wp("4.53%"),
  height:wp("4.533")
},
acceptText: {
  ...FONTS.body4,
  color:COLORS.black,
  fontWeight: 'normal'
}
});

export default ViewRecoveryCode;