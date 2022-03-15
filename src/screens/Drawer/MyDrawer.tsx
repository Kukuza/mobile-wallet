import * as React from 'react';
import Onboarding from '../Onboarding/Onboarding';
import { StyleSheet, Image, SafeAreaView, Text, View } from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';

import RampScreen from '../Ramp/Ramp';
import SettingsScreen from '../Settings/Settings';
import HelpScreen from '../Help/Help';
import { GovernanceScreen } from '../Govenance/Governace';
import OpenRequestsScreen from '../TransactionRequests/OpenRequestsScreen';
import PendingRequestsScreen from '../TransactionRequests/PendingRequestsScreen';
import TransactionHistoryScreen from '../TransactionRequests/TransactionHistoryScreen';
import { COLORS, FONTS } from '../../styles/theme';

function CustomDrawerContent(props) {
    return (
      <SafeAreaView style={{  }}>
        <View style={styles.header_container }>
          <Image source={{  uri: 'src/assets/icon.png' }}></Image>
          <Text style = {styles.phoneNumber}>+254 79172 5651</Text>
        </View>
        

        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
            
            {/* <DrawerItem
              label="Home"
              onPress={() => props.navigation.closeDrawer()}
            />

            <DrawerItem
              label="Toggle drawer"
              onPress={() => props.navigation.toggleDrawer()}
            /> */}
        </DrawerContentScrollView>

        <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
          version 2.0.1
        </Text>
      </SafeAreaView>
    );
  }


const Drawer = createDrawerNavigator();


const styles = StyleSheet.create({
  header_container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    // height: 1,
  },
  image: {
    flex: 0.7,
    justifyContent: "center",
  },
  phoneNumber: {
    fontFamily: "Rubik",
    // fo: normal;
    // fontWeigh: 400,
    fontSize: 10,
    marginVertical: 15,
    textAlign: "center",
  },
  description: {
    // ...FONTS.body3,
    color: COLORS.textBlack,
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: "center",
    marginBottom: 80,
  },
});

export default function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={Onboarding} />
      <Drawer.Screen name="Pending Requests" component={PendingRequestsScreen} />
      <Drawer.Screen name="Open Requests" component={OpenRequestsScreen} />
      <Drawer.Screen name="Transaction History" component={TransactionHistoryScreen} />
      <Drawer.Screen name="Governance" component={GovernanceScreen} />
      <Drawer.Screen name="Ramp" component={RampScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Help" component={HelpScreen} />
    </Drawer.Navigator>
  );
}
