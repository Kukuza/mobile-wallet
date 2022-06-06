import { StyleSheet, Text, View, TouchableOpacity, Pressable, Alert, TextInput,FlatList, Image,} from 'react-native'
import React, { useState,useEffect } from 'react'
import ScreenComponent from '../../containers/ScreenComponent';
import { Feather } from "@expo/vector-icons";
import COLORS from "../../styles/colors/colors";
import { FONTS } from "../../styles/fonts/fonts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as Contacts from 'expo-contacts';

export default function ContactList({navigation,}) {
const [recent, setRecent] = useState(false)
const [clicked, setCLicked] = useState(false)
const [filterdList, setFilteredList] = useState<any[]>([])
const [contacts, setContacts] = useState<any[]>([])

useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync();

        if (data.length > 0) {
          const contact: any  = data;
          setContacts(contact);
          setFilteredList(contact);
        } else {
          return <Text style={{...FONTS.headline, color:COLORS.error, alignSelf:"center"}}>No contacts found</Text>
        }
      }
    })();
  }, []);
  const keyExtractor = (item, idx) => {
      return item?.recordID?.toString() || idx.toString()
  }
  const renderItem = ({item, index}) => {
        return ( <Pressable onPress={() => navigation.navigate('EnterAmount', {
            recieversName: item?.name,
            recieversPhoneNumber:item?.phoneNumbers[0]?.number
        })}><Contact contact={item}/>
        </Pressable>)
  }

const Contact = ({contact}) => {
    return(
        <View>
        <View style={styles.ContactItem}>
            <Image style={styles.contactImage} source={require("../../assets/images/Transactions/dummy_identicone.png")}/>
            <View>
                <Text style={styles.ContactName}>{contact?.name}</Text>
                <Text style={styles.ContactNumber}>{contact?.phoneNumbers[0].number}</Text>
            </View>
        </View>
        <View style={styles.textDivider}/>
        </View>
    )
}
const searchContacts = (value) => {
  if(value.includes("0x") && value.length === 42) {
    navigation.navigate('EnterAmount', {
      recieversName:"Undefined",
      recieversPhoneNumber:value?.slice(0, 9)
  })

  } else {
    const newContacts = filterdList.filter(
      contact => {
          let contactLowerCase = (contact?.name).toLowerCase();
          let searchTermLowercase = value.toLowerCase();

          return contactLowerCase.indexOf(searchTermLowercase) > -1
      }
  )
  setContacts(newContacts)
  }
    
}
  return (
    <ScreenComponent>
        <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>  
        <Pressable
          onPress={() =>navigation.navigate("Qr", {initialRoute:"Scan"})}
        >
          <MaterialCommunityIcons
            name="qrcode-scan"
            size={24}
            color={COLORS.accent1}
          />
        </Pressable>
        </View>
        <View style={styles.searchContainer}>
        <View
        style={
          clicked
            ? styles.searchBar__clicked
            : styles.searchBar__unclicked
        }
      >
        <TextInput
          style={styles.input}
          placeholder="Search or paste the address..."
          onChangeText={(value) => searchContacts(value)}
          onFocus={() => {
            setCLicked(true);
          }}
        />
      </View>
        </View>
{ recent?<View style={styles.ContactsContainer}>
            <Text style={styles.ContactTitle}>Recent</Text>
            <FlatList
            data={contacts}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            
            />
        </View> : null
        
}
        <View style={styles.ContactsContainer}>
            <Text style={styles.ContactTitle}>Contacts</Text>
            <FlatList
            data={contacts}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            progressViewOffset={250}
            />
        </View>
    </ScreenComponent>
  )
}

const styles = StyleSheet.create({
    topContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        padding:15,
        marginHorizontal:10,
        marginVertical:10,
    },
    searchContainer:{
    marginHorizontal:"2%",
    justifyContent:"center",
    display:"flex",
    },
    searchBar__unclicked: {
        alignSelf:"center",
        padding: 10,
        flexDirection: "row",
        width: "86%",
        backgroundColor:COLORS.grayLightest1,
        borderRadius: 10,
        alignItems: "center",
      },
      searchBar__clicked: {
          alignSelf:"center",
        padding: 10,
        flexDirection: "row",
        width: "86%",
        backgroundColor:COLORS.grayLightest1,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "space-evenly",
      },
      input: {
        ...FONTS.body9,
        width: "90%",
        height: 17,
        color:COLORS.grayLighter,
      },
      ContactsContainer:{
          padding:10,
      },
      ContactTitle:{
          ...FONTS.body3,
          marginHorizontal:10,
          marginVertical:10
      },
      ContactItem:{
          display:"flex",
          flexDirection:"row",
          justifyContent:"flex-start",
      },
      contactImage:{
        margin:10,
        width: 30,
        height: 30,
        borderRadius:15,
        backgroundColor: COLORS.white,
      },
      ContactName:{
          marginLeft:5,
          marginTop:15,
          ...FONTS.headline,
          color:COLORS.black
      },
      ContactNumber:{
        marginLeft:5,
          ...FONTS.headline,
          color:COLORS.grayLight
      },
      textDivider:{
        alignSelf:"center",
        width: '90%',
        height: RFPercentage(0.1), 
        backgroundColor: COLORS.dividerLine, 
        marginTop: RFPercentage(2.8),
        opacity:0.3
    
    },
})