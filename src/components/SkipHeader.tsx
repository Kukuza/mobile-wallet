import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FONTS } from "../styles/fonts/fonts";
import COLORS from "../styles/colors/colors";

/**
 * 
 * @param {
 *    additionalStyling: contains additional styling to the container. 
 *    cancelButtonHandler: actions to be taken when the back button is pressed.  
 * } props 
 * @returns 
 */
const SkipHeader = (props) => {
  return (
    <View
      style={[{ width: "100%", justifyContent: "center", alignItems: "center" }, props.additionalStyling]}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
          <TouchableOpacity
            onPress={() => props.cancelButtonHandler()}
            style={{ alignSelf: "flex-end" }}
          >
            <Text
              style={{
                ...FONTS.body3,
                fontWeight: "bold",
                color: COLORS.primary,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
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
 SkipHeader.defaultProps = {
  cancelButtonHandler: handler,
}

export default SkipHeader;

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
