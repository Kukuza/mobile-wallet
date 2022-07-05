import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react';
import ScreenComponent from '../../containers/ScreenComponent';
import { FONTS } from '../../styles/fonts/fonts';
import COLORS from '../../styles/colors/colors';
import BackIcon from '../../assets/icons/BackIcon';

export default function ConnectedDapps({navigation}) {
  return (
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

      <Text style={styles.connectedTitle}>ConnectedDapps</Text>
      <View>
        <Text style={styles.mainText}>The following sapps are connected to Valora. You can connect to more dapps by scaning their QR code.</Text>
      </View>
      <View style={styles.connectedDapps}>
        <View style={styles.dappIcon}/>
        <View>
            <Text style={styles.dappName}>Pinnata</Text>
            <TouchableOpacity>
                <Text style={styles.buttonText}>Tap to Disconnect</Text>
            </TouchableOpacity>
        </View>
      </View>
    </ScreenComponent>
  )
}

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

    },
    mainText:{

    },
    connectedDapps:{

    },
    dappIcon:{

    },
    dappName:{

    },
    buttonText:{
        
    }
})