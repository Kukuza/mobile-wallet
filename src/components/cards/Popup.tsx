import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SIZES } from "../../styles/fonts/fonts";
import { LinearGradient } from "expo-linear-gradient";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const Popup = React.forwardRef((props: any, ref) => {
  const bottom = useSharedValue(SIZES.height + props.style.height);
  const shadowOpacity = useSharedValue(0);
  const isShadowVisible = useSharedValue<boolean | any>(false);

  const AnimatedStyles = {
    modal: useAnimatedStyle(() => {
      return {
        bottom: bottom.value,
      };
    }),
    shadow: useAnimatedStyle(() => {
      return {
        zIndex: isShadowVisible.value ? 2 : -1,
        opacity: shadowOpacity.value,
      };
    }),
  };

  const openBanner = () => {
    isShadowVisible.value = false;
    shadowOpacity.value = withSpring(0.002);
    bottom.value = withSpring(SIZES.height - props.style.height - 30, {
      damping: 15,
    });
  };

  const closeBanner = () => {
    bottom.value = withTiming(SIZES.height + props.style.height);
    shadowOpacity.value = withTiming(0, {
      duration: 200,
    });
    // todo
    isShadowVisible.value = false;
    const sv = withTiming(0, { duration: 200 });
  };

  React.useImperativeHandle(ref, () => ({ openBanner, closeBanner }));
  return (
    <>
      <Animated.View style={[styles.shadow, AnimatedStyles.shadow]} />
      <AnimatedLinearGradient
        colors={["#F7EFFA", "#FCF8ED"]}
        start={[1, 0]}
        end={[1, 1]}
        style={[{ ...props.style }, styles.modal, AnimatedStyles.modal]}
      >
        {props.content}
      </AnimatedLinearGradient>
    </>
  );
});

const styles = StyleSheet.create({
  shadow: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "#000",
  },

  modal: {
    width: "auto",
    borderRadius: 16,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    alignSelf:"center",
    zIndex: 3,
    justifyContent:"center",
    alignItems:"center",
    elevation: 20,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
  },
});

export default Popup;
