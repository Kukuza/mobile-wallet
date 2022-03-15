import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  ImageSourcePropType,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../../styles/theme";

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
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 0.7,
    justifyContent: "center",
  },
  title: {
    color: COLORS.primary,
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 15,
    textAlign: "center",
  },
  description: {
    ...FONTS.body3,
    color: COLORS.textBlack,
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: "center",
    marginBottom: 80,
  },
});

export default OnboardingItem;
