import React from "react";
import { SafeAreaView, Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItemList,
  } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import { SIZES, COLORS, FONTS } from '../../styles/theme';
import { AntDesign } from "@expo/vector-icons";
import * as Progress from 'react-native-progress';
  

export default function CustomDrawerContent(props: DrawerContentComponentProps) {

    const loading = false;
    const kshBalance = 567.37;
    const cUSDBalance = 5.67;
    const loadingMessage = "Loading..."
    

    return (
      <SafeAreaView style={styles.container}>
        <View>
            <LinearGradient
                colors={COLORS.drawerMenuGradient}
                start={[0, 1]}
                end={[1, 0]}
                style={styles.header}
            >
                <View style={{ marginBottom: 80, marginTop: 31}} >
                    <Image 
                      source={require("../../assets/images/drawer/dummyimages/dummy_identicone.png")}
                      style={styles.identiconImg}
                    ></Image>

                    <View style={{ flexDirection: "row", height: 'auto' }}>
                        <Image 
                          source={require("../../assets/images/drawer/dummyimages/kenya_flag.png")}
                          style={styles.phoneCountryFlag}
                        />
                        
                        <Text style={styles.phoneNumberTest}>+254 706 427718</Text> 
                       
                    </View>
                </View>

                <TouchableOpacity onPress={() => props.navigation.closeDrawer()} style={{ marginTop: 20 }}>
                    <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
            </LinearGradient>
        </View>
        

        <View style={stylesBalance.balance}>
            {!loading ? (
          
                <View> 
                    <Text style={stylesBalance.text}>Current Balance</Text>
                    <Text style={stylesBalance.ksh}>Ksh {kshBalance}</Text>
                    <Text style={stylesBalance.cUSD}>{cUSDBalance} cUSD</Text>
                </View> 
                
            
            ) : (
            <View style={stylesBalance.loadingDiv}>
                <Progress.CircleSnail color={['black']} size={23} thickness={2}/>
                <Text style={stylesBalance.loadingMessage}>{loadingMessage}</Text>
            </View>
            )}
        </View>

        <DrawerContentScrollView {...props}>
           <DrawerItemList {...props} />
          <Text style={styles.versionNumber}>Version 2.0.1</Text>
        </DrawerContentScrollView>
        
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      width: SIZES.width * 0.8,
      height: SIZES.height,
      backgroundColor: COLORS.menuBackground,
      alignItems: "flex-start",
      justifyContent: "center",
    },
    header: {
        height: "auto",
        width: SIZES.width * 0.8,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 15,
        paddingTop: 25,
    },
    identiconImg: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.white,
      },
    phoneCountryFlag: {
        width: 16,
        height: 11,
        marginTop: 20,
        backgroundColor: COLORS.white,
      },
    phoneNumberTest: {
          ...FONTS.smallText,
          color: COLORS.textBlack,  
          marginTop: 14,
          marginLeft: 5,

      },
      versionNumber: {
        ...FONTS.smallText,
        marginTop: 30,
        marginLeft: 40,
        color: COLORS.primary,
      },
      drawerElement: {
          paddingLeft: 41,
          color: COLORS.primary,
      }
  });


  const stylesBalance = StyleSheet.create({
    balance: {
        width: SIZES.width * 0.75,
        height: 101,
        marginLeft: (SIZES.width * 0.05) / 2,
        marginTop: -35,
        marginBottom: 10,
        borderRadius: 14,
        backgroundColor: COLORS.white,
        padding: 13,
        justifyContent: "space-between",
    
        shadowColor: COLORS.shadowColor,
        shadowOffset: { width: 10, height: 2.5 },
        shadowOpacity: 0.25,
        shadowRadius: 25,
        elevation: 100
      },
    
      text: {
        ...FONTS.h5,
      },
    
      ksh: {
        ...FONTS.mediumTitle,
        color: COLORS.textBlack,
        fontWeight: 'bold',
        margin: 2
      },
    
      cUSD: {
        ...FONTS.body3,
        color: COLORS.textBlack, 
        fontWeight: 'bold',
        marginTop: 2
      },

      loadingMessage: {
        ...FONTS.body4,
        marginTop: 2,
        marginBottom: 10
      },
      loadingDiv: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 15,
      }
  });