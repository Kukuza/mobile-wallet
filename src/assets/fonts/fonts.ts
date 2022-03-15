import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: {
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
    fontFamily: "Rubik_700Bold",
  },
  h1: { fontSize: SIZES.h1, lineHeight: 36, fontFamily: "Rubik_500Medium" },
  h2: { fontSize: SIZES.h2, lineHeight: 30, fontFamily: "Rubik_400Regular" },
  h3: { fontSize: SIZES.h3, lineHeight: 22, fontFamily: "Rubik_400Regular" },
  h4: { fontSize: SIZES.h4, lineHeight: 22, fontFamily: "Rubik_400Regular" },
  body1: { fontSize: SIZES.body1, lineHeight: 36, fontFamily: "Inter_700Bold" },
  body2: {
    fontSize: SIZES.body2,
    lineHeight: 30,
    fontFamily: "Inter_600SemiBold",
  },
  body3: {
    fontSize: SIZES.body3,
    lineHeight: 22,
    fontFamily: "Inter_500Medium",
  },
  body4: {
    fontSize: SIZES.body4,
    lineHeight: 22,
    fontFamily: "Inter_400Regular",
  },
  body5: {
    fontSize: SIZES.body5,
    lineHeight: 22,
    fontFamily: "Inter_400Regular",
  },
};

const appTheme = { SIZES, FONTS };

export default appTheme;
