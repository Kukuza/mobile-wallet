import 'react-native-gesture-handler';

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MyDrawer from './src/screens/Drawer/MyDrawer';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  
  return (
    // <View style={styles.container}>
    //   <Onboarding />
    // </View>
    <NavigationContainer>
        <MyDrawer></MyDrawer>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
