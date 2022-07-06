import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Share,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import DefaultButton from "../../../components/buttons/MainButtons/DefaultButton";
import ScreenComponent from "../../../containers/ScreenComponent";
import COLORS from "../../../styles/colors/colors";
import { FONTS } from "../../../styles/fonts/fonts";
import WakalaContractKit from "../../../utils/smart_contract_integration/WakalaContractKit";
import NavHeader from "../../../containers/NavHeader";
import QRCode from 'react-native-qrcode-svg';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function AccountAddress({ navigation }) {
  const publicAddress =WakalaContractKit.getInstance()?.userMetadata?.publicAddress;
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${publicAddress}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          return;
        } else {
          return;
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Copying failed");
      }
    } catch (error) {
      console.warn("Cannot Copy");
    }
  };
  return (
    <ScreenComponent>
     <NavHeader
          hideBackButton={false}
          showTitle={true}
          newTitle="Account Address"
      />
    <View style={styles.midContainer}>
      <Text style={styles.scanText}>Scan the QR code to Recieve address</Text>
      <View style={styles.qrContainer}>
      <QRCode
                size={200}
                value={publicAddress}
            />

      </View>
    </View>
    <Text style={styles.or}>Or</Text>
    <View style={styles.settingsListDivider} />
    <View style={styles.addressContainer}>
        <Text style={styles.yourAddress}>Your  Address</Text>
        <View style={styles.textContainer}>
          <Text style={styles.addressText}>N3veRg0nnAgiV3y0uUpn3v3rg0nn4L3ty0ud0wn</Text>
        </View>
    </View>
      <Pressable style={styles.shareButton} onPress={onShare}>
        <Text style={styles.shareButtonTxt}>Copy</Text>
      </Pressable>
      <View style={styles.bottomBtn}>
        <DefaultButton
          text="Okay"
          onPress={() => navigation.navigate("Settings")}
          style={styles.button}
        />
      </View>
    </ScreenComponent>
  );
}

export default AccountAddress;
const styles = StyleSheet.create({
  or:{
    alignSelf:"center",
    marginTop: RFPercentage(2.8),
    ...FONTS.s3, 
    color:COLORS.textDarker
  },
  midContainer:{
    alignSelf:"center",
    marginTop:hp("2%"),
  },
  scanText:{
    ...FONTS.body7,
    color:COLORS.textDarker,
    alignSelf:"center"
  },
  button: {
    fontSize: RFPercentage(3),
    flex: 1,
    height: RFPercentage(7),
    width: RFPercentage(30),
    borderRadius: RFPercentage(5),
    alignItems: "center",
  },
  bottomBtn: {
    position: "absolute",
    bottom: RFPercentage(10),
    left: RFPercentage(10),
  },
  qrContainer:{
    marginTop:hp("2%"),
    backgroundColor:COLORS.white,
    padding:wp("5%"),
    alignSelf:"center"
  },
  textContainer: {
    alignSelf: "center",
    marginTop: RFPercentage(5),
    width: "80%",
    backgroundColor: COLORS.white,
    padding:wp("2%"),
    paddingVertical:hp("2%"),
    borderRadius: RFPercentage(1),
    borderWidth:1,
    borderColor:COLORS.grayLighter,
  },
  addressContainer: {
    marginTop:hp("2%"),
    alignItems: "center",
  },
  address: {
    ...FONTS.body4,
    color: COLORS.textColor2,
    fontSize: RFPercentage(2.2),
  },
  addressWrapper: {
    width: "90%",
    marginTop: RFPercentage(7),
  },
  shareButton: {
    borderColor: COLORS.black,
    borderWidth: 0.2,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 3,
    marginRight: 13,
    backgroundColor: COLORS.white,
    width: 80,
    height: 30,
    alignSelf: "center",
    marginTop: 20,
    justifyContent: "center",
  },
  shareButtonTxt: {
    alignSelf: "center",
    ...FONTS.body8,
    color: COLORS.textPrimary,
  },
  settingsListDivider: {
    width: '100%',
    height: RFPercentage(0.1), 
    backgroundColor: COLORS.dividerLine, 
    opacity:0.3

},
yourAddress:{
  ...FONTS.body7,
  color:COLORS.textDarker,
  alignSelf:"center"
},
addressText:{
  ...FONTS.headline,
  color:COLORS.textDarker,
  alignSelf:"center"
}
});
