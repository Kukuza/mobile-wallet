import { StyleSheet, Text, View, FlatList, Animated } from "react-native";
import React, { useState, useRef } from "react";
import slides from "../Onboarding/slides";
import OnboardingItem from "../Onboarding/OnboardingItem";
import Paginator from "./Paginator";
import NextButton from "./NextButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StandardBtn from "../../components/StandardBtn";
import ScreenComponent from "../../components/ScreenComponent";
import { SIZES } from "../../styles/fonts/fonts";
import { IStackScreenProps } from "../../navigation/StackScreenProps";

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
      <View style={styles.slide}>
        <FlatList
          data={slides}
          renderItem={({ item }) => (
            <OnboardingItem
              title={item.title}
              id={item.id}
              description={item.description}
              image={item.image}
            />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={32}
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
        {/* </View> */}
        {/* <Paginator data={slides} scrollX={scrollX} /> */}
        {currentIndex >= 3 ? (
          <StandardBtn
            onPress={() => navigation.navigate("Auth")}
            style={{
              padding: 15,
              alignItems: "center",
              borderRadius: 22,
              flexDirection: "row",
            }}
            colors={["rgba(183, 0, 76, 0.3)", "rgba(19, 63, 219, 1)"]}
            text="Get Started"
          />
        ) : (
          <NextButton
            colors={["rgba(183, 0, 76, 0.3)", "rgba(19, 63, 219, 1)"]}
            scrollTo={scrollTo}
            percentage={currentIndex * (100 / slides.length)}
            style={undefined}
            backgroundColor={undefined}
          />
        )}
      </View>
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
