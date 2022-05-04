import React from "react";
import { View, Text, StyleSheet } from "react-native";
import COLORS from "../../../styles/colors/colors";
import { FONTS, SIZES } from "../../../styles/fonts/fonts";

export const ModalSliderCard = (props) => {
    return (
        <View style={styles.txtSectionContainer}>
            <View style={styles.txtSection}>
                <Text style={styles.title}>
                    {props.title}
                </Text>

                <Text style={styles.text}>
                    {props.description}
                </Text>
            </View>
        </View>
        
    );
}
const styles = StyleSheet.create({
 
    title: {
        ...FONTS.sh2,
        color: COLORS.textColor3,
        textAlign: "center",
    },

    text: {
        ...FONTS.headline,
        color: COLORS.textColor3,
        textAlign: "center",
    },

    txtSection: { 
        width: SIZES.width * 0.6,
    },

    txtSectionContainer: { 
        width: SIZES.width * 0.9,
        alignItems: 'center'
    },

  });

  export default ModalSliderCard;
