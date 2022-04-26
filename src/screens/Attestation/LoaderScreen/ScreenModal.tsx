import React from "react";
import COLORS from "../../../styles/colors/colors";
import { FONTS, SIZES } from "../../../styles/fonts/fonts";
import { StyleSheet, View, Text, Pressable, ScrollView, Animated, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {ExpandingDot} from "react-native-animated-pagination-dots";
import { MODAL_SLIDER_DATA } from "./ModalSliderData";
import { ModalSliderCard } from "./ModalSliderCard";

const ScreenModal = (props) => {

    const scrollX = React.useRef(new Animated.Value(0)).current;

    return (
        <View style={styles.container}>
         <LinearGradient
              colors={COLORS.wakalaModalLinearGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1.5 }}
              style={styles.linearGradient}
              >

                <FlatList
                    data={MODAL_SLIDER_DATA}
                    renderItem={({ item }) => (
                        <ModalSliderCard
                            title={item.title}
                            description={item.description}
                        />
                        )}
                    keyExtractor={(item) => item.key}
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    {
                        useNativeDriver: false,
                    }
                    )}
                    pagingEnabled
                    horizontal
                    decelerationRate={'normal'}
                    scrollEventThrottle={16}
                />

                <ExpandingDot
                    data={MODAL_SLIDER_DATA}
                    expandingDotWidth={10}
                    scrollX={scrollX}
                    inActiveDotOpacity={0.6}
                    activeDotColor={COLORS.black}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        backgroundColor: COLORS.black,
                        borderRadius: 5,
                        marginHorizontal: 5
                    }}
                    containerStyle={{
                        bottom: 100,
                        justifyContent: 'flex-end'
                    }}
                />
                               
                <Pressable onPress={props.handleAction}>
                    <Text style={styles.btnTxt}>Dismiss</Text>
                </Pressable>

            </LinearGradient>
          </View>

    );
  };

const styles = StyleSheet.create({
    scrollView: {
        justifyContent: 'center',
    },
    container: {
      height: SIZES.height * 0.97,
      justifyContent: 'flex-end',
      alignSelf: 'center',
    },
    linearGradient: {
        borderRadius: 20, 
        shadowColor: COLORS.realBlack,
        shadowOpacity: 0.25,
        shadowRadius: 0,
        elevation: 24,
        width: SIZES.width * 0.9,
        height: SIZES.height * 0.37,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 30
    },  

    btnTxt: {
        ...FONTS.body5,
        color: COLORS.accent1
    },
  });

  export default ScreenModal;