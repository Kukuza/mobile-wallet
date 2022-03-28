import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../styles/colors/colors";
import { FONTS } from "../styles/fonts/fonts";

function NavHeader(props) {
  const route = useRoute();
  const navigation = useNavigation();
  const [title, setTitle] = useState(route.name);

  useEffect(() => {
    if (props.newTitle) {
      setTitle(props.newTitle);
    }
  });

  return (
    <View style={styles.container}>
      {!props.hideBackButton ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Feather name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      ) : (
        <View style={styles.dummyView} />
      )}

      {props.showTitle && <Text style={styles.title}>{title}</Text>}

      <View style={styles.dummyView} />
    </View>
  );
}

const styles = StyleSheet.create<any>({
  container: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  button: {
    width: 40,
    height: 40,
    marginLeft: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.textPrimary,
    textAlign: "center",
    fontFamily: FONTS.body3.fontFamily,
  },

  dummyView: {
    width: 40,
  },
});

export default NavHeader;
