import React , {useState, Fragment, useRef} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Switch } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { FONTS } from "../../styles/fonts/fonts";
import COLORS from "../../styles/colors/colors";
import ScreenComponent from '../../containers/ScreenComponent';
import MenuIcon from '../../assets/icons/MenuIcon';
import { PortalProvider } from "@gorhom/portal";
import ResetAccountSheet from '../../components/cards/BottomSheets/ResetAccountSheet';


export default function SettingsScreen({navigation}) {
  const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [isEnabled2, setIsEnabled2] = useState(false);
    const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
    const modalRef = useRef<any>();
    const closeModal = () => {
        modalRef.current?.close();
    }
    const openModal = () => {
            modalRef.current?.open();
    };
    return (
        <PortalProvider>
             <Fragment>
        <ScreenComponent>
            <View style={styles.settingsContainer}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MenuIcon/>
          </TouchableOpacity>
                <Text style={styles.headerText}>Settings</Text>
            </View>
            <ScrollView style={{ flex: 1, width: '100%' }} >
                <View style={styles.settingsListContainer}>
                    <View style={styles.settingsHeadingDivider} />
                    <TouchableOpacity 
                    activeOpacity={0.6} 
                    onPress={() => navigation.navigate("EditProfile")}>
                    <Text style={styles.button}>Edit Profile</Text>
                    </TouchableOpacity>
                    <View style={styles.settingsListDivider} />
                    <TouchableOpacity activeOpacity={0.6}>
                    <Text style={styles.button}>Connect phone number</Text>
                    </TouchableOpacity>
                    <View style={styles.settingsListDivider} />
                    <TouchableOpacity 
                    onPress={() => navigation.navigate("Select Language")} 
                    activeOpacity={0.6} 
                    style={styles.wideButtons}>
                      <Text style={styles.button}>Language</Text>
                       <Text style={styles.textButton}>English</Text>
                    </TouchableOpacity>
                    <View style={styles.settingsListDivider} />
                    <TouchableOpacity 
                    activeOpacity={0.6}
                    style={styles.wideButtons}
                    onPress={() => navigation.navigate("Select Currency")}
                    >
                      <Text style={styles.button}>Currency</Text>
                       <Text style={styles.textButton}>Ksh</Text>
                    </TouchableOpacity>
                    <View style={styles.settingsListDivider} />
                    <TouchableOpacity 
                    onPress={() => navigation.navigate("Connected Dapps")}
                    activeOpacity={0.6}
                    style={styles.wideButtons}>
                      <Text style={styles.button}>Connected Dapps</Text>
                       <Text style={styles.textButton}>0</Text>
                    </TouchableOpacity>
                    <View style={styles.settingsListDivider} />
                    <Text style={styles.walletText}>Wallet</Text>
                    <View style={styles.settingsListDivider} />
                    <TouchableOpacity activeOpacity={0.6}
                    onPress={() => navigation.navigate("AccountInfo")}>
                        <Text style={styles.button}>Account Address</Text>
                    </TouchableOpacity>
                    <View style={styles.settingsListDivider} />    
                    <TouchableOpacity activeOpacity={0.6}
                     onPress={() => navigation.navigate("EnterPin")}
                    >
                       <Text style={styles.button}> Recovery Phrase </Text>
                    </TouchableOpacity>
                    <View style={styles.settingsListDivider} />
                    <Text style={styles.security}>Security and Data</Text>
                    <View style={styles.settingsListDivider} />
                    <TouchableOpacity activeOpacity={0.6}>
                    <Text style={styles.button}>Change Pin</Text>
                    </TouchableOpacity>
                    <View style={styles.settingsListDivider} />
                    <View style={styles.switchSettingContainers}>
                        <Text style={styles.button}>Require PIN on App Open</Text>
                        <View style={styles.settings}>
                            <Switch
                                trackColor={{ false: COLORS.grayLightest, true: COLORS.textColor4 }}
                                thumbColor={isEnabled ? COLORS.grayLightest1 : COLORS.grayLightest1}
                                ios_backgroundColor="#D0D0D0"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                    </View>
                    <View style={styles.textDivider} />
                    <View style={styles.switchSettingContainers}>
                        <Text style={styles.button}>Share Analytics</Text>
                        <View style={styles.settings}>
                            <Switch
                                trackColor={{ false: COLORS.grayLightest, true: COLORS.textColor4 }}
                                thumbColor={isEnabled2? COLORS.grayLightest1 : COLORS.grayLightest1}
                                ios_backgroundColor="#D0D0D0"
                                onValueChange={toggleSwitch2}
                                value={isEnabled2}
                            />
                        </View>
                    </View>
                    <View style={styles.settingsListDivider} />
                    <Text style={styles.walletText}>Legal</Text>
                    <View style={styles.settingsListDivider} />
                    <Text style={styles.button}>Licenses</Text>
                    <View style={styles.textDivider} />
                    <Text style={styles.button}>Terms of service</Text>
                    <View style={styles.textDivider} />
                    <Text style={styles.button}>Privacy Policy</Text>
                    <View style={styles.settingsListDivider} />
                    <TouchableOpacity activeOpacity={0.6}
                    onPress={() => openModal()}
                    >
                    <Text style={styles.reset}>Reset Wakala</Text>
                    </TouchableOpacity>
                    <View style={styles.resetTextContainer}>
                        <Text style={styles.resetText}>
                            Resetting will remove your account from this device. Your funds will remian in the acount, but will only be accessible with your account key.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </ScreenComponent>
        </Fragment>
        <ResetAccountSheet 
      modalRef={modalRef}
      onClose={closeModal}/>
    </PortalProvider>
    );
}

