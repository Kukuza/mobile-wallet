import React, { Fragment, useRef } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import ScreenComponent from "../../containers/ScreenComponent";
import NavHeader from "../../containers/NavHeader";
import { FONTS, SIZES } from "../../styles/fonts/fonts";
import { COMING_SOON, TOKENS, MPESA } from "../../assets/images";
import COLORS from "../../styles/colors/colors";
import Banner from "../../components/cards/Banner";

const PaymentMethodButton = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.handleAction()}
      style={buttonStyles.container}
    >
      <View style={buttonStyles.icon}>
        <Image source={props.image} style={buttonStyles.image} />
      </View>
      <View>
        <Text style={buttonStyles.title}>{props.title}</Text>
        <Text style={buttonStyles.subTitle}>{props.subTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const BannerContent = (props) => {
  return (
    <View style={bannerStyles.container}>
      <Image source={COMING_SOON} style={bannerStyles.image} />
      <Text style={bannerStyles.title}>Coming soon</Text>
      <Text style={bannerStyles.text}>
        Stay put, we are soon adding cash option.
      </Text>

      <TouchableOpacity
        style={bannerStyles.buttonContainer}
        onPress={() => props.bannerRef.current?.closeBanner()}
      >
        <Text style={bannerStyles.button}>Dismiss</Text>
      </TouchableOpacity>
    </View>
  );
};

const SelectPaymentMethod: React.FunctionComponent = () => {
  //   const route = useRoute();
  const bannerRef = useRef<any>();
  const navigation = useNavigation<any>();

  //   const operation = route.params.operation;

  return (
    <Fragment>
      <ScreenComponent>
        <NavHeader />
        <View style={styles.container}>
          <Text style={styles.title}>
            How do you want to top up your wallet{" "}
            {/* {operation === "TopUp" ? "top up" : "withdraw from"} your wallet? */}
          </Text>

          <PaymentMethodButton
            title="Mpesa"
            subTitle="Deposit funds using mpesa"
            image={MPESA}
            handleAction={() =>
              navigation.navigate("AddFunds", {
                // operation: operation,
              })
            }
          />
          <PaymentMethodButton
            title="Cash"
            subTitle="Deposit funds through a cash agent"
            image={TOKENS}
            handleAction={() => bannerRef.current?.openBanner()}
          />
        </View>
      </ScreenComponent>
      <Banner
        ref={bannerRef}
        style={{ height: 350 }}
        content={<BannerContent bannerRef={bannerRef} />}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create<any>({
  container: {
    margin: 30,
  },

  title: {
    fontSize: 16,
    lineHeight: 19,
    color: "#333333",
    marginBottom: 65,
    textAlign: "center",
    fontFamily: FONTS.sh2.fontFamily,
  },
});

const bannerStyles = StyleSheet.create<any>({
  container: {
    height: "100%",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },

  image: {
    height: 150,
    maxWidth: SIZES.width * 0.8,
    resizeMode: "contain",
    marginBottom: 20,
  },

  title: {
    fontSize: 18,
    lineHeight: 22,
    color: "#2C2948",
    textAlign: "center",
    fontFamily: FONTS.sh2.fontFamily,
  },

  text: {
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.textPrimary,
    textAlign: "center",
    fontFamily: FONTS.h1.fontFamily,
  },

  buttonContainer: {
    height: 50,
    width: 100,
    justifyContent: "center",
  },

  button: {
    fontSize: 14,
    lineHeight: 23,
    color: "#4840BB",
    textAlign: "center",
    fontFamily: FONTS.h5.fontFamily,
  },
});

const iconWidth = (SIZES.width - 100) / 4 - 10;
const iconHeight = iconWidth + 4;

const buttonStyles = StyleSheet.create<any>({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 70,
    paddingRight: 70,
  },

  icon: {
    width: iconWidth,
    height: iconHeight,
    borderRadius: 8,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  image: {
    height: 35,
    maxWidth: SIZES.width,
    resizeMode: "contain",
  },

  title: {
    fontSize: 18,
    lineHeight: 22,
    color: "#4840BB",
    fontFamily: FONTS.body3.fontFamily,
  },

  subTitle: {
    fontSize: 16,
    lineHeight: 28,
    color: "#A2A3A2",
    fontFamily: FONTS.body4.fontFamily,
  },
});

export default SelectPaymentMethod;
