import "./global";
import "node-libs-react-native/globals";
import "react-native-gesture-handler";
import { View } from "react-native";
import React, { useState, useEffect } from "react";
import store  from './src/store'
import { Provider } from 'react-redux';

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
import "react-native-gesture-handler";
import AppLoading from "expo-app-loading";
import TipProvider from "react-native-tip";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import routes from "./src/navigation/Routes";
import { LogBox } from "react-native";
import { MNEMONIC_STORAGE_KEY } from './src/redux/auth/auth.utils'
import { retrieveStoredItem } from "./src/redux/auth/session.key.storage.utils";
LogBox.ignoreLogs([
  "Warning: The provided value 'moz",
  "Warning: The provided value 'ms-stream",
]);

const Stack = createStackNavigator();
const App = () => {
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
  let [isReady, setReady] = React.useState(false);

  const [loading, setLoading] = useState(true);
  const [onboarded, setOnboarded] = useState(false);

  const loadAppSession = async () => {
    try {
      //return true;
    } catch (err) {
      console.log(err);
     //return true;
    }
  };

  const hasOnboarded = async () => {
    try {
      const mnemonic = await retrieveStoredItem(
        MNEMONIC_STORAGE_KEY
        );
      if (mnemonic) setOnboarded(true);
    } catch (error) {
      console.error("checkOnboarding: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {hasOnboarded();}, []);

  /* const Loading = () => {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }; */

  if (!isReady || !fontsLoaded) {
    return (
      <AppLoading
        startAsync={loadAppSession}
        onFinish={() => setReady(true)}
        onError={console.warn}
        autoHideSplash={true}
      />
    );
  } else {
    return (
      <Provider store = { store }>
        <NavigationContainer>
          {/* <Screens /> */}
          <Stack.Navigator
            initialRouteName= { onboarded ? "LanguagesList" : "LanguagesList" } //MyDrawer
            screenOptions={{ headerShown: false }}
          >
            {routes.map((r, i) => (
              <Stack.Screen key={i} name={r.name} component={r.component} />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
        <View>
        </View>
        <TipProvider/>
      </Provider>
    );
  }
};

export default App;
