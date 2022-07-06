import "./global";
import "node-libs-react-native/globals";
import "react-native-gesture-handler";
import { Alert, View } from "react-native";
import React, { useState, useEffect } from "react";
import store  from './src/store'
import { Provider } from 'react-redux';
import crashlytics from "@react-native-firebase/crashlytics";
import { setJSExceptionHandler, setNativeExceptionHandler } from "react-native-exception-handler";

const handleJSError = (error, isFatal: boolean) => {
  console.log("Global JS Error", error, isFatal);
}

setJSExceptionHandler((error, isFatal) => {
 handleJSError(error, isFatal);
}, true);

setNativeExceptionHandler(errorString => {
  crashlytics().log(errorString);
});

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
import AppLoading from "expo-app-loading";
import TipProvider from "react-native-tip";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import routes from "./src/navigation/Routes";
import { LogBox } from "react-native";
import { MNEMONIC_STORAGE_KEY } from './src/redux/auth/auth.utils'
import { retrieveStoredItem } from "./src/redux/auth/session.key.storage.utils";
import ReadContractDataKit from "./src/utils/smart_contract_integration/read_data_utils/ReadContractDataKit";
import WriteContractDataKit from "./src/utils/smart_contract_integration/write_data_utils/WriteContractDataKit";
import { ContractEventsListenerKit } from "./src/utils/smart_contract_integration/read_data_utils/WakalaContractEventsKit";
import { WAKALA_CONTRACT_ADDRESS } from './src/utils/smart_contract_integration/smart_contract_addresses_';
import { storePublicAddress } from "./src/store/Auth";
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

  const [mnemonic, setMnemonic] = useState(false);

  const hasOnboarded = async () => {
    try {
      const _mnemonic = await retrieveStoredItem(
        MNEMONIC_STORAGE_KEY
        );

      if (_mnemonic) 
        setMnemonic(true);

    } catch (error: Error | any) {
      console.error("hasOnboarded: ", error);
      handleJSError(error, false);
    }
  };

  // TODO remove this on PIN number integration logic.
  const selectAccount = () => Alert.alert(
      "Select account",
      "Use Address 1 for agent, and Address 2 for client.",
      [
        {
          text: "Address 1",
          onPress: async () => await setTestAccount("0x41B87470C3598740019c57f459FF4dbc36dC9311", 
              "b87c7faa7bbcd2a0ce7040c39686ae6c579bf45af15e65a1a16f20f5866d4ea5"),
        },
        { 
          text: "Address 2",
          onPress: async () => await setTestAccount("0x2f254ceA58719E3AE7DF82E1117Ea7C1cE2Ce30d",
              "90692c1dcf146e54074ab474fd28878673bde5548b2732dc26079cda95286e78"), 
        }
      ]
  );

  const setTestAccount = async (publicKey: string, privateKey: string) => {
    WriteContractDataKit.createInstance(privateKey);
    await storePublicAddress(publicKey);
  }

  useEffect(() => {
    hasOnboarded();
    selectAccount();
    ReadContractDataKit.createInstance();
    ContractEventsListenerKit.createInstance([WAKALA_CONTRACT_ADDRESS]);
    
  }, []);

  /* const Loading = () => {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }; */

  if (!fontsLoaded) {
    return (
      <AppLoading />
    );
  }

  return (
    <Provider store = { store }>
      <NavigationContainer>
        {/* <Screens /> */}
        <Stack.Navigator
          initialRouteName= { mnemonic ? "MyDrawer" : "LanguagesList" }
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

export default App;