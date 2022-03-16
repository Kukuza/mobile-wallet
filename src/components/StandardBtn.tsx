import { StyleSheet, Text, View, Button, Alert } from "react-native";
import React from "react";

const StandardBtn = () => {
  return (
    <View>
      <Button
        title="Get Started"
        onPress={() => Alert.alert("Simple Button pressed")}
      />
    </View>
  );
};

export default StandardBtn;

const styles = StyleSheet.create({});
