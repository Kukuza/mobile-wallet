import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import RampSdk from '@ramp-network/react-native-sdk';
import DefaultButton from '../../components/buttons/MainButtons/DefaultButton';
import { SIZES } from '../../styles/fonts/fonts';

export default function RampScreen() {
  const ramp = new RampSdk({
    url: 'https://ri-widget-staging.firebaseapp.com',
    hostAppName: 'Kukuza',
    hostLogoUrl: 'https://ik.imagekit.io/w2sdlht165/icon_1rtwjyhtWH.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652964172127',
    defaultAsset: 'CELO_CUSD',
    swapAsset: 'CELO_CUSD,CELO_CEUR,CELO_CELO'
  }).on('*', (event) => {
    console.log(`RampSdk.on('*')`, event);
  });

  return (
    <View style={styles.container}>
      <DefaultButton text={`Ksh To cUSd`} onPress={() => ramp?.show()} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: SIZES.width * 0.6
  }
});