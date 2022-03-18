import { StyleSheet, Text, View, Button, Alert } from "react-native";
import React from "react";

const StandardBtn = () => {
  return (
    <View style={styles.container}>
      <Button
        title="Get Started"
        onPress={() => Alert.alert("Simple Button pressed")}
      />
    </View>
  );
};

export default StandardBtn;

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
});
