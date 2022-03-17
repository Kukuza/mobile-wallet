import 'react-native-gesture-handler';
import React from 'react';

import MyDrawer from './src/screens/Drawer/MyDrawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';



export default function App() {
  
  const navigation = useNavigation();

  return (
    <NavigationContainer>
        <MyDrawer></MyDrawer>
    </NavigationContainer>
  );
}