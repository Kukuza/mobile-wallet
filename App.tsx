import "./global";
import "node-libs-react-native/globals";
import "react-native-gesture-handler";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
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
import "react-native-gesture-handler";
import AppLoading from "expo-app-loading";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import routes from "./src/navigation/Routes";
import { Magic } from "@magic-sdk/react-native";
import globalStore from "./src/redux/GlobalStore";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "Warning: The provided value 'moz",
  "Warning: The provided value 'ms-stream",
]);

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
    console.log(data);
    let action = { type: "INIT", value: { ...data, magic: magic } };
    store.dispatch(action);
    // return true;
  } catch (err) {
    console.log(err);
    // return true;
  }
};

// const Loading = () => {
//   return (
//     <View>
//       <ActivityIndicator size="large" />
//     </View>
//   );
// };

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

  // useEffect(() => {
  //   checkOnboarding();
  // }, []);

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
          {/* <Screens /> */}
          <Stack.Navigator
            initialRouteName="ConfirmMpesa"
            screenOptions={{ headerShown: false }}
          >
            {routes.map((r, i) => (
              <Stack.Screen key={i} name={r.name} component={r.component} />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
        <View>
          <magic.Relayer />
        </View>
      </Provider>
    );
  }
};

export default App;
