import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,

  // app dimensions
  width: width,
  height: height,
};

export const FONTS = {
  // Main Title
  displayBold: {
    fontFamily: "Rubik_700Bold",
    fontSize: hp("3.448%"),
    lineHeight: hp("5.0%"),
  },
  // Headers
  h1: {
    fontFamily: "Rubik_500Medium",
    fontSize:hp("3.448%"),
    lineHeight:hp("5.0%"),
  },
  h2: {
    fontFamily: "Rubik_500Medium",
    fontSize: hp("2.955%"),
    lineHeight: hp("4.4%"),
  },
  h3: {
    fontFamily: "Rubik_400Regular",
    fontSize: hp("2.955%"),
    lineHeight:hp("4.4%"),
  },
  h4: {
    fontFamily: "Rubik_700Bold",
    fontSize: hp("2.46%"),
    lineHeight: hp("3.6%"),
  },
  h5: {
    fontFamily: "Rubik_700Bold",
    fontSize: hp("2.216%"),
    lineHeight: hp("3.325%"),
  },

  //  Subheaders
  sh1: {
    fontFamily: "Rubik_500Medium",
    fontSize: hp("2.46%"),
    lineHeight:hp("3.694%"),
  },

  sh2: {
    fontFamily: "Rubik_500Medium",
    fontSize:hp("2.463%"),
    lineHeight:hp("3.694%"),
  },

  // Body
  body1: {
    fontFamily: "Rubik_400Regular",
    fontSize:hp("2.216%"),
    lineHeight:hp("3.325%"),
  },
  body2: {
    fontFamily: "Rubik_700Bold",
    fontSize:hp("1.970%"),
    lineHeight:hp("2.955%"),
  },

  body3: {
    fontFamily: "Rubik_500Medium",
    fontSize:hp("1,97%"),
    lineHeight: hp("2.955%"),
  },

  body4: {
    fontFamily: "Rubik_400Regular",
    fontSize:hp("1.97%"),
    lineHeight: hp("2.9556%"),
  },

  body5: {
    fontFamily: "Rubik_700Bold",
    fontSize:hp("1.724%"),
    lineHeight: hp("2.586%"),
  },

  body6: {
    fontFamily: "Rubik_700Bold",
    fontSize:hp("1.477%"),
    lineHeight: hp("2.2167%"),
  },

  body7: {
    fontFamily: "Rubik_500Medium",
    fontSize:hp("1.724%"),
    lineHeight: hp("2.586%"),
  },

  body8: {
    fontFamily: "Rubik_500Medium",
    fontSize:hp("1.477%"),
    lineHeight: hp("2.2167%"),
  },

  body9: {
    fontFamily: "Rubik_400Regular",
    fontSize:hp("1.477%"),
    lineHeight: hp("2.2167%"),
  },

  // Headline
  headline: {
    fontFamily: "Rubik_400Regular",
    fontSize:hp("1.724%"),
    lineHeight: hp("2.586%"),
  },

  // Small Text
  s1: {
    fontFamily: "Rubik_300Light",
    fontSize:hp("1.724%"),
    lineHeight: hp("2.586%"),
  },
  s2: {
    fontFamily: "Rubik_300Light",
    fontSize:hp("1.477%"),
    lineHeight: hp("2.2167%"),
  },
  s3: {
    fontFamily: "Rubik_400Regular",
    fontSize:hp("1.354%"),
    lineHeight: hp("2.032%"),
  },
  s4: {
    fontFamily: "Rubik_400Regular",
    fontSize:hp("1.231%"),
    lineHeight: hp("1.847%"),
  },
  s5: {
    fontFamily: "Rubik_400Regular",
    fontSize:hp("0.985%"),
    lineHeight: hp("1.4778%"),
  },
};

const appFont = { SIZES, FONTS };

export default appFont;
