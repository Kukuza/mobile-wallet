import { View, StyleSheet, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import ScreenComponent from '../../containers/ScreenComponent'
import CardImage from '../../components/cards/CardImage';
import configs from '../../configs';
import { IStackScreenProps } from "../../navigation/StackScreenProps";
import { useDispatch, useSelector } from 'react-redux';
import Profile, { getProfile, saveProfile, INITIAL_STATE }  from '../../store/Profile';
import DeleteIcon from '../../assets/icons/DeleteIcon';
import InfoIcon from '../../assets/icons/InfoIcon';
import MenuIcon from '../../assets/icons/MenuIcon';
import BackIcon from '../../assets/icons/BackIcon';
import CopyIcon from '../../assets/icons/CopyIcon';
import LoaderIcon from '../../assets/icons/LoaderIcon';
import SendIcon from '../../assets/icons/SendIcon';
import HideIcon from '../../assets/icons/HideIcon';
import QrIcon from '../../assets/icons/QrIcon';
import ShareIcon from '../../assets/icons/ShareIcon';
import CancelIcon from '../../assets/icons/CancelIcon';
import PasswordIcon from '../../assets/icons/PasswordIcon';
import { COLORS } from '../../styles/colors/colors';

const LanguagesList: React.FunctionComponent<IStackScreenProps> = (props) => {
  
  const languages = configs.LANGUAGES ?? [];
  const { navigation, route } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile())
  }, [])

  const profile: IProfile = useSelector((state: any) => state.profile.data);

  const handleSelect = (code: string) => {
    let p: any;

    if(profile) {
      p = {
        name: profile.name,
        phoneNumber: profile.phoneNumber,
        email: profile.email,
        locale: profile.locale,
        language: code,
        publicAddress: profile.publicAddress,
        registered: false,
        mnemonic: profile.mnemonic,
        currencyCode: profile.currencyCode
      }
    }else {
      p = INITIAL_STATE;
      p.locale = code;
    }

    dispatch(saveProfile(p));
    navigation.navigate("Onboarding");
  }

  return (
    <ScreenComponent>
        <View style={styles.container}>
        <View style={styles.list}>
          <View style={{display:"flex", flexDirection:"row"}}>
          <DeleteIcon/>
          <MenuIcon/>
          <BackIcon/>
          <HideIcon/>
          <QrIcon/>
          <ShareIcon/>
          <InfoIcon/>
          <SendIcon/>
          <CopyIcon/>
          <LoaderIcon/>
          <PasswordIcon color={COLORS.primary}/>
          <CancelIcon/>
          </View>
          <FlatList
            data={languages}
            renderItem={({ item }) => (
              <CardImage 
                  text={item.name}
                  imgSrc={item.image} 
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
}

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
      marginTop: '60%'
    }
});

export default LanguagesList;