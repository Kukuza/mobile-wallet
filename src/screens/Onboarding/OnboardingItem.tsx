import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  ImageSourcePropType,
} from "react-native";
// import { COLORS, FONTS, SIZES } from "../../styles/theme";
import { COLORS } from "../../styles/colors/colors";
import { FONTS, SIZES } from "../../styles/fonts/fonts";
interface Props {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
}

const OnboardingItem: React.FC<Props> = ({ id, title, description, image }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={(styles.container, { width })}>
      <Image
        source={image}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />
      <View style={{ flex: 0.3 }}>
        <Text style={styles.header}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 0.6,
    justifyContent: "center",
    marginTop: 60,
  },

  // slide: {
  //   flex: 1, // Take up all screen
  //   justifyContent: "center", // Center vertically
  //   alignItems: "center", // Center horizontally
  // },

  header: {
    ...FONTS.h3,
    color: COLORS.primary,
    fontWeight: "bold",
    flex: 0.6,
    // marginVertical: 10,
    textAlign: "center",
  },

  description: {
    ...FONTS.body3,
    color: COLORS.textColor2,
    paddingHorizontal: 64,
    flex: 0.6,
    // marginVertical: 20,
    // marginHorizontal: 40,
    textAlign: "center",
  },
});

export default OnboardingItem;
