import React, { useState } from "react";
import {StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  interpolateColor,
  runOnJS,
  withTiming,
} from "react-native-reanimated";

import { LinearGradient } from "expo-linear-gradient";

import { AntDesign } from "@expo/vector-icons";
import { Alert } from "react-native";
import { FONTS, SIZES } from "../../../styles/fonts/fonts";
import COLORS from "../../../styles/colors/colors";

const BUTTON_WIDTH = SIZES.width * 0.85;
const BUTTON_HEIGHT = 56;
const BUTTON_PADDING = 7;

const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING;

const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING;
const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS;

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);


/**
 * 
 * @param props {
 *             @title the title of the button.
 *             @handleAction the method to be executed on onEnd call.
 *             @additionalStyling extra styling on the button.
 *        }
 * @returns 
 */
const SwipeButton = (props) => {
    
    // Animated value for X translation
  const X = useSharedValue(0);

  // Toggled State
  const [toggled, setToggled] = useState(false);

  // Fires when animation ends
  const handleComplete = () => {
    setTimeout(() => {
      setToggled(false);
      X.value = 0;
    }, 1000);

    
    // run handler method passed in props.
    props.handleAction();

  };

  // Gesture Handler Events
  const animatedGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.completed = toggled;
    },
    onActive: (e, ctx) => {
      let newValue;
      if (ctx.completed) {
        newValue = H_SWIPE_RANGE + e.translationX;
      } else {
        newValue = e.translationX;
      }

      if (newValue >= 0 && newValue <= H_SWIPE_RANGE) {
        X.value = newValue;
      }
    },
    onEnd: () => {
      if (X.value < BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2) {
        X.value = withTiming(0);
      } else {
        X.value = withTiming(H_SWIPE_RANGE);
        runOnJS(handleComplete)();
      }
    },
  });

  const InterpolateXInput = [0, H_SWIPE_RANGE];
  const AnimatedStyles = {
    colorWave: useAnimatedStyle(() => {
      return {
        width: H_WAVE_RANGE + X.value,
        opacity: interpolate(X.value, InterpolateXInput, [0, 1]),
      };
    }),
    swipeable: useAnimatedStyle(() => {
      return {
        backgroundColor: interpolateColor(
          X.value,
          [0, BUTTON_WIDTH - SWIPEABLE_DIMENSIONS - BUTTON_PADDING],
          [COLORS.white, COLORS.white]
        ),
        transform: [{ translateX: X.value }],
      };
    }),
    swipeText: useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          X.value,
          InterpolateXInput,
          [1, 0],
          Extrapolate.CLAMP
        ),
        transform: [
          {
            translateX: interpolate(
              X.value,
              InterpolateXInput,
              [0, BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS],
              Extrapolate.CLAMP
            ),
          },
        ],
      };
    }),
  };

  return (
    <AnimatedLinearGradient
          style={[styles.swipeCont, props.additionalStyling]}
          start={[1, 0]}
          end={[0, 1]} colors={COLORS.defaultbuttonGradient}    >
      <PanGestureHandler onGestureEvent={animatedGestureHandler}>
        <Animated.View style={[styles.swipeable, AnimatedStyles.swipeable]}>
          <AntDesign name="arrowright" size={24} color={COLORS.textDarkBlue} />
        </Animated.View>
      </PanGestureHandler>
      <Animated.Text style={[styles.swipeText, AnimatedStyles.swipeText]}>
        {props.title}
      </Animated.Text>
    </AnimatedLinearGradient>
  );
};

/**
 * Default handler method for on onEnd.
 */
const handler = async () => {
    Alert.alert("Pass handler method on prop (handleAction)")
}

/**
 * Default values for expected props.
 * @title the title of the button.
 * @handleAction the method to be executed on onEnd call.
 */
SwipeButton.defaultProps = {
    title: "Prop {title}",
    handleAction: handler
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  swipeCont: {
    height: BUTTON_HEIGHT,
    width: BUTTON_WIDTH,
    backgroundColor: COLORS.white,
    borderRadius: BUTTON_HEIGHT / 2,
    padding: BUTTON_PADDING,
    display: "flex",

    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  colorWave: {
    position: "absolute",
    left: 0,
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_HEIGHT,
  },
  swipeable: {
    position: "absolute",
    left: BUTTON_PADDING,
    height: SWIPEABLE_DIMENSIONS,
    width: SWIPEABLE_DIMENSIONS,
    borderRadius: SWIPEABLE_DIMENSIONS,
    zIndex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  swipeText: {
    ...FONTS.h4,
    alignSelf: "center",
    zIndex: 2,
    color: COLORS.white,
  },
});

export default SwipeButton;