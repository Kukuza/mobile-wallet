import React, { useState, useRef } from "react";
import { StyleSheet, View, FlatList, Animated } from "react-native";
import { IStackScreenProps } from "../../navigation/StackScreenProps";
import ScreenComponent from "../../containers/ScreenComponent";
import slides from "../Govenance/slides";
import GovernanceItem from "../Govenance/GovernanceItem";
import StandardBtn from "../../components/buttons/StandardBtn";
import NextButton from "../../components/buttons/LoaderButtons/NextButton";
import { SIZES } from "../../styles/fonts/fonts";
import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';

const GovernanceScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
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
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <ScreenComponent>
      <Provider>
      <View style={styles.slide}>
        <FlatList
          data={slides}
          renderItem={({ item }) => (
            <GovernanceItem
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
        
        {currentIndex >= slides.length - 1 ? (
          /* TODO: button link to the governance page on kukuza website  */
          <StandardBtn
            onPress={showDialog}
            style={styles.button}
            colors={["rgba(183, 0, 76, 0.3)", "rgba(19, 63, 219, 1)"]}
            text="Govern Wakala"
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
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Coming Soon</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Join the governance process</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
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
    height: 50,
    width: 286,
  },
});

export default GovernanceScreen;