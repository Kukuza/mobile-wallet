import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import { FONTS } from "../styles/fonts/fonts";
import COLORS from "../styles/colors/colors";

/**
 * 
 * @param {
 *    additionalStyling: contains additional styling to the container. 
 *    backButtonHandler: actions to be taken when the back button is pressed.  
 * } props 
 * @returns 
 */
const HeaderTitle = (props) => {
  return (
    <View
      style={[{ width: "100%", justifyContent: "center", alignItems: "center" }, props.additionalStyling]}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={props.backButtonHandler}
          style={{ alignSelf: "flex-start" }}
        >
          <Ionicons
            name="chevron-back"
            style={{ fontSize: RFPercentage(3.2), alignSelf: "flex-start" }}
            color={COLORS.textDarkBlue}
          />
        </TouchableOpacity>
        {props.skipButton ? (
          <TouchableOpacity
            onPress={() => props.skipAction()}
            style={{ alignSelf: "flex-end" }}
          >
            <Text
              style={{
                ...FONTS.body3,
                fontWeight: "bold",
                color: COLORS.primary,
              }}
            >
              Skip
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <Text style={{ ...styles.title, ...props.titleStyle }}>
        {props.title}
      </Text>
    </View>
  );
};

/**
 * Default handler method for on onEnd.
 */
 const handler = async () => {
  console.log("Back button pressed");
}

/**
 * Default values for expected props.
 * @title the title of the button.
 * @backButtonHandler the method to be executed on back button pressing.
 */
 HeaderTitle.defaultProps = {
  backButtonHandler: handler,
}

export default HeaderTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    textAlign: "left",
    color: COLORS.primary,
    lineHeight: 28.44,
    fontFamily: "Rubik_500Medium",
    width: 240,
    alignSelf: "flex-start",
    paddingTop: 30,
  },
});
