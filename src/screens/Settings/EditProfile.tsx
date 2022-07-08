import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import ScreenComponent from '../../containers/ScreenComponent'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Blockie from '../../assets/icons/Blockie'
import NormalTextField from '../../components/TextFields/NormalTextField'
import { FONTS } from '../../styles/fonts/fonts'
import COLORS from '../../styles/colors/colors'
import { useDispatch, useSelector } from "react-redux";
import { getProfile, INITIAL_STATE, saveProfile } from "../../store/Profile";

export default function EditProfile({navigation}) {
    const [profileName, setProfileName] = useState("")
    const profile: IProfile = useSelector((state: any) => state.profile.data);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProfile());
      }, []);

      const continueHandler = () => {
        let p: any;
    
        console.log("PROFILE", profile);
          
        if(profile) {
          p = {
            //insert the values to change
            name: profileName ,
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
          p.name = profileName
        }
    
        dispatch(saveProfile(p));
        console.log(p)
        navigation.navigate("Settings");

      }
  return (
    <ScreenComponent>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.editText}>Edit Profile</Text>
            <TouchableOpacity onPress={() => continueHandler()}>
                <Text style = {styles.saveText} >
                    Save
                </Text>
            </TouchableOpacity>
        </View>
      <View style={styles.midContainer}>
            <Blockie/>
      </View>
      <View style={styles.textField}>
      <NormalTextField 
    inputLabel="Full name" 
    onChangeText={setProfileName}
    placeholder={profile?.name}
    keyboardType="email-address"
    />
      </View>
    </ScreenComponent>
  )
}

const styles = StyleSheet.create({
    header:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        marginTop:20
    },
    cancelText:{
        ...FONTS.body7,
        color:COLORS.grayLightest

    },
    editText:{
        ...FONTS.body3,
        color:COLORS.textPrimary
    },
    saveText:{
        ...FONTS.body7,
        color:COLORS.primary
    },
    midContainer:{
        justifyContent:"center",
        alignItems:"center",
        marginTop:"10%",
    },
    textField:{
        justifyContent:"center",
        width:"90%",
        marginTop:"10%",
        alignSelf:"center"
    }
})