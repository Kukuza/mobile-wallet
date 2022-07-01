import { StyleSheet, Text, View,TextInput } from 'react-native'
import React, {useState} from 'react'
import { FONTS } from '../../styles/fonts/fonts'
import COLORS from '../../styles/colors/colors'

export default function NormalTextField({inputLabel, onChangeText, placeholder, keyboardType}) {
    const [onerrorInput, setOnErrorInput] = useState<Boolean>(true)
  return (
    <View style={[styles.inputWrapper, onerrorInput == true && styles.onErrorInput]}>
    <Text style={styles.inputLabel}>{inputLabel}</Text>
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      placeholderTextColor={COLORS.grayLightest1}
      />
  </View>
  )
}

const styles = StyleSheet.create({
    inputLabel: {
        ...FONTS.s3,
        marginTop: 5,
        marginBottom: 1,
        color: COLORS.textColor2
      },
    
      input: {
        paddingHorizontal: 2,
        paddingVertical: 10,
        ...FONTS.body4,
    },
    inputWrapper: {
        backgroundColor:COLORS.white,
        padding: 10,
        borderRadius: 8
      },
    onErrorInput:{
    borderWidth:1,
    borderColor:COLORS.error
      }
})