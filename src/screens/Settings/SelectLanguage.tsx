import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import ScreenComponent from '../../containers/ScreenComponent'
import NavHeader from '../../containers/NavHeader'
import { RFPercentage } from "react-native-responsive-fontsize";
import { FONTS } from "../../styles/fonts/fonts";
import COLORS from "../../styles/colors/colors";
import RadioIcon from '../../assets/icons/RadioIcon';

export default function SelectLanguage() {
  return (
<ScreenComponent>
<NavHeader
          hideBackButton={false}
          showTitle={true}
          newTitle="Select Language"
      />
                      <View style={styles.settingsListContainer}>
                    <View style={styles.settingsHeadingDivider} />
                    <TouchableOpacity activeOpacity={0.6} style={styles.resetButton}>
                     <RadioIcon style={styles.imageIcon}/>
                       <Text style={styles.textButton}>English</Text>
                    </TouchableOpacity>
                    <View style={styles.settingsListDivider} />
                    <TouchableOpacity activeOpacity={0.6} style={styles.resetButton}>
                     <RadioIcon style={styles.imageIcon}/>
                       <Text style={styles.textButton}>Espanol</Text>
                    </TouchableOpacity>
                    <View style={styles.settingsListDivider} />
                    </View>
</ScreenComponent>
  )
}

const styles = StyleSheet.create({
    settingsHeadingDivider:{
        width: '100%',
        height: RFPercentage(0.1),
        backgroundColor: COLORS.dividerLine,
        marginTop: RFPercentage(8),
        opacity:0.3
    },
    headerText:{
        ...FONTS.h3,
        color: COLORS.textPrimary,
        marginLeft:'auto',
    },
    settingsContainer:{
        paddingLeft:'5%',
        width: '50%',
        flexDirection: 'row',
        marginTop: RFPercentage(3),
        marginLeft: RFPercentage(3)  
    },
    imageIcon:{
        marginTop:20,
         marginLeft: RFPercentage(4),
         marginRight:20},
    settingsListContainer:{
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        marginTop: RFPercentage(1),
    },
    button: {
        ...FONTS.body1,
        marginTop: RFPercentage(2.6),
        marginLeft: RFPercentage(6),
        color: COLORS.textColor4,
    },
    
    textDivider:{
        width: '100%',
        height: RFPercentage(0.08), 
        backgroundColor: COLORS.dividerLine, 
        marginTop: RFPercentage(2.8),
        opacity:0.3
    
    },
    
    settingsListDivider: {
        width: '100%',
        height: RFPercentage(0.1), 
        backgroundColor: COLORS.dividerLine, 
        marginTop: RFPercentage(2.8),
        opacity:0.3
    
    },
    
    settings:{
        position: 'absolute', 
        right: RFPercentage(2), 
        top: RFPercentage(2)
    
    },
    
    switchSettingContainers:{
        width: '100%', 
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        flexDirection: 'row'
    
    },resetTextContainer:{
        marginBottom: RFPercentage(15),
        marginTop: RFPercentage(3),
        alignSelf: 'center',
        width: '80%', 
        justifyContent: 'center',
        alignItems: 'flex-start' 
    },
    resetButton:{
        display:"flex",
        flexDirection:"row",
         alignItems:"center", 
         justifyContent:"flex-start",
          width:"100%"},
    reset:{
        ...FONTS.body1,
        marginTop: RFPercentage(5),
        marginLeft: RFPercentage(6),
        color: COLORS.textColor4,
       
    },
    security:{
        ...FONTS.body1,
        fontWeight:'bold',
        marginTop: RFPercentage(5), 
        marginLeft: RFPercentage(6),
        color: COLORS.textColor4,
       
    },
    walletText:{
        ...FONTS.body1,
        fontWeight:'bold',
        color: COLORS.textColor4,
         marginTop: RFPercentage(5),
         marginLeft: RFPercentage(6),
         
         },
    textButton:{
        ...FONTS.body4,
        color:COLORS.primary,
        marginTop: RFPercentage(2.6),
        marginRight: RFPercentage(6),
    }
})