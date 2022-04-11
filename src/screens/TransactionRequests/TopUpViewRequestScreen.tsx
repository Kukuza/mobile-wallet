import { Modal, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ScreenComponent from "../../containers/ScreenComponent";
import { IStackScreenProps } from "../../navigation/StackScreenProps";
import RequestTxInformationCard from "../../components/cards/RequestTxInformationCard";
import LargeModal from "../../components/modals/LargeModals";
import SwipeButton from "../../components/buttons/SwipeButton";
import NavHeader from "../../components/NavHeader";
import { WakalaEscrowTransaction } from '../../utils/Celo-Integration/transaction_types';

/**
 * 
 * @param props { 
 *          navigaion: 
 *          route: 
 * }
 * @returns 
 */
const TopUpViewRequestScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const { navigation, route } = props;

  const wakalaEscrowTx: WakalaEscrowTransaction = route?.params?.transaction;

  console.log("TopUpViewRequestScreen () ->", wakalaEscrowTx)

  const [modalVisible, setModalVisible] = useState(false);

  const [processIsError, setProcessIsError] = useState(false);

  return (
    <ScreenComponent>
      <View style={styles.wrapper}>
 
        <NavHeader showTitle={true} newTitle={"Top Up Request"}></NavHeader>

        <RequestTxInformationCard
            grossAmount={wakalaEscrowTx.amount}
            earnings={wakalaEscrowTx.agentFee}
            netValue={wakalaEscrowTx.grossAmount}
            additionalStyling={styles.requestTsxInfoCard}
        ></RequestTxInformationCard>
        
        <SwipeButton 
            title={"Swipe to Accept"}
            handleAction={() => {
                setModalVisible(true)
            }}
            additionalStyling={
                styles.slidingButtonCustomStyling
            }
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
    paddingTop: 20
  },
  requestTsxInfoCard: {
      minWidth: 375,
      marginTop: 40
  },
  headerTitleAdditionalStyling: {
      paddingLeft: 24
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  slidingButtonCustomStyling: {
    alignSelf: 'center',
    marginTop: 60
  },
});

export default TopUpViewRequestScreen;
