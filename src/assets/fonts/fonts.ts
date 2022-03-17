import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  // Main Title
  displayBold: {
    fontFamily: "Rubik_700Bold",
    fontSize: 28,
    lineHeight: 42,
  },
  // Headers
  h1: {
    fontFamily: "Rubik_500Medium",
    fontSize: 28,
    lineHeight: 42,
  },
  h2: {
    fontFamily: "Rubik_500Medium",
    fontSize: 24,
    lineHeight: 36,
  },
  h3: {
    fontFamily: "Rubik_400Regular",
    fontSize: 24,
    lineHeight: 36,
  },
  h4: {
    fontFamily: "Rubik_700Bold",
    fontSize: 20,
    lineHeight: 30,
  },
  h5: {
    fontFamily: "Rubik_700Bold",
    fontSize: 18,
    lineHeight: 27,
  },

  //  Subheaders
  sh1: {
    fontFamily: "Rubik_500Medium",
    fontSize: 20,
    lineHeight: 30,
  },

  sh2: {
    fontFamily: "Rubik_500Medium",
    fontSize: 20,
    lineHeight: 30,
  },

  // Body
  body1: {
    fontFamily: "Rubik_400Regular",
    fontSize: 18,
    lineHeight: 27,
  },
  body2: {
    fontFamily: "Rubik_700Bold",
    fontSize: 16,
    lineHeight: 24,
  },

  body3: {
    fontFamily: "Rubik_500Medium",
    fontSize: 16,
    lineHeight: 24,
  },

  body4: {
    fontFamily: "Rubik_400Regular",
    fontSize: 16,
    lineHeight: 24,
  },

  body5: {
    fontFamily: "Rubik_700Bold",
    fontSize: 14,
    lineHeight: 21,
  },

  body6: {
    fontFamily: "Rubik_700Bold",
    fontSize: 12,
    lineHeight: 18,
  },

  body7: {
    fontFamily: "Rubik_500Medium",
    fontSize: 14,
    lineHeight: 21,
  },

  body8: {
    fontFamily: "Rubik_500Medium",
    fontSize: 12,
    lineHeight: 18,
  },

  body9: {
    fontFamily: "Rubik_400Regular",
    fontSize: 12,
    lineHeight: 18,
  },

  // Headline
  headline: {
    fontFamily: "Rubik_400Regular",
    fontSize: 14,
    lineHeight: 21,
  },

  // Small Text
  s1: {
    fontFamily: "Rubik_300Light",
    fontSize: 14,
    lineHeight: 21,
  },
  s2: {
    fontFamily: "Rubik_300Light",
    fontSize: 12,
    lineHeight: 18,
  },
  s3: {
    fontFamily: "Rubik_400Regular",
    fontSize: 11,
    lineHeight: 16.5,
  },
  s4: {
    fontFamily: "Rubik_400Regular",
    fontSize: 10,
    lineHeight: 15,
  },
  s5: {
    fontFamily: "Rubik_400Regular",
    fontSize: 8,
    lineHeight: 12,
  },
};

const appFont = { SIZES, FONTS };

export default appFont;
