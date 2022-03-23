import { StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Onboarding from "./Onboarding/Onboarding";
import AuthScreen from "./Auth/AuthScreen";

const RootStack = createStackNavigator();

function Screens(props) {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {props.finishedBoarding !== true ? (
        <>
          <RootStack.Screen name="Onboarding" component={Onboarding} />
          <RootStack.Screen name="Auth" component={AuthScreen} />
        </>
      ) : (
        <>
          {/* <RootStack.Screen name="Drawer Nav" component={DrawerNav} /> */}
        </>
      )}
    </RootStack.Navigator>
  );
}

const styles = StyleSheet.create({});
export default Screens;
