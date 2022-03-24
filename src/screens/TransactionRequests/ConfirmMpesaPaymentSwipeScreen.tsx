import { StyleSheet, Text, View, Image, Alert, Pressable } from "react-native";
import React, { useState, useRef } from "react";
import ScreenComponent from "../../containers/ScreenComponent";
import { FONTS, SIZES } from '../../styles/fonts/fonts';
import { IStackScreenProps } from "../../navigation/StackScreenProps";
import SwipeButton from "../../components/buttons/SwipeButton";
import COLORS from "../../styles/colors/colors";


/**
 * 
 * @param props {
 *      @phoneNumber : The recipient phone number.
 *      @amount : the amount to be sent.
 * }
 * @returns the component.
 */
const ConfirmMpesaPaymentSwipeScreen: React.FunctionComponent<IStackScreenProps> = (props: any) => {
 
  const { navigation, route } = props;

  return (
    <ScreenComponent>
      <View style={styles.container}>
          <View style={{ flexDirection: 'row', width: SIZES.width * 0.7, alignSelf: 'center' }}>
                <Image 
                  source={require("../../assets/icons/subheadingicon3.png")}
                  style={styles.titleIcon}
                />
                <Text style={styles.cardTitle}>Confirm M-PESA Payment</Text>
          </View>

          <Text style={styles.bodyText}>
            The agent confirmed that he sent Ksh 1,000 to your number +254 706 427 718.
          </Text>
          <Text style={[styles.bodyText, { marginBottom: 341, marginTop: 30}]}>
            Once you receive the payment, confirm the transaction below.
          </Text>

          <SwipeButton 
              title={"Swipe to confirm"}
              handleAction={() => {
                Alert.alert("Pass handler method on prop (handleAction)")
              }}
              additionalStyling={styles.slidingButtonCustomStyling}
          />

          <Pressable>
               <Text style={styles.pressableTxt}>Didn’t receive payments?</Text>
          </Pressable>
          
      </View>

      

      
    
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", 
    alignContent: 'center',
    height: SIZES.height,
    paddingTop: 115
  },
  // Slide styles
  slide: {
    flex: 1, // Take up all screen
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  titleIcon: {
      alignSelf: 'flex-start',
      height: 32,
      width: 40
  },
  cardTitle: {
      ...FONTS.body3,
      paddingTop: 7,
      marginLeft: 7
  },
  slidingButtonCustomStyling: {
    alignSelf: 'center'
  },
  bodyText: {
    width: SIZES.width * 0.7,
    color: COLORS.textPrimary,
    ...FONTS.headline,
    marginTop: 21
  },
  pressableTxt: {
    ...FONTS.sh1,
    color: COLORS.primary,
    marginTop: 70
  }
});

export default ConfirmMpesaPaymentSwipeScreen;
