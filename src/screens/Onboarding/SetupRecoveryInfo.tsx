import React, { useState, useRef } from "react";
import { StyleSheet, View, FlatList, Animated } from "react-native";
import { IStackScreenProps } from "../../navigation/StackScreenProps";
import ScreenComponent from "../../containers/ScreenComponent";
import slides from "../Onboarding/RecoveryInfo.slides";
import SetupRecoveryInfoItem from "../Onboarding/SetupRecoveryInfoItem";
import StandardBtn from "../../components/buttons/StandardBtn";
import NextButton from "../../components/buttons/NextButton";
import { SIZES } from "../../styles/fonts/fonts";
import { Provider } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const SetupRecoveryInfo: React.FunctionComponent<IStackScreenProps> = (props) => {
  const { navigation, route } = props;
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = React.useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const scrollTo = async () => {
    if (currentIndex < slides.length - 1) 
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
  };

  const continueHandler = () => {
    navigation.navigate("RecoveryCodePin");
  }

  return (
    <ScreenComponent>
      <Provider>
      <View style={styles.slide}>
        <FlatList
          data={slides}
          renderItem={({ item }) => (
            <SetupRecoveryInfoItem
              title={item.title}
              id={item.id}
              description={item.description}
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
        
        {currentIndex >= slides.length - 1 ? (
          <StandardBtn
            onPress={continueHandler}
            style={styles.button}
            colors={["rgba(183, 0, 76, 0.3)", "rgba(19, 63, 219, 1)"]}
            text="I understand"
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
      </Provider>
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    height: SIZES.height,
  },
  slide: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    height:hp("6%"),
    width:wp("76%"),
    marginVertical:hp("2%")
  },
});

export default SetupRecoveryInfo;