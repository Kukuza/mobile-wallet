import { StyleSheet } from "react-native";
import * as React from "react";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import Onboarding from "./Onboarding/Onboarding";
import MyDrawer from "./Drawer/MyDrawer";

const RootStack = createStackNavigator();

function Screens(props) {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {props.finishedBoarding !== true ? (
        <>
          <RootStack.Screen name="Onboarding" component={Onboarding} />
          {/* <RootStack.Screen name="Auth" component={AuthScreen} /> */}
          <RootStack.Screen name="My Drawer" component={MyDrawer} />
        </>
      ) : (
        <>
          <RootStack.Screen name="My Drawer" component={MyDrawer} />
        </>
      )}
    </RootStack.Navigator>
  );
}

const mapStateToProps = (state) => {
  return {
    finishedBoarding: state.finishedBoarding,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: async (action) => {
      await dispatch(action);
    },
  };
};

const styles = StyleSheet.create({});
export default connect(mapStateToProps, mapDispatchToProps)(Screens);
