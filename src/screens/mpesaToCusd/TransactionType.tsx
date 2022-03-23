import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { EvilIcons } from "@expo/vector-icons";
import ScreenComponent from "../../containers/ScreenComponent";
import NavHeader from "../../containers/NavHeader";
import { SIZES } from "../../styles/theme";
import { IStackScreenProps } from "../../navigation/StackScreenProps";

const OperationButton = (props) => {
  return (
    <TouchableOpacity onPress={() => props.handleAction()}>
      <View style={{ flexDirection: "row" }}>
        <View style={buttonStyles.icon}>
          <EvilIcons
            name={props.icon}
            size={40}
            color="#4840BB"
            style={props.styleIcon}
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            marginTop: 5,
            marginLeft: 15,
            width: 200,
          }}
        >
          <Text style={buttonStyles.buttonTitle}>{props.title}</Text>
          <Text style={buttonStyles.buttonSubTitle}>{props.subTitle}</Text>
        </View>
        <View
          style={{
            direction: "rtl",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <EvilIcons
            name={props.chevIcon}
            size={30}
            color="#4840BB"
            // style={props.styleIcon}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const SelectOperation: React.FunctionComponent<IStackScreenProps> = () => {
  const navigation = useNavigation<any>();

  return (
    <ScreenComponent>
      <NavHeader />
      <View style={styles.container}>
        <Text style={styles.subTitle}>Current balance</Text>
        <Text style={styles.title}>Ksh 10,000</Text>

        <View style={styles.buttonContainer}>
          <OperationButton
            title="Top Up"
            subTitle="Buy cUSD"
            icon="plus"
            chevIcon="chevron-right"
            handleAction={() =>
              navigation.navigate("Select Payment Method", {
                operation: "TopUp",
              })
            }
          />
        </View>

        <View style={styles.buttonContainer2}>
          <OperationButton
            title="Withdraw"
            subTitle="Sell cUSD"
            icon="minus"
            chevIcon="chevron-right"
            handleAction={() =>
              navigation.navigate("Select Payment Method", {
                operation: "Withdraw",
              })
            }
          />
        </View>
      </View>
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },

  title: {
    fontSize: 28,
    lineHeight: 34,
    color: "#4840BB",
    fontFamily: "Rubik_700Bold",
  },

  subTitle: {
    fontSize: 12,
    lineHeight: 14,
    color: "#333333",
    fontFamily: "Rubik_400Regular",
  },

  buttonContainer: {
    marginTop: 80,
    flexDirection: "row",
  },
  buttonContainer2: {
    marginTop: 40,
    flexDirection: "row",
  },
});

const buttonWidth = (SIZES.width - 100) / 2;
const buttonHeight = buttonWidth + 70;

const buttonStyles = StyleSheet.create({
  button: {
    width: buttonWidth,
    height: buttonHeight,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "transparent",
    alignItems: "center",
  },

  icon: {
    width: buttonWidth / 2 - 10,
    height: buttonWidth / 2 - 6,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 15,
  },

  buttonTitle: {
    fontSize: 18,
    lineHeight: 22,
    color: "#4840BB",
    marginTop: 15,
    fontFamily: "Rubik_400Regular",
  },

  buttonSubTitle: {
    fontSize: 12,
    lineHeight: 14,
    color: "#333333",
    marginTop: 15,
    fontFamily: "Rubik_400Regular",
  },
});

export default SelectOperation;
