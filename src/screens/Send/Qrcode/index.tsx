import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import QrGenerator from './QrGenerator';
import QrScanner from './QrScanner';
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