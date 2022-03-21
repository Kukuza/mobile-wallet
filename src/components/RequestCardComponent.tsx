import { Fontisto, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Pressable, Text, View, StyleSheet, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SIZES } from '../styles/theme';
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const swipeLeftContent = () => {
  return (
    <Animated.View
      style={{
        width: 120,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 20,
      }}
    >
      <MaterialIcons name="preview" size={24} color={COLORS.textLightBlue} />
          <Text style={{
              color: COLORS.textLightBlue,
              ...FONTS.body5
            }}
          >
            View
         </Text>
    </Animated.View>
  );
};

const swipeRightContent = () => {
  return (
    <View
      style={{
        width: 120,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 20,
      }}
    >
      <MaterialIcons name="block-flipped" size={24} color={COLORS.warn} />
      <Text
        style={{
          color: COLORS.textLightBlue,
          ...FONTS.body5
        }}
      >
        Hide
      </Text>
    </View>
  );
};

const RequestCardComponent  = (props) => {

    const { transaction } = props;
    // const [amount, setAmount] = useState();
    // const [starsRate, setStarsRate] = useState();
    // const [ratingsNumber, setRatingsNumber] = useState();
    // const [visible, setVisible] = useState(true);
    // const [type, setType] = useState();

    function handleDeleteItem() {
      console.log("Delete item")
    }

    return (
      <GestureHandlerRootView>
        <Swipeable
          renderLeftActions={swipeLeftContent}
          overshootLeft={true}
          onSwipeableLeftOpen={() =>
                 console.log("Swipe Left")
          }
          overshootRight={true}
          renderRightActions={swipeRightContent}
          onSwipeableRightOpen={handleDeleteItem}
          // onSwipeableRightWillOpen={() => setVisible(!visible)}
      >
            <LinearGradient
                  colors={COLORS.cardGradient}
                  start={[0, 1]}
                  end={[1, 0]}
                  style={styles.cardStyling}
              > 
              <View>
                <View style={{ flexDirection: 'column' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image 
                        source={require("../assets/images/Transactions/dummy_identicone.png")}
                        style={styles.identiconImg}
                      />
                      <Text style={styles.cardTitle}>Deposit Request</Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                      

                      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Ionicons style={styles.ratingIcon} name="star" size={SIZES.small5} color={COLORS.textLightBlue} />
                        <Text style={styles.rating}>5.0</Text>
                      </View>
                      
                      <Text style={styles.ratingCount}>245 Ratings</Text>
                    </View>
                  </View>
                  
                  <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.amountTitle}>Amount</Text>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.amountKsh}>Ksh 567.56</Text>
                        
                        <Pressable style={styles.viewButton} onPress={() => Alert.alert('View Transaction details')}>
                          <Text style={styles.viewButtonTxt}>View</Text>
                        </Pressable>
                  </View>
                </View>
                </View>
              </LinearGradient>
      </Swipeable>
      </GestureHandlerRootView>
    );
  }

export default RequestCardComponent;


const styles = StyleSheet.create({
  cardTitle: {
    ...FONTS.h4,
    color: COLORS.textDarkBlue,
    fontWeight: 'bold',
    marginLeft: 18.5,
  },
  cardStyling: {
    borderRadius: 10,
    width: SIZES.width * 0.9,
    marginTop: 6,
    marginBottom: 6,
    paddingBottom: 15,
    paddingLeft: 13,
    paddingTop: 20
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  ratingCount: {
    ...FONTS.small5,
    color: COLORS.textLightBlue,
  },
  rating: {
    ...FONTS.small5,
    marginLeft: 2, 
    color: COLORS.textLightBlue,

  },
  ratingIcon: {
    // marginLeft: 108, 
  },
  amountTitle: {
    ...FONTS.small4,
    marginLeft: 50.15,
    
  },
  amountKsh: {
    ...FONTS.sh2,
    fontWeight: "bold",
    marginLeft: 50.15
  },
  viewButton: {
    borderColor: COLORS.black,
    borderWidth: 0.2,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 3,
    marginRight: 13,
    backgroundColor: COLORS.white
  },
  viewButtonTxt: {
    ...FONTS.body6Bold,
    color: COLORS.textLightBlue,
  },
  identiconImg: {
    width: 29,
    height: 29,
    borderRadius: 24,
    backgroundColor: COLORS.white,
  },
});