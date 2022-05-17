import { Image, StyleSheet, View, Text } from "react-native";
import React from "react";
import { IStackScreenProps } from "../../navigation/StackScreenProps";
import ScreenComponent from "../../containers/ScreenComponent";
import COLORS from '../../styles/colors/colors';
import { FONTS } from "../../styles/fonts/fonts";

/**
 * 
 * @param props Screen properties.
 * @returns 
 */
const YouAreAllSetScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  
  const { navigation, route } = props;

  return (
    <ScreenComponent>
      
      <View style={styles.container}>
          <Image
            source={require("../../assets/icons/icon.png")}
            style={styles.icon}
          />
          <Text style={styles.title}>You're all set!</Text>
      </View>

    </ScreenComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 62,
    height: 62
  },
  title: {
    ...FONTS.h1,
    color: COLORS.primary
  }
});

export default YouAreAllSetScreen;
