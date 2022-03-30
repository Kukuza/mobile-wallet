import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TransactionConfirmationCard from "../../components/cards/TransactionConfirmationCard";
import SwipeButton from "../../components/buttons/SwipeButton";

const TransactionConfirmationScreen = () => {
  return (
    <View style={styles.container}>
      <TransactionConfirmationCard />
      <View style={{ marginTop: 25 }}>
        <SwipeButton title="Swipe to Confirm" />
      </View>
    </View>
  );
};

export default TransactionConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 30,
  },
});
