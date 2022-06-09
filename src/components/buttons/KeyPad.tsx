import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { FONTS, SIZES } from "../../styles/fonts/fonts";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import COLORS from "../../styles/colors/colors";
const KeyPad = (props) => {
  const route = useRoute();

  const handleChange = (text) => {
    props.onChange(text);
  };

  const handleDelete = () => {
    props.onDelete();
  };

  return (
    <View>
      <View style={styles.row}>
        <TouchableHighlight
          onPress={() => handleChange("1")}
          underlayColor="rgba(247, 239, 250, 1)"
          delayPressOut={100}
          style={styles.key}
        >
          <Text style={styles.number}>1</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => handleChange("2")}
          underlayColor="rgba(247, 239, 250, 1)"
          delayPressOut={100}
          style={styles.key}
        >
          <Text style={styles.number}>2</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => handleChange("3")}
          underlayColor="rgba(247, 239, 250, 1)"
          delayPressOut={100}
          style={styles.key}
        >
          <Text style={styles.number}>3</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.row}>
        <TouchableHighlight
          onPress={() => handleChange("4")}
          underlayColor="rgba(247, 239, 250, 1)"
          delayPressOut={100}
          style={styles.key}
        >
          <Text style={styles.number}>4</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => handleChange("5")}
          underlayColor="rgba(247, 239, 250, 1)"
          delayPressOut={100}
          style={styles.key}
        >
          <Text style={styles.number}>5</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => handleChange("6")}
          underlayColor="rgba(247, 239, 250, 1)"
          delayPressOut={100}
          style={styles.key}
        >
          <Text style={styles.number}>6</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.row}>
        <TouchableHighlight
          onPress={() => handleChange("7")}
          underlayColor="rgba(247, 239, 250, 1)"
          delayPressOut={100}
          style={styles.key}
        >
          <Text style={styles.number}>7</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => handleChange("8")}
          underlayColor="rgba(247, 239, 250, 1)"
          delayPressOut={100}
          style={styles.key}
        >
          <Text style={styles.number}>8</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => handleChange("9")}
          underlayColor="rgba(247, 239, 250, 1)"
          delayPressOut={100}
          style={styles.key}
        >
          <Text style={styles.number}>9</Text>
        </TouchableHighlight>
      </View>

      <View style={[styles.row]}>
        <TouchableHighlight
          underlayColor="rgba(247, 239, 250, 1)"
          delayPressOut={100}
          style={styles.key}
        >
          {/* Dummy key to make keypad first line position consistent */}
          <Text style={styles.number}>{route.name.includes("EnterPin") ? "":"."}</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => handleChange("0")}
          underlayColor="rgba(247, 239, 250, 1)"
          delayPressOut={100}
          style={styles.key}
        >
          <Text style={styles.number}>0</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => handleDelete()}
          underlayColor="rgba(247, 239, 250, 1)"
          delayPressOut={100}
          style={styles.key}
        >
          <Feather
            name="delete"
            size={24}
            color="#1C1939"
            style={styles.number}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
};

const keyWidth = wp("22%");
const keyHeight = keyWidth;

const styles = StyleSheet.create({
  row: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  key: {
    width: keyWidth,
    height: keyHeight,
    borderRadius: keyWidth / 2,
    justifyContent: "center",
    alignItems:"center",
  },

  number: {
    ...FONTS.h4,
    color:COLORS.textColor3,
    alignSelf:"center"
  },
});

export default KeyPad;
