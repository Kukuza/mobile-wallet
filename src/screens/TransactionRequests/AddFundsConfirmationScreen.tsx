import { Modal, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ScreenComponent from "../../containers/ScreenComponent";
import { SIZES } from "../../styles/fonts/fonts";
import { IStackScreenProps } from "../../navigation/StackScreenProps";
import HeaderTitle from "../../components/HeaderTitle";
import RequestTxInformationCard from "../../components/cards/RequestTxInformationCard";
import DefaultButton from "../../components/buttons/DefaultButton";
import LargeModal from "../../components/modals/LargeModals";

/**
 *
 * @param props {
 *          navigaion:
 *          route:
 * }
 * @returns
 */
const AddFundsConfirmationScreen: React.FunctionComponent<IStackScreenProps> = (
  props
) => {
  const { navigation, route } = props;

  // used to change the visibility state of the modal
  const [modalVisible, setModalVisible] = useState(false);

  // used to change the message of the modal.
  const [processIsError, setProcessIsError] = useState(false);

  return (
    <ScreenComponent>
      <View style={styles.wrapper}>
        <HeaderTitle
          additionalStyling={styles.headerTitleAdditionalStyling}
          backButtonHandler={() => navigation.navigate("Home")}
        />

        <RequestTxInformationCard
          additionalStyling={styles.requestTsxInfoCard}
        ></RequestTxInformationCard>
        
        <DefaultButton
          onPress={() => navigation.navigate("Home")}
          style={{ minWidth: 286, marginTop: 40 }}
          text="Continue"
        />
      </View>

      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          >

        {!processIsError ? (
            <View style={styles.modalOverlay}>
                <LargeModal 
                    onPressHanlder={() => setModalVisible(false)}
                    title={"Oh Snap!"}
                    message={"Something just happened. Please try  again."}
                    btnText={"Try again"}
                ></LargeModal>
            </View>
          ) : (
            <View style={styles.modalOverlay}>
              <LargeModal 
                  onPressHanlder={() => setModalVisible(false)}
                  title={"Money sent"}
                  message={"cUSD 10 has been sent  to the Wakala escrow account. We shared your M-PESA number with the requesting member. We will notify you once the requesting member confirms the payment."}
                  btnText={"Okay"}
                  imageSrc={require("../../assets/images/modals/Shared_image.png")}
              ></LargeModal>
          </View>
        )}
      </Modal>
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 52,
  },
  requestTsxInfoCard: {
    minWidth: 375,
    marginTop: -30,
  },
  headerTitleAdditionalStyling: {
      paddingLeft: 24
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingLeft: 24,
  },
});

export default AddFundsConfirmationScreen;
