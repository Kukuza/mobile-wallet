import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  ImageSourcePropType,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { COLORS } from "../../styles/colors/colors";
import { FONTS, SIZES } from "../../styles/fonts/fonts";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
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
        style={[styles.image,{resizeMode: "contain" }]}
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
    width:wp("48%"),
    alignSelf:"center",
    height:hp("30.14%"),
    flex: 0.6,
    justifyContent: "center",
    marginTop:hp("13%"),
  },
  header: {
    ...FONTS.h3,
    color: COLORS.primary,
    flex: 0.6,
    textAlign: "center",
  },

  description: {
    ...FONTS.body3,
    color: COLORS.textColor2,
    paddingHorizontal: RFPercentage(10),
    alignSelf:'center',
    flex: 0.6,
    textAlign: "center",
  },
});

export default OnboardingItem;
