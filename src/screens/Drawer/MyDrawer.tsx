import * as React from "react";
import Onboarding from "../Onboarding/Onboarding";
import { ViewStyle, TextStyle } from "react-native";
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from "@react-navigation/drawer";
import { SIZES, COLORS, FONTS } from "../../styles/theme";
import RampScreen from "../Ramp/Ramp";
import SettingsScreen from "../Settings/Settings";
import HelpScreen from "../Help/Help";
import { GovernanceScreen } from "../Govenance/Governace";
import OpenRequestsScreen from "../TransactionRequests/OpenRequestsScreen";
import PendingRequestsScreen from "../TransactionRequests/PendingRequestsScreen";
import TransactionHistoryScreen from "../TransactionRequests/TransactionHistoryScreen";
import CustomDrawerContent from "./CustomDrawer";

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: SIZES.width * 0.8,
          borderRadius: 15,
          backgroundColor: COLORS.menuBackground,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={Onboarding}
        options={drawerScreenOptions}
      />

      <Drawer.Screen
        name="Pending Requests"
        component={PendingRequestsScreen}
        options={drawerScreenOptions}
      />

      <Drawer.Screen
        name="Open Requests"
        component={OpenRequestsScreen}
        options={drawerScreenOptions}
      />

      <Drawer.Screen
        name="Transaction History"
        component={TransactionHistoryScreen}
        options={drawerScreenOptions}
      />
      <Drawer.Screen
        name="Governance"
        component={GovernanceScreen}
        options={drawerScreenOptions}
      />

      <Drawer.Screen
        name="Ramp"
        component={RampScreen}
        options={drawerScreenOptions}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={drawerScreenOptions}
      />

      {/* Last item in the drawer uses separate options object. */}
      <Drawer.Screen
        name="Help"
        component={HelpScreen}
        options={drawerScreenOptionsLastItem}
      />
    </Drawer.Navigator>
  );
}

// Item style for last item in the drawer.
const drawerItemStyle: ViewStyle = {
  borderTopColor: COLORS.textBlack,
  borderTopWidth: 0.2,
  borderStartColor: COLORS.black,
  width: SIZES.width * 0.9,
  marginTop: -5,
  marginLeft: -10,
  paddingBottom: 5,
};

const drawerItemStyleLastItem: ViewStyle = {
  borderTopColor: COLORS.textBlack,
  borderTopWidth: 0.2,
  borderBottomWidth: 0.2,
  borderBottomColor: COLORS.black,
  marginTop: -5,
  marginLeft: -10,
  paddingBottom: 5,
};

const drawerLabelStyle: TextStyle = {
  ...FONTS.h4,
  color: COLORS.primary,
  paddingLeft: 52,
};

const drawerScreenOptions: DrawerNavigationOptions = {
  drawerInactiveBackgroundColor: COLORS.menuBackground,
  drawerActiveTintColor: COLORS.menuBackground,
  drawerItemStyle: drawerItemStyle,
  drawerLabelStyle: drawerLabelStyle,
};

// Options object for last item in the drawer.
const drawerScreenOptionsLastItem: DrawerNavigationOptions = {
  drawerInactiveBackgroundColor: COLORS.menuBackground,
  drawerActiveTintColor: COLORS.menuBackground,
  drawerItemStyle: drawerItemStyleLastItem,
  drawerLabelStyle: drawerLabelStyle,
};
