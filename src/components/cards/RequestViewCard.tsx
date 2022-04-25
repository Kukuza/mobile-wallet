import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Image,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import COLORS from "../../styles/colors/colors";
import { FONTS, SIZES } from "../../styles/fonts/fonts";
import { WakalaEscrowTransaction } from "../../utils/Celo-Integration/transaction_types";

const swipeLeftContent = () => {
  return (
    <Animated.View style={[styles.swipeActionContent, , { marginLeft: 20 }]}>
      <MaterialIcons name="preview" size={24} color={COLORS.secondary} />
      <Text
        style={{
          color: COLORS.secondary,
          ...FONTS.body5,
        }}
      >
        View
      </Text>
    </Animated.View>
  );
};

const swipeRightContent = () => {
  return (
    <View style={[styles.swipeActionContent, { marginRight: 20 }]}>
      <MaterialIcons name="block-flipped" size={24} color={COLORS.warning} />
      <Text
        style={{
          color: COLORS.warning,
          ...FONTS.body5,
        }}
      >
        Hide
      </Text>
    </View>
  );
};

const RequestCardComponent = (props) => {
  const wakalaTransaction: WakalaEscrowTransaction = props.wakalaTransaction;
  const navigation = props.navigation;

  // const [amount, setAmount] = useState();
  // const [starsRate, setStarsRate] = useState();
  // const [ratingsNumber, setRatingsNumber] = useState();
  const [visible, setVisible] = useState(true);
  // const [type, setType] = useState();

  function handleDeleteItem() {
    console.log("Delete item");
  }

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderLeftActions={swipeLeftContent}
        overshootLeft={false}
        onSwipeableLeftOpen={() =>
          navigation.navigate("Top Up View Request", {
            transaction: wakalaTransaction,
          })
        }
        overshootRight={false}
        renderRightActions={swipeRightContent}
        onSwipeableRightOpen={handleDeleteItem}
        onSwipeableRightWillOpen={() => setVisible(!visible)}
      >
        <LinearGradient
          colors={COLORS.cardGradient}
          start={[0, 1]}
          end={[1, 0]}
          style={styles.cardStyling}
        >
          <View>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../../assets/images/Transactions/dummy_identicone.png")}
                  style={styles.identiconImg}
                />
                <Text style={styles.cardTitle}>
                  {wakalaTransaction?.txType === "DEPOSIT"
                    ? "Deposit Request"
                    : "Withdraw Request"}
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Ionicons
                      style={styles.ratingIcon}
                      name="star"
                      color={COLORS.textDarkBlue}
                      size={10}
                    />
                    <Text style={styles.rating}>5.0</Text>
                  </View>

                  <Text style={styles.ratingCount}>245 Ratings</Text>
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={styles.amountTitle}>Amount</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.amountKsh}>
                  Ksh {wakalaTransaction.amount * 115}
                </Text>

                <Pressable
                  style={styles.viewButton}
                  onPress={() =>
                    navigation.navigate("Top Up View Request", {
                      transaction: wakalaTransaction,
                    })
                  }
                >
                  <Text style={styles.viewButtonTxt}>View</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default RequestCardComponent;

const styles = StyleSheet.create({
  cardTitle: {
    ...FONTS.h4,
    color: COLORS.textDarkBlue,
    fontWeight: "bold",
    marginLeft: 18.5,
  },
  cardStyling: {
    borderRadius: 12,
    width: SIZES.width * 0.9,
    marginTop: 6,
    marginBottom: 6,
    paddingBottom: 15,
    paddingLeft: 13,
    paddingTop: 15,
    borderColor: COLORS.white,
    borderWidth: 0.4,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomStartRadius: 10,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  ratingCount: {
    ...FONTS.s5,
    color: COLORS.accent1,
  },
  rating: {
    ...FONTS.s5,
    marginLeft: 2,
    color: COLORS.accent1,
  },
  ratingIcon: {
    // marginLeft: 108,
  },
  amountTitle: {
    ...FONTS.s4,
    marginLeft: 50.15,
  },
  amountKsh: {
    ...FONTS.sh2,
    fontWeight: "bold",
    marginLeft: 50.15,
  },
  viewButton: {
    borderColor: COLORS.black,
    borderWidth: 0.2,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 4,
    marginRight: 13,
    backgroundColor: COLORS.white,
  },
  viewButtonTxt: {
    ...FONTS.body6,
    color: COLORS.accent1,
  },
  identiconImg: {
    width: 29,
    height: 29,
    borderRadius: 24,
    backgroundColor: COLORS.white,
  },
  swipeActionContent: {
    width: 120,
    justifyContent: "center",
    alignItems: "center",
  },
});
