import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import QrGenerator from './QrGenerator';
import QrScanner from './QrScanner';
import Animated from 'react-native-reanimated';
import Tabbar from './Tabbar';

const Tab = createMaterialTopTabNavigator();
export default function Qrcode({route, navigation}) {
const {initialRoute} = route.params
  return (
    <Tab.Navigator 
    initialRouteName={initialRoute}
    tabBar={props => <Tabbar {...props} />} 
    >
    <Tab.Screen
     name="MyCode" 
     component={QrGenerator} 
    />
    <Tab.Screen name="Scan" component={QrScanner} />
  </Tab.Navigator>
);
}