const styles = StyleSheet.create({
settingsHeadingDivider:{
    width: '100%',
    height: RFPercentage(0.1),
    backgroundColor: COLORS.dividerLine,
    marginTop: RFPercentage(8),
    opacity:0.3
},
headerText:{
    ...FONTS.h3,
    color: COLORS.textPrimary,
    marginLeft:'auto',
},
settingsContainer:{
    paddingLeft:'5%',
    width: '50%',
    flexDirection: 'row',
    marginTop: RFPercentage(3),
    marginLeft: RFPercentage(3)  
},
imageIcon:{
    width: RFPercentage(3),
    height: RFPercentage(3),
    paddingLeft:'5%',
    resizeMode:'cover',
},
settingsListContainer:{
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: RFPercentage(1),
},
button: {
    ...FONTS.body1,
    marginTop: RFPercentage(2.6),
    marginLeft: RFPercentage(6),
    color: COLORS.textColor4,
},

textDivider:{
    width: '100%',
    height: RFPercentage(0.08), 
    backgroundColor: COLORS.dividerLine, 
    marginTop: RFPercentage(2.8),
    opacity:0.3

},

settingsListDivider: {
    width: '100%',
    height: RFPercentage(0.1), 
    backgroundColor: COLORS.dividerLine, 
    marginTop: RFPercentage(2.8),
    opacity:0.3

},
wideButtons:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    width:"100%"},

settings:{
    position: 'absolute', 
    right: RFPercentage(2), 
    top: RFPercentage(2)

},

switchSettingContainers:{
    width: '100%', 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    flexDirection: 'row'

},resetTextContainer:{
    marginBottom: RFPercentage(15),
    marginTop: RFPercentage(3),
    alignSelf: 'center',
    width: '80%', 
    justifyContent: 'center',
    alignItems: 'flex-start' 
},
resetText:{
    ...FONTS.body1,
    color: COLORS.textPrimary,
    fontSize: RFPercentage(2),
    marginLeft: RFPercentage(1),
},
reset:{
    ...FONTS.body1,
    marginTop: RFPercentage(5),
    marginLeft: RFPercentage(6),
    color: COLORS.textColor4,
   
},
security:{
    ...FONTS.body1,
    fontWeight:'bold',
    marginTop: RFPercentage(5), 
    marginLeft: RFPercentage(6),
    color: COLORS.textColor4,
   
},
walletText:{
    ...FONTS.body1,
    fontWeight:'bold',
    color: COLORS.textColor4,
     marginTop: RFPercentage(5),
     marginLeft: RFPercentage(6),
     
     },
textButton:{
    ...FONTS.body4,
    color:COLORS.grayLighter,
    marginTop: RFPercentage(2.6),
    marginRight: RFPercentage(6),
}
})