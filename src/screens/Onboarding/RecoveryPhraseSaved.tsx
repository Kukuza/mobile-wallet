import { StyleSheet, View, Text, Pressable, Modal, Alert, TextInput, FlatList } from "react-native";
import ScreenComponent from "../../containers/ScreenComponent";
import { FONTS, SIZES } from "../../styles/fonts/fonts";
import { IStackScreenProps } from "../../navigation/StackScreenProps";
import React, { useEffect } from "react";
import DefaultButton from "../../components/buttons//MainButtons/DefaultButton";
import COLORS from '../../styles/colors/colors';
import NavHeader from "../../containers/NavHeader";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from "react-redux";
import Format from "../../utils/Format";
import { getProfile, INITIAL_STATE, saveProfile } from "../../store/Profile";

const SetupRecovery: React.FunctionComponent<IStackScreenProps> = (props) => {
  
  const { navigation, route } = props;
  const [phraseWords, setPhraseWords] = React.useState();
  const recoveryPhrase = useSelector((state: any) => state.auth.recoveryPhrase);
  const profile: IProfile = useSelector((state: any) => state.profile.data);
  const dispatch = useDispatch();

  useEffect(() => {
    separatePhrase();
    dispatch(getProfile());
  }, []);

  useEffect(() => {
    confirmedRecoveryPhrase();
  }, [profile.recoverySaved]);

  const continueHandler = () => {
    let p: any;
      
    if(profile) {
      p = {
        name: profile.name,
        phoneNumber: profile.phoneNumber,
        email: profile.email,
        locale: profile.locale,
        language: profile.language,
        publicAddress: profile.publicAddress,
        registered: profile.registered,
        mnemonic: profile.mnemonic,
        currencyCode: profile.currencyCode,
        recoverySaved: true
      }
    }else {
      p = INITIAL_STATE;
      p.recoverySaved = true;
    }

    dispatch(saveProfile(p));
  }

  const separatePhrase = () => {
    let words:any = Format.toArray(
      recoveryPhrase);
    setPhraseWords(words);
  }

  const confirmedRecoveryPhrase = () => {
    if (profile.recoverySaved) {
      navigation.navigate("ConnectYourPhoneNumberScreen");
    }
  }

  return (
    <ScreenComponent>
      <NavHeader
          hideBackButton={false}
          showTitle={true}
          newTitle="Step 6 of 8"
      />
      <View style={styles.container}>
        <Text style={styles.title}>Recovery phrase</Text>
      </View>
      <View style={styles.textItem}>
      <FlatList
          data={phraseWords}
          numColumns={4}
          renderItem={({ item }) => (
            <Text style={styles.text}>{item}</Text>
          )}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style = {{justifyContent: 'center'}}>
        <DefaultButton onPress={continueHandler} style={styles.button} text="Submit" />
      </View>
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    justifyContent: "center",
    height: SIZES.height,
    marginTop: hp("1%"),
     marginHorizontal: wp("8%")
  },
  title: {
    ...FONTS.body1,
    color: COLORS.black,
    fontWeight: "bold",
    textAlign: "center"
  },
  textItem: {
    flex: 0.7,
    marginTop: hp("2%"),
    marginHorizontal: wp("4%"),
    padding: 5
  },
  text: {
    flex: 1/4,
    backgroundColor: '#fff',
    margin: '1%',
    textAlign: "center",
    padding: 5,
    borderRadius: 15,
    ...FONTS.body7,
  },
  button: {
    width:wp("76%"),
    height:hp("6%"),
    marginVertical:hp("2%")
}
});

export default SetupRecovery;