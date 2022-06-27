import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  ImageSourcePropType,
} from "react-native";
import { COLORS } from "../../styles/colors/colors";
import { FONTS } from "../../styles/fonts/fonts";
interface Props {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
}

const GovernanceItem: React.FC<Props> = ({ id, title, description, image }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={(styles.container, { width })}>
      <View style={styles.image}>
        <Image
          source={image}
          style={[{ width, resizeMode: "contain" }]}
        />
      </View>
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
    marginTop: 60,
    justifyContent: "center",
    alignItems: 'center'
  },
  header: {
    ...FONTS.h3,
    color: COLORS.primary,
    fontWeight: "bold",
    flex: 0.6,
    textAlign: "center",
  },
  description: {
    ...FONTS.body4,
    color: COLORS.textColor2,
    paddingHorizontal: 64,
    flex: 1,
    textAlign: "center",
  },
});

export default GovernanceItem;