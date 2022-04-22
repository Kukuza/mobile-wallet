import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  PixelRatio,
  StyleSheet,
  View,
  PanResponder,
  Animated,
  TouchableOpacity,
} from "react-native";
import {
  angry,
  angry_selected,
  sad,
  sad_selected,
  neutral,
  neutral_selected,
  wink,
  wink_selected,
  love,
  love_selected,
} from "../assets/icons/rating_icons";
import { SIZES } from "../styles/fonts/fonts";
import { FONTS } from "../styles/fonts/fonts";
import { COLORS } from "../styles/colors/colors";
import Rating from "../screens/KarmaRating/Rating";

const REACTIONS = [
  {
    label: "Terrible",
    src: angry,
    bigSrc: angry_selected,
  },
  {
    label: "Bad",
    src: sad,
    bigSrc: sad_selected,
  },
  {
    label: "Okay",
    src: neutral,
    bigSrc: neutral_selected,
  },
  {
    label: "Good",
    src: wink,
    bigSrc: wink_selected,
  },
  {
    label: "Great",
    src: love,
    bigSrc: love_selected,
  },
];
const WIDTH = SIZES.width - 60;
const DISTANCE = WIDTH / REACTIONS.length;
const END = WIDTH - DISTANCE;

export default class Rate extends React.Component<any> {
  _pan: any;
  // rate: string;
  _panResponder: any;
  constructor(props: any) {
    super(props);
    this._pan = new Animated.Value(2 * DISTANCE);
    // this.rate = "";
  }
  UNSAFE_componentWillMount() {
    this._panResponder = PanResponder.create({
      // onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this._pan.setOffset(this._pan._value);
        this._pan.setValue(0);
      },
      onPanResponderMove: Animated.event([null, { dx: this._pan }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        this._pan.flattenOffset();

        let offset = Math.max(0, this._pan._value + 0);
        if (offset < 0) return this._pan.setValue(0);
        if (offset > END) return this._pan.setValue(END);

        const modulo = offset % DISTANCE;
        offset =
          modulo >= DISTANCE / 2
            ? offset + (DISTANCE - modulo)
            : offset - modulo;
        // todo add rating param
        this.updatePan(offset);
      },
    });
  }

  updatePan(toValue) {
    Animated.spring(this._pan, {
      toValue,
      friction: 7,
      useNativeDriver: false,
    }).start();
    const rating = toValue / 66 + 1;
    console.log("the updated rating is " + rating);
    this.props.rateToParent(rating);
    // pass this data to the  rating screen

    // todo add rating param
    // this.props.onChange(toValue);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrap}>
          <LinearGradient
            colors={["rgba(183, 0, 76, 0.3)", "rgba(19, 63, 219, 1)"]}
            start={[1, 0]}
            end={[0, 1]}
            style={styles.line}
          />

          <View style={styles.reactions}>
            {REACTIONS.map((reaction, idx) => {
              const u = idx * DISTANCE;
              let inputRange = [u - 20, u, u + 20];
              let scaleOutputRange = [1, 0.25, 1];
              let topOutputRange = [0, 10, 0];
              let colorOutputRange = ["#999", "#222", "#999"];

              if (u - 20 < 0) {
                inputRange = [u, u + 20];
                scaleOutputRange = [0.25, 1];
                topOutputRange = [10, 0];
                colorOutputRange = ["#222", "#999"];
              }

              if (u + 20 > END) {
                inputRange = [u - 20, u];
                scaleOutputRange = [1, 0.25];
                topOutputRange = [0, 10];
                colorOutputRange = ["#999", "#222"];
              }

              return (
                <TouchableOpacity
                  onPress={() => this.updatePan(u)}
                  activeOpacity={0.9}
                  key={idx}
                >
                  <View style={styles.smileyWrap}>
                    <Animated.Image
                      source={reaction.src}
                      style={[
                        styles.smiley,
                        {
                          transform: [
                            {
                              scale: this._pan.interpolate({
                                inputRange,
                                outputRange: scaleOutputRange,
                                extrapolate: "clamp",
                              }),
                            },
                          ],
                        },
                      ]}
                    />
                  </View>

                  <Animated.Text
                    style={[
                      styles.reactionText,
                      {
                        top: this._pan.interpolate({
                          inputRange,
                          outputRange: topOutputRange,
                          extrapolate: "clamp",
                        }),
                        color: this._pan.interpolate({
                          inputRange,
                          outputRange: colorOutputRange,
                          extrapolate: "clamp",
                        }),
                      },
                    ]}
                  >
                    {reaction.label}
                  </Animated.Text>
                </TouchableOpacity>
              );
            })}
            <Animated.View
              {...this._panResponder.panHandlers}
              style={[
                styles.bigSmiley,
                {
                  transform: [
                    {
                      translateX: this._pan.interpolate({
                        inputRange: [0, END],
                        outputRange: [0, END],
                        extrapolate: "clamp",
                      }),
                    },
                  ],
                },
              ]}
            >
              {REACTIONS.map((reaction, idx) => {
                let inputRange = [
                  (idx - 1) * DISTANCE,
                  idx * DISTANCE,
                  (idx + 1) * DISTANCE,
                ];
                let outputRange = [0, 1, 0];

                if (idx == 0) {
                  inputRange = [idx * DISTANCE, (idx + 1) * DISTANCE];
                  outputRange = [1, 0];
                }

                if (idx == REACTIONS.length - 1) {
                  inputRange = [(idx - 1) * DISTANCE, idx * DISTANCE];
                  outputRange = [0, 1];
                }
                return (
                  <Animated.Image
                    key={idx}
                    source={reaction.bigSrc}
                    style={[
                      styles.bigSmileyImage,
                      {
                        opacity: this._pan.interpolate({
                          inputRange,
                          outputRange,
                          extrapolate: "clamp",
                        }),
                      },
                    ]}
                  />
                );
              })}
            </Animated.View>
          </View>
        </View>
      </View>
    );
  }
}

const size = 38;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  wrap: {
    width: WIDTH,
    marginBottom: 50,
  },
  reactions: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  smileyWrap: {
    width: DISTANCE,
    height: DISTANCE,
    justifyContent: "center",
    alignItems: "center",
  },
  smiley: {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: "#c7ced3",
  },
  bigSmiley: {
    width: DISTANCE,
    height: DISTANCE,
    borderRadius: DISTANCE / 2,
    backgroundColor: "#ffb18d",
    position: "absolute",
    top: 0,
    left: 0,
  },
  bigSmileyImage: {
    width: DISTANCE,
    height: DISTANCE,
    position: "absolute",
    top: 0,
    left: 0,
  },
  reactionText: {
    fontSize: FONTS.body7.fontSize,
    textAlign: "center",
    color: COLORS.textPrimary,
    fontFamily: FONTS.body7.fontFamily,
    marginTop: 5,
  },
  line: {
    height: 4 / PixelRatio.get(),
    backgroundColor: "#eee",
    width: WIDTH - (DISTANCE - size),
    left: (DISTANCE - size) / 2,
    top: DISTANCE / 2 + 2 / PixelRatio.get(),
  },
});
