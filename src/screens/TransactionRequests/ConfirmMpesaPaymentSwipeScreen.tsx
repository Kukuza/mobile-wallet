import { StyleSheet, Text, View, Image, Alert, Pressable, Modal } from "react-native";
import React, { useState, useRef } from "react";
import ScreenComponent from "../../containers/ScreenComponent";
import { FONTS, SIZES } from '../../styles/fonts/fonts';
import { IStackScreenProps } from "../../navigation/StackScreenProps";
import SwipeButton from "../../components/buttons/SwipeButton";
import COLORS from "../../styles/colors/colors";
import LargeModal from "../../components/modals/LargeModals";
import SuccessModal from "../../components/modals/SuccessModal";


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
  
  // used to change the visibility state of the modal
  const [modalVisible, setModalVisible] = useState(false);

  // used to change the message of the modal.
  const [processIsError, setProcessIsError] = useState(false);


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
                setModalVisible(true)
              }}
              additionalStyling={styles.slidingButtonCustomStyling}
          />

          <Pressable onPress={() => setModalVisible(true)}>
               <Text style={styles.pressableTxt}>Didn’t receive payments?</Text>
          </Pressable>
          
      </View>
      

      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          >

      <View style={styles.modalOverlay}>
          {!processIsError ? (
              <LargeModal 
                  onPressHanlder={() => setModalVisible(false)}
                  title={"Oh Snap!"}
                  message={"Something just happened. Please try  again."}
                  btnText={"Try again"}
              ></LargeModal>
            ) : (
              <SuccessModal 
                  onPressHanlder={() => setModalVisible(false)}
                  title={"Transaction Successful!"}
                  message={""}
                  btnText={"Okay!"}
              ></SuccessModal>
          )}
        </View>
        
      </Modal>
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
  },
  modalOverlay: {
    // backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default ConfirmMpesaPaymentSwipeScreen;
