import 'react-native-gesture-handler';
import React from 'react';

import MyDrawer from './src/screens/Drawer/MyDrawer';
import { DrawerActions, NavigationContainer, useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from './src/styles/theme';
import { Ionicons } from '@expo/vector-icons';


export default function App() {
  
  const navigation = useNavigation();

  return (
    <NavigationContainer>
        <MyDrawer></MyDrawer>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  menu: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 30,
  },
});