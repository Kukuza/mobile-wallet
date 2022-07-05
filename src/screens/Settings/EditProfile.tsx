import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenComponent from '../../containers/ScreenComponent'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Blockie from '../../assets/icons/Blockie'
import NormalTextField from '../../components/TextFields/NormalTextField'
import { FONTS } from '../../styles/fonts/fonts'
import COLORS from '../../styles/colors/colors'

export default function EditProfile({navigation}) {
  return (
    <ScreenComponent>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.editText}>Edit Profile</Text>
            <TouchableOpacity>
                <Text style = {styles.saveText} >
                    Save
                </Text>
            </TouchableOpacity>
        </View>
      <View style={styles.midContainer}>
            <Blockie/>
      </View>
      <View style={styles.textField}>
      <NormalTextField 
    inputLabel="Full name" 
    onChangeText={null}
    placeholder="Martin Chege"
    keyboardType="email-address"
    />
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
    }
})