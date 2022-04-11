import { StyleSheet, Text, View, FlatList, Animated } from "react-native";
import React, { useState, useRef } from "react";
import slides from "../Onboarding/slides";
import OnboardingItem from "../Onboarding/OnboardingItem";
import Paginator from "./Paginator";
import NextButton from "./NextButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StandardBtn from "../../components/buttons/StandardBtn";
import ScreenComponent from "../../containers/ScreenComponent";
import { SIZES } from "../../styles/fonts/fonts";
import { IStackScreenProps } from "../../navigation/StackScreenProps";
import EnterPin from "../Settings/RecoveryPhrase/EnterPin";
import RecoveryPhrase from "../Settings/RecoveryPhrase/RecoveryPhrase";

const Onboarding: React.FunctionComponent<IStackScreenProps> = (props) => {
  const { navigation, route } = props;

  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = React.useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = async () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      try {
        await AsyncStorage.setItem("@viewedOnboarding", "true");
        console.log(currentIndex);
      } catch (error) {
        console.log("Error @setItem", error);
      }
    }
  };

  return (
    <ScreenComponent>
      <RecoveryPhrase/>
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    height: SIZES.height,
  },
  // Slide styles
  slide: {
    flex: 1, // Take up all screen
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
});

export default Onboarding;
