import { View, Animated, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import React, { useEffect, useRef } from "react";
import Svg, { G, Circle,} from "react-native-svg";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {NextArrow} from "../../../assets/icons/Arrows";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../../styles/colors/colors";
export default function NextButton({
  percentage,
  scrollTo,
  style,
  backgroundColor,
  colors,
}) {
  const size = wp("21.3%");
  const strokeWidth = 2.5;
  const center = size / 2;
  const radius = size / 2.5 - strokeWidth / 2;
  const circumfrence = 2.2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = React.useRef<any>(null);

  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener((value) => {
      const strokeDashoffset =
        circumfrence - (circumfrence * value.value) / 100;

      if (progressRef?.current) {
        progressRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });
    return () => {
      progressAnimation.removeAllListeners();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
          <Circle
            // stroke="#fff"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            ref={progressRef}
            stroke="#4840BB"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumfrence}
            strokeDashoffset={circumfrence}
          />
        </G>
      </Svg>
      <TouchableOpacity
        onPress={scrollTo}
        activeOpacity={0.6}
        style={styles.button}
      >
      <LinearGradient
          colors={COLORS.nextButtonGradient}
          start={{ x: 0.8, y: 0}}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
      <NextArrow color={COLORS.white}/>
      </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    position: "absolute",
    borderRadius: wp("50%"),
    padding: hp("2.2%"),
  },
  gradient:{
    borderRadius: wp("50%"),
    padding: hp("2.2%"), 
  }
});
