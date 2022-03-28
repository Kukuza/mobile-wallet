import "react-native-gesture-handler";

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
import { FONTS } from "./src/styles/fonts/fonts";
import AppLoading from "expo-app-loading";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import routes from "./src/navigation/Routes";
import { Magic } from "@magic-sdk/react-native";
import globalStore from "./src/redux/GlobalStore";
import { createStore } from "redux";
import { Provider } from "react-redux";

const Stack = createStackNavigator();
const store = createStore(globalStore);
const magic = new Magic("pk_live_5B2A9951805695BB", {
  network: {
    rpcUrl: "https://alfajores-forno.celo-testnet.org",
  },
});

const loadAppSession = async () => {
  try {
    let user = await AsyncStorage.getItem("user");
    let data = JSON.parse(user!);
    let action = { type: "INIT", value: { ...data, magic: magic } };
    //console.log(data)
    store.dispatch(action);
    // return true;
  } catch (err) {
    console.log(err);
    // return true;
  }
};

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
  let [isReady, setReady] = React.useState(false);

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
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Onboarding"
            screenOptions={{ headerShown: false }}
          >
            {routes.map((r, i) => (
              <Stack.Screen key={i} name={r.name} component={r.component} />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
