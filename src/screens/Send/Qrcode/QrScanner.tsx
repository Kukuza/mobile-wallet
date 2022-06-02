import { StyleSheet, Text, View,Button } from 'react-native'
import React, {useState, useEffect} from 'react'
import ScreenComponent from '../../../containers/ScreenComponent'
import COLORS from '../../../styles/colors/colors';
import { FONTS, SIZES } from '../../../styles/fonts/fonts';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';

const finderWidth: number = 280;
const finderHeight: number = 230;
const width = SIZES.width;
const height = SIZES.height;
const viewMinX = (width - finderWidth) / 2;
const viewMinY = (height - finderHeight) / 2;

export default function QrScanner({navigation}) {
      const [hasPermission, setHasPermission] = useState<boolean | null>(null);
      const [scanned, setScanned] = useState<boolean>(false);
      
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = (scanningResult: BarCodeScannerResult) => {
    if (!scanned) {
                  const {type, data, bounds: {origin} = {}} = scanningResult;
                  // @ts-ignore
                  const {x, y} = origin;
                  if (x >= viewMinX && y >= viewMinY && x <= (viewMinX + finderWidth / 2) && y <= (viewMinY + finderHeight / 2)) {
                     if(data === ""){
                      return
                     } else {
                      navigation.navigate('EnterAmount', {
                        recieversName: "Kiokokioko",
                        recieversPhoneNumber:"0715278283"
                      }) 
                     }
                  }
              }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <ScreenComponent>
      <View style={styles.container}>
        <BarCodeScanner
        type={BarCodeScanner.Constants.Type.back}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      >
        <View style={styles.layerTop} />
        <View style={styles.layerCenter}>
          <View style={styles.layerLeft} />
          <View style={styles.focused} />
          <View style={styles.layerRight} />
        </View>
        <View style={styles.layerBottom}>
          <Text style={styles.Text}>Center code in the box above</Text>
          </View>
      </BarCodeScanner>
        </View>
    </ScreenComponent>
  )
}

const opacity = '#F7EFFA';
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
    Text:{
      marginTop:"10%",
      ...FONTS.headline,
      color:COLORS.textPrimary,
      alignSelf:"center"
    },
    layerTop: {
      flex: 1.1,
      backgroundColor: opacity
    },
    layerCenter: {
      flex: 1,
      flexDirection: 'row'
    },
    layerLeft: {
      flex: 1,
      backgroundColor: opacity
    },
    focused: {
      flex: 8,
      height:finderHeight,
      width:finderWidth
    },
    layerRight: {
      flex: 1,
      backgroundColor: opacity
    },
    layerBottom: {
      flex: 1.1,
      backgroundColor: opacity,
    },
})