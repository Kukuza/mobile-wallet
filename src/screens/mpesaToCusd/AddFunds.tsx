import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import { TextInputMask } from "react-native-masked-text";
import { LinearGradient } from "expo-linear-gradient";
import ScreenComponent from "../../containers/ScreenComponent";
import NavHeader from "../../containers/NavHeader";
import KeyPad from "../../components/buttons/KeyPad";
import COLORS from "../../styles/colors/colors";
import { FONTS } from "../../styles/fonts/fonts";

const AddFunds: React.FunctionComponent = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();

  const [value, setValue] = useState("");
  // const operation = route.params.operation;

  function handleChange(newValue) {
    setValue(newValue);
  }

  return (
    <ScreenComponent>
      <NavHeader
        showTitle={true}
        //   newTitle={operation === "TopUp" ? "Add Funds" : "Withdraw Funds"}
      />
      <View style={styles.container}>
        <TextInputMask
          type={"money"}
          options={{
            unit: "Ksh ",
          }}
          value={value}
          style={styles.title}
          placeholder="Ksh 0,00"
          placeholderTextColor={COLORS.primary}
        />
        <KeyPad value={value} onChange={handleChange} />
        <TouchableOpacity
          onPress={() => navigation.navigate("Add Funds Confirmation")}
        >
          <LinearGradient
            colors={["rgba(183, 0, 76, 0.3)", "rgba(19, 63, 219, 1)"]}
            start={[1, 0]}
            end={[0, 1]}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Review</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScreenComponent>
  );
};

const styles = StyleSheet.create<any>({
  container: {
    flex: 1,
    marginHorizontal: 30,
    justifyContent: "flex-end",
  },

  title: {
    fontSize: 28,
    lineHeight: 34,
    marginBottom: 30,
    textAlign: "center",
    color: COLORS.primary,
    fontFamily: FONTS.displayBold.fontFamily,
  },

  button: {
    height: 56,
    width: "100%",
    marginTop: 10,
    borderRadius: 28,
    marginBottom: 30,
    justifyContent: "center",
  },

  buttonText: {
    fontSize: 20,
    lineHeight: FONTS.displayBold.lineHeight,
    textAlign: "center",
    color: COLORS.white,
    fontFamily: FONTS.displayBold.fontFamily,
  },
});

export default AddFunds;
