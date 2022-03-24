import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  // base colors
  primary: "#4840BB",
  secondary: "#B0F623", // gray
  shadowColor: "#7a5dba",

  mainGray: "#B3B3B3",
  backgroundColor: "#E5E5E5",
  menuBackground: '#F5F5F5',
  buttonGradient: ["rgba(183, 0, 76, 0.3)", "rgba(19, 63, 219, 1)"],
  cardGradient: [
    "rgba(255, 140, 161, 0.08)",
    "rgba(252, 207, 47, 0.08)",
    "rgba(255, 255, 255, 0.08)",
    "rgba(248, 48, 180, 0.08)",
    "rgba(47, 68, 252, 0.08)",  
  ],
  drawerMenuGradient: [
    "rgba(255, 140, 161, 0.08)",
    "rgba(252, 207, 47, 0.08)",
    "rgba(255, 255, 255, 0.08)",
    "rgba(248, 48, 180, 0.08)",
    "rgba(47, 68, 252, 0.08)",  
  ],
  wakalaBtn1LinearGradient: [
    "#133FDB",
    "rgba(20, 63, 218, 0.994943)",
    "rgba(183, 0, 77, 0.3)",
  ],
  wakalaBtn2LinearGradient: [
    "#133FDB", "rgba(183, 0, 77, 0.3)"
  ],

  //pdm
  inputFieldBorder: "rgba(195, 211, 212, 0.9)",
  inputFieldBackgroundColor: "rgba(242, 242, 242, 0.4)",
  inputFieldPlaceholder: "#9AA3AE",
  lightBlue: "#C0FAEB",
  warn: "#ba4848",

  // colors
  black: "#181725",
  textBlack: "#333333",
  white: "#FFFFFF",
  darkBlue: "#002B4E",
  textDarkBlue: "#002B4E",
  tertiary: "#7C7C7C",
  realBlack: "#000000",
  buttonGray: "#E6E6E6",
  textLightBlue: "#133FDB",
  lightGray: "#595959",

  line: "#444444",
  // lightGrey: "#F3EBFC",
  keypad: "#1C1939",

  //Menu
  homeMenu: "rgba(162, 197, 93, 0.15)",
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,

  // font sizes
  largeTitle: 50,
  mediumTitle: 24,
  smallText: 10,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  h5: 14,

  sh2: 18,
  
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,
  body6: 12,

  small4: 10,
  small5: 8,
  
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
  mediumTitle: {
    fontSize: SIZES.mediumTitle,
    lineHeight: 34,
    fontFamily: "Rubik_500Medium",
  },
  buttonTitle: {
    fontSize: 12,
    lineHeight: 14.22,
    fontFamily: "Rubik_500Medium",
    color: COLORS.white,
    alignSelf: 'center'
  },
  h1: { fontSize: SIZES.h1, lineHeight: 36, fontFamily: "Rubik_500Medium" },
  h2: { fontSize: SIZES.h2, lineHeight: 30, fontFamily: "Rubik_400Regular" },
  h3: { fontSize: SIZES.h3, lineHeight: 22, fontFamily: "Rubik_400Regular" },
  h4: { fontSize: SIZES.h4, lineHeight: 22, fontFamily: "Rubik_400Regular" },
  
  sh2: { fontSize: SIZES.h2, lineHeight: 27, fontFamily: "Rubik_500Regular" },
  

  h5: { fontSize: SIZES.h5, lineHeight: 18, fontFamily: "Rubik_400Regular" },

  smallText: { fontSize: SIZES.smallText, lineHeight: 22, fontFamily: "Rubik_400Regular" },
  body1: { fontSize: SIZES.body1, lineHeight: 15, fontFamily: "Rubik_400Bold" },
  body2: {
    fontSize: SIZES.body2,
    lineHeight: 30,
    fontFamily: "Inter_600SemiBold",
  },
  body3: {
    fontSize: SIZES.body3,
    lineHeight: 22,
    fontFamily: "Rubik_500Medium",
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
  body6: {
    fontSize: SIZES.body6,
    lineHeight: 18,
    fontFamily: "Rubik_700Bold",
  },
  body6Bold: {
    fontSize: SIZES.body6,
    lineHeight: 18,
    fontFamily: "Rubik_700Bold",
  },

  small4: {
    fontFamily: "Rubik_400Regular",
    lineHeight: 15,
    fontSize: SIZES.small5
  },

  small5: {
    fontFamily: "Rubik_400Regular",
    lineHeight: 12,
    fontSize: SIZES.small5
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;