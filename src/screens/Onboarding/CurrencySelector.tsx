import React from "react";
import { StyleSheet, View, Alert, FlatList, Text } from "react-native";
import ScreenComponent from "../../containers/ScreenComponent";
import { IStackScreenProps } from "../../navigation/StackScreenProps";
import configs from '../../configs';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, INITIAL_STATE, saveProfile }  from '../../store/Profile';
import { useEffect } from 'react';
import { FONTS } from "../../styles/fonts/fonts";
import COLORS from "../../styles/colors/colors";
import CardRadio from "../../components/cards/CardRadio";
import NavHeader from "../../containers/NavHeader";

const CurrencySelector: React.FunctionComponent<IStackScreenProps> = (props) => {
  
  const currencies = configs.CURRENCIES ?? [];
  const { navigation, route } = props;
  const dispatch = useDispatch();

  useEffect(() => {dispatch(getProfile())}, []);

  const profile: IProfile = useSelector((state: any) => state.profile.data);
  const handleSelect = async (currencyCode: string) => {
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
          currencyCode: currencyCode,
          recoverySaved: profile.recoverySaved
        }
      }else {
        p = INITIAL_STATE;
        p.currencyCode = currencyCode;
      }

      dispatch(saveProfile(p));
      navigation.navigate("EnterPin")
  };
  
  return (
    <ScreenComponent>
      <NavHeader
          hideBackButton={false}
          showTitle={true}
          newTitle="Step 2 of 8"
        />
      <View style={styles.container}>
        <Text style={styles.title}>Select currency</Text>
        <View style={styles.list}>
          <FlatList
            data={currencies}
            renderItem={({ item }) => (
              <CardRadio 
                  text={item.code}
                  imgSrc={item.symbol} 
                  code={item.code}
                  handleSelect={handleSelect} /> 
            )}
            keyExtractor={(item) => item.code}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderEndWidth: 1,
    borderColor: '#f00'
  },
  list: {
    marginTop: '5%'
  },
  title: {
    marginTop: '15%',
    ...FONTS.body1,
    color: COLORS.black
  },
});

export default CurrencySelector;