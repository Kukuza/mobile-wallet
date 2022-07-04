import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenComponent from '../../../containers/ScreenComponent';
import COLORS from '../../../styles/colors/colors';
import QRCode from 'react-native-qrcode-svg';
import WakalaContractKit from "../../../utils/smart_contract_integration/WakalaContractKit";


export default function QrGenerator() {
  const publicAddress = WakalaContractKit.getInstance()?.userMetadata?.publicAddress;
  return (
    <ScreenComponent>
      <View style={styles.container}>
        <View style={styles.wrapper}>
            <View style={styles.qrImage}>
            <QRCode
                size={200}
                value={publicAddress}
            />
            </View>
        </View>
      </View>
    </ScreenComponent>
  )
}

const styles = StyleSheet.create({
    container:{
        height:"100%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    wrapper:{
        width:"70%",
        aspectRatio:1/1,
        backgroundColor:COLORS.white,
        justifyContent:"center",
        alignItems:"center"
    },
    qrImage:{
        height:"90%",
        display:"flex",
        width:"90%",
        justifyContent:"center",
        alignItems:"center"
    }
})