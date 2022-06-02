import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import DefaultButton from "../../components/buttons/DefaultButton";
import ScreenComponent from "../../containers/ScreenComponent";
import { IStackScreenProps } from "../../navigation/StackScreenProps";
import COLORS from "../../styles/colors/colors";
import { FONTS, SIZES } from "../../styles/fonts/fonts";

const UserDetails: React.FunctionComponent<IStackScreenProps> = (props) => {
  
  const { navigation, route } = props;
  const moveNext = () => {
    //TODO: validate name
    navigation.navigate("EnterPin")
  };
  const [name, onChangeName] = React.useState("");

  return (
    <ScreenComponent>
      <View style={styles.container}>
          <Text style={styles.title}>How should we call you?</Text>
          <Text style={styles.text}>Please enter your full name below</Text>
          <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Full name</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeName}
              placeholder="Name"
              keyboardType="numeric"
              placeholderTextColor={COLORS.grayLightest1}/>
          </View>
      </View>
      
      <DefaultButton onPress={moveNext} style={styles.button} text="Continue"/>
      
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    marginHorizontal: SIZES.width * 0.09,
    marginVertical: SIZES.height * 0.1
  },
  button: {
    width: SIZES.width * 0.6
  },
  title: {
    ...FONTS.displayBold,
    color: COLORS.primary
  },
  text: {
    ...FONTS.s3,
    width: SIZES.width * 0.8,
    marginTop: 20,
    marginBottom: 20,
    color: COLORS.textColor2
  },

  inputWrapper: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8
  },

  inputLabel: {
    ...FONTS.s3,
    marginTop: 5,
    marginBottom: 1,
    color: COLORS.textColor2
  },

  input: {
    paddingHorizontal: 2,
    paddingVertical: 10,
    ...FONTS.body3,
}
});

export default UserDetails;