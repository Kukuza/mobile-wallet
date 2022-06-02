import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";
import ScreenComponent from "../../containers/ScreenComponent";
import NavHeader from "../../containers/NavHeader";
import KeyPad from "../../components/buttons/KeyPad";
import COLORS from "../../styles/colors/colors";
import { FONTS } from "../../styles/fonts/fonts";
import { TextInput } from "react-native-gesture-handler";

const AddFunds: React.FunctionComponent = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const [value, setValue] = useState("");

  // convert Ksh input to usd
  const usdEquivalent = parseInt(value) / 115;
  const usdEquivalentString = usdEquivalent.toString();
  const operation = route.params.operation;

  function handleChange(newValue: any) {
    if (value == "" && newValue == "0") {
      return null;
    }
    setValue(value + newValue);
    }
    function handleDelete () {
      setValue(value.slice(0, -1));
    }
  return (
    <ScreenComponent>
      <NavHeader
        showTitle={true}
        newTitle={operation === "TopUp" ? "Top Up Request" : "Withdraw"}
      />
      <View style={styles.container}>
        <TextInput style={styles.title} placeholder="Ksh 200">
          Ksh {value}
        </TextInput>
        {/* <TextInputMask
          type={"only-numbers"}
          options={{
            unit: "Ksh ",
          }}
          value={value}
          style={styles.title}
          placeholder="Ksh 0,00"
          placeholderTextColor={COLORS.primary}
        /> */}
        <KeyPad value={value} onChange={handleChange} onDelete={handleDelete} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Add Funds Confirmation", {
              param: usdEquivalentString,
              operation: operation,
            })
          }
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
