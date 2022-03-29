import { SafeAreaView, StatusBar, StyleSheet, View, Text } from "react-native";
import React, { Fragment } from "react";
import { LinearGradient } from "expo-linear-gradient";

function ScreenComponent({ children }) {
  return (
    <Fragment>
      <SafeAreaView style={styles.topSafeArea} />

      <SafeAreaView
        style={[
          styles.bottomSafeArea,
        ]}
      >
        <View style={styles.statusBar}>
          <StatusBar
            translucent
            barStyle="dark-content"
            backgroundColor="#F7EFFA"
          />
        </View>

        <LinearGradient
          colors={["#F7EFFA", "#FCF8ED"]}
          start={[1, 0]}
          end={[1, 1]}
          style={styles.screen}
        >
          {children}
        </LinearGradient>
      </SafeAreaView>
    </Fragment>
  );
}

const STATUS_BAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  topSafeArea: {
    flex: 0,
    backgroundColor: "#F7EFFA",
  },

  bottomSafeArea: {
    flex: 1,
    backgroundColor: "#FCF8ED",
  },

  statusBar: {
    height: STATUS_BAR_HEIGHT,
  },

  screen: {
    flex: 1,
  },
});
export default ScreenComponent;
