import "./global";
import "node-libs-react-native/globals";
import "react-native-gesture-handler";
import { Alert, View } from "react-native";
import React, { useState, useEffect } from "react";
import store  from './src/store'
import { Provider } from 'react-redux';
import Storage from "./src/utils/Storage";
import crashlytics from "@react-native-firebase/crashlytics";
import { setJSExceptionHandler, setNativeExceptionHandler } from "react-native-exception-handler";

const handleJSError = (error, isFatal) => {
  console.log("Global JS Error",error, isFatal);
  crashlytics().recordError(error, error.name);
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
import { ProfileKey } from "./src/enums/ProfileKey";
import ReadContractDataKit from "./src/utils/smart_contract_integration/read_data_utils/ReadContractDataKit";
import WriteContractDataKit from "./src/utils/smart_contract_integration/write_data_utils/WriteContractDataKit";
import { ContractEventsListenerKit } from "./src/utils/smart_contract_integration/read_data_utils/WakalaContractEventsKit";
import { WAKALA_CONTRACT_ADDRESS } from './src/utils/smart_contract_integration/smart_contract_addresses_';
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
  const [recovery, setRecovery] = useState(false);

  const hasOnboarded = async () => {
    try {
      const _mnemonic = await retrieveStoredItem(
        MNEMONIC_STORAGE_KEY
        );

      const profile: IProfile = await Storage.get(
        ProfileKey.PROFILE_KEY
        );

      if (_mnemonic) 
        setMnemonic(true);

      if (profile && profile.recoverySaved) 
        setRecovery(true);
    } catch (error: Error | any) {
      console.error("hasOnboarded: ", error);
      crashlytics().recordError(error);
      handleJSError(error, false);
    }
  };


  const selectAccount = () => Alert.alert(
      "Select account",
      "Use Address 1 for agent, and Address 2 for client.",
      [
        {
          text: "Address 1",
          onPress: () => WriteContractDataKit.createInstance("90692c1dcf146e54074ab474fd28878673bde5548b2732dc26079cda95286e78"),
        },
        { 
          text: "Address 2",
          onPress: () => WriteContractDataKit.createInstance("02c4914d9823f558d4b4ce44562a527320534a4df8286bc39d4e51e7612f40c0be"), 
        }
      ]
  );

  useEffect(() => {
    hasOnboarded();
    selectAccount();
    ReadContractDataKit.createInstance();
    ContractEventsListenerKit.createInstance([WAKALA_CONTRACT_ADDRESS]);
    
  }, []);

  hasOnboarded();


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
          initialRouteName= { mnemonic 
            ? (recovery ? "MyDrawer" : "SetupRecovery") 
            : "LanguagesList"  
          }
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