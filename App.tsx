import "./global";
import "node-libs-react-native/globals";
import "react-native-gesture-handler";
import { View } from "react-native";
import React, { useState, useEffect } from "react";
import store  from './src/store'
import { Provider } from 'react-redux';
import Storage from "./src/utils/Storage";

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
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import routes from "./src/navigation/Routes";
import { LogBox } from "react-native";
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
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  const loadAppSession = async () => {
    try {
      const data: IProfile = await Storage.get("user");
      console.log("LoadAppSession", data);
      // return true;
    } catch (err) {
      console.log(err);
      // return true;
    }
  };

  const checkOnboarding = async () => {
    try {
      const value: IProfile = await Storage.get("user");
      console.log("CheckOnboarding", value);

      if (value.registered) 
        setViewedOnboarding(true);
    } catch (error) {
      console.error("checkOnboarding: ", error);
    } finally {
      setLoading(false);
    }
  };

  /* const Loading = () => {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }; */

  useEffect(() => {checkOnboarding();}, []);

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
            initialRouteName= "LanguagesList"
            screenOptions={{ headerShown: false }}
          >
            {routes.map((r, i) => (
              <Stack.Screen key={i} name={r.name} component={r.component} />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
        <View>
        </View>
      </Provider>
    );
  }
};

export default App;
