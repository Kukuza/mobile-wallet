import { View, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import ContactList from './ContactList'

const Send = ({navigation}) => {
  return (
<ContactList navigation={navigation} />
  )
}

export default Send