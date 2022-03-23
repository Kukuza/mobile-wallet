import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { IStackScreenProps } from "../../navigation/StackScreenProps";

const HomeScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const { navigation, route } = props;

  return (
    <View style={styles.container}>
      <Text> Home sweet home</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
