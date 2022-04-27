import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PaymentConfirmationCard from "../../components/cards/PaymentConfirmationCard";
import ScreenComponent from "../../containers/ScreenComponent";
import SwipeButton from "../../components/buttons/SwipeButton";
import NavHeader from "../../containers/NavHeader";

const ConfirmMpesaSwipeScreen = () => {
  const handleTransaction = () => {
    // todo make contract call
    console.log("contract call");
  };
  return (
    <ScreenComponent>
      <NavHeader />
      <View style={styles.wrapper}>
        <View>
          <PaymentConfirmationCard />
        </View>
        <View style={{ marginTop: 250, justifyContent: "center" }}>
          <SwipeButton
            title="Swipe to Confirm"
            handleAction={() => handleTransaction()}
          />
        </View>
      </View>
    </ScreenComponent>
  );
};

export default ConfirmMpesaSwipeScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
});
