import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { Fragment, useRef } from 'react';
import ScreenComponent from '../../containers/ScreenComponent';
import { FONTS } from '../../styles/fonts/fonts';
import COLORS from '../../styles/colors/colors';
import BackIcon from '../../assets/icons/BackIcon';
import Banner from '../../components/cards/Banner';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { PortalProvider } from "@gorhom/portal";
export default function ConnectedDapps({navigation}) {
    const bannerRef = useRef<any>();
    const BannerContent = (props: any) => {
        return (
          <View style={modalStyles.container}>
            <Text style={modalStyles.title}>Disconnect Pinnata?</Text>
            <Text style={modalStyles.Text}>
            Are you sure you want to disconnect from Pinnata?
            </Text>
            <View style={modalStyles.buttons}>
            <TouchableOpacity
            style={modalStyles.button}
              onPress={() => props.bannerRef.current?.closeBanner()}
            >
              <Text style={modalStyles.cancel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={modalStyles.button}
              onPress={() => props.bannerRef.current?.closeBanner()}
            >
              <Text style={modalStyles.disconnect}>Disconnect</Text>
            </TouchableOpacity>
            </View>
  
          </View>
        );
      };
  return (
    <PortalProvider>
    <Fragment>
    <ScreenComponent>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
               <BackIcon/>
            </TouchableOpacity>
            <Text style={styles.editText}>Connected Dapps</Text>
            <TouchableOpacity>
                <Text style = {styles.saveText} >
                    Scan
                </Text>
            </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal:wp("8%")}}>
        <Text style={styles.connectedTitle}>ConnectedDapps</Text>
      <View>
        <Text style={styles.mainText}>The following dapps are connected to Valora. You can connect to more dapps by scaning their QR code.</Text>
      </View>
      <View style={styles.connectedDapps}>
        <View style={styles.dappIcon}/>
        <View>
            <Text style={styles.dappName}>Pinnata</Text>
            <TouchableOpacity 
            onPress={() =>   bannerRef.current?.openBanner()}
            >
                <Text style={styles.buttonText}>Tap to Disconnect</Text>
            </TouchableOpacity>
        </View>
      </View>
        </View>
    </ScreenComponent>
    <Banner
        ref={bannerRef}
        style={{ height: 250 }}
        content={<BannerContent bannerRef={bannerRef} />}
      />
    </Fragment>
    </PortalProvider>
  )
}

const modalStyles = StyleSheet.create({
    container:{
        height: "auto",
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    buttons:{
      width:"85%",
      padding:10,
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-around",
      marginTop:"20%",

    },
    Text:{
      marginTop:"10%",
      ...FONTS.headline,
      color:COLORS.textDarkBlue
    },
    button:{
  

    },
    cancel:{
      ...FONTS.sh1,
      color:COLORS.error
    },
    disconnect:{
      ...FONTS.sh1,
      color:COLORS.primary
    },
    title:{
      marginTop:"10%",
      ...FONTS.sh2,
      color:COLORS.textDarkBlue
    },
    support:{
      ...FONTS.headline,
      color:COLORS.accent1
    }
})
const styles = StyleSheet.create({
    header:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        marginTop:20
    },
    cancelText:{
        ...FONTS.body7,
        color:COLORS.grayLightest

    },
    editText:{
        ...FONTS.body3,
        color:COLORS.textPrimary
    },
    saveText:{
        ...FONTS.body7,
        color:COLORS.primary
    },
    midContainer:{
        justifyContent:"center",
        alignItems:"center",
        marginTop:"10%",
    },
    textField:{
        justifyContent:"center",
        width:"90%",
        marginTop:"10%",
        alignSelf:"center"
    },
    connectedTitle:{
        ...FONTS.h3,
        color:COLORS.primary,
        marginTop:hp("14%"),
        alignSelf:"flex-start"

    },
    mainText:{
        marginTop:hp("3%"),
        ...FONTS.body4,
        color:COLORS.textDarkBlue
    },
    connectedDapps:{
    marginTop:hp("5%"),
    display:"flex",
    flexDirection:"row",
    alignItems:"center"
    },
    dappIcon:{
    width:wp("13.3%"),
    height:wp("13.3%"),
    borderRadius:wp("1%"),
    backgroundColor:COLORS.error,
    marginRight:wp("2%")
    },
    dappName:{
    ...FONTS.body4,
    color:COLORS.textDarker
    },
    buttonText:{
    ...FONTS.body9,
    color:COLORS.grayLightest 
    }
})