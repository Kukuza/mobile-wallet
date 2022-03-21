import 'react-native-gesture-handler';

import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import Onboarding from "./src/screens/Onboarding/Onboarding";
import AuthScreen from "./src/screens/Auth/AuthScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Rubik_300Light,
  Rubik_300Light_Italic,
  Rubik_400Regular,
  Rubik_400Regular_Italic,
  Rubik_500Medium,
  Rubik_500Medium_Italic,
  Rubik_700Bold,
  Rubik_700Bold_Italic,
  Rubik_900Black,
  Rubik_900Black_Italic,
} from "@expo-google-fonts/rubik";
import { useFonts } from "expo-font";
import HeaderTitle from "./src/components/HeaderTitle";
import "react-native-gesture-handler";
import { FONTS } from "./src/assets/fonts/fonts";
import AppLoading from "expo-app-loading";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import routes from "./src/navigation/Routes";
import MyDrawer from './src/screens/Drawer/MyDrawer';

const Stack = createStackNavigator();

const Loading = () => {
  return (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default function App() {
  let [fontsLoaded] = useFonts({
    Rubik_500Medium,
    Rubik_300Light,
    Rubik_300Light_Italic,
    Rubik_400Regular,
    Rubik_400Regular_Italic,
    Rubik_500Medium_Italic,
    Rubik_700Bold,
    Rubik_700Bold_Italic,
    Rubik_900Black,
    Rubik_900Black_Italic,
  });
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("@viewedOnboarding");

      if (value !== null) {
        setViewedOnboarding(true);
      }
    } catch (error) {
      console.log("Error @checkOnboarding: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
     <NavigationContainer>
    
      {loading ? (
         <Loading />
      ) : viewedOnboarding ? (
         <AuthScreen />
      ) : (
        <MyDrawer></MyDrawer>
      )}

    </NavigationContainer>
  );
}