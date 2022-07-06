import React from "react";
import { StyleSheet, View, Text, TextInput, Alert } from "react-native";
import DefaultButton from "../../components/buttons/MainButtons/DefaultButton";
import ScreenComponent from "../../containers/ScreenComponent";
import { IStackScreenProps } from "../../navigation/StackScreenProps";
import COLORS from "../../styles/colors/colors";
import { FONTS, SIZES } from "../../styles/fonts/fonts";
import Validator from "../../utils/Validator";
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, INITIAL_STATE, saveProfile }  from '../../store/Profile';
import { useEffect } from 'react';
import NavHeader from "../../containers/NavHeader";
import { Status } from "../../enums/Status";

const UserDetails: React.FunctionComponent<IStackScreenProps> = (props) => {
  
  const { navigation, route } = props;
  const [name, setName] = React.useState("");
  const [invalid, setInvalid] = React.useState(false);
  const status: string = useSelector((state: any) => state.profile.status);
  const profile: IProfile = useSelector((state: any) => state.profile.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
    setInvalid(false);
  }, []);
  useEffect(() => {nameSaved()}, [profile.name]);

  const nameSaved = () => {
    try {
      if (!Validator.isEmpty(name) 
        && profile && profile.name) 
        navigation.navigate("CurrencySelector");

    } catch (error: Error | any) {
      console.error("nameSaved: ", error);
    }
  };
  
  const moveNext = async () => {
    if(!Validator.isEmpty(name)) {
      let p: any;
      
      if(profile) {
        p = {
          name: name,
          phoneNumber: profile.phoneNumber,
          email: profile.email,
          locale: profile.locale,
          language: profile.language,
          publicAddress: profile.publicAddress,
          registered: profile.registered,
          mnemonic: profile.mnemonic,
          currencyCode: profile.currencyCode,
          recoverySaved: profile.recoverySaved
        }
      }else {
        p = INITIAL_STATE;
        p.name = name;
      }

      dispatch(saveProfile(p));
      nameSaved();
    }else {
      setInvalid(true);
    }
  };

  return (
    <ScreenComponent>
      <NavHeader
        hideBackButton={true}
        showTitle={true}
        newTitle="Step 1 of 8"
      />
      <View style={styles.container}>
          <Text style={styles.title}>How should we call you?</Text>
          <Text style={!invalid ? styles.text : styles.textError}>Please enter your full name below</Text>
          <View style={!invalid ? styles.inputWrapper : styles.inputWrapperError}>
          <Text style={styles.inputLabel}>Full name</Text>
            <TextInput
              style={styles.input}
              onChangeText={setName}
              placeholder="Name"
              keyboardType="name-phone-pad"
              placeholderTextColor={COLORS.grayLightest1}/>
          </View>
      </View>
      
      <DefaultButton onPress={moveNext} style={styles.button} text="Continue"/>
      
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    marginHorizontal: SIZES.width * 0.09,
    marginVertical: SIZES.height * 0.1
  },
  button: {
    width: SIZES.width * 0.6
  },
  title: {
    ...FONTS.displayBold,
    color: COLORS.primary
  },
  text: {
    ...FONTS.s3,
    width: SIZES.width * 0.8,
    marginTop: 20,
    marginBottom: 20,
    color: COLORS.textColor2
  },

  textError: {
    ...FONTS.s3,
    width: SIZES.width * 0.8,
    marginTop: 20,
    marginBottom: 20,
    color: COLORS.error
  },

  inputWrapper: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8
  },

  inputWrapperError: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.error
  },

  inputLabel: {
    ...FONTS.s3,
    marginTop: 5,
    marginBottom: 1,
    color: COLORS.textColor2
  },

  input: {
    paddingHorizontal: 2,
    paddingVertical: 10,
    ...FONTS.body4,
  }
});

export default UserDetails;