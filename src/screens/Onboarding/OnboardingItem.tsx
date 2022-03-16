import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  ImageSourcePropType,
} from "react-native";
// import { COLORS, FONTS, SIZES } from "../../styles/theme";
import { COLORS } from "../../assets/styles/colors";
import { FONTS } from "../../assets/fonts/fonts";
import AppLoading from "expo-app-loading";
import {
  Rubik_300Light,
  Rubik_300Light_Italic,
  Rubik_400Regular,
  Rubik_400Regular_Italic,
  Rubik_500Medium,
  Rubik_500Medium_Italic,
  Rubik_700Bold,
  Rubik_700Bold_Italic,
  Rubik_900Black,
  Rubik_900Black_Italic,
} from "@expo-google-fonts/rubik";
import { useFonts } from "expo-font";
interface Props {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
}

const OnboardingItem: React.FC<Props> = ({ id, title, description, image }) => {
  //   let [fontsLoaded] = useFonts({
  //     Rubik_500Medium,
  //   });

  //   if (!fontsLoaded) {
  //     return <AppLoading />;
  //   }
  const { width } = useWindowDimensions();
  return (
    <View style={(styles.container, { width })}>
      <Image
        source={image}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />

      <View style={{ flex: 0.3 }}>
        <Text
          style={{ ...FONTS.h3, color: COLORS.primary, textAlign: "center" }}
        >
          {title}
        </Text>
        <Text
          style={{
            ...FONTS.body3,
            color: COLORS.textColor2,
            textAlign: "center",
          }}
        >
          {description}
        </Text>
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
  description: {
    // ...FONTS.body3,
    // color: COLORS.textBlack,
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: "center",
    marginBottom: 80,
  },
});

export default OnboardingItem;
