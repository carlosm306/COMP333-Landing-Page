import { Link } from "expo-router";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";
import { useState } from "react";


export default function Signup() {
  return (
    <View style={[styles.text, styles.background]}>
      <Link href="/" style={[styles.text, styles.button]}> Back to home page </Link>
      <Text style={styles.titletext}> Signup Here </Text>
      <TextInput style={styles.input}> Please enter username </TextInput> 
      <TextInput style={styles.input}> Please enter password</TextInput>
      <TextInput style={styles.input}> Please confirm password</TextInput>
    </View>
  );
}
const [User, setUser] = useState({
        username: "",
        password: "",
        cpassword: "", 
    }) ; 

 const Sendsignup = () => {
        if ((User.rating= "") || (User.password="") || (User.password != User.cpassword)) 
            return Alert.alert("Please fill out all fields correctly") ;
        else {
        try{
            axios.post("localhost", {
                username: "", // these should be replaced by inputs in the form
                password: "",
                cpassword: "",
              }); 
            navigation.navigate("/") 
        } catch(err){
            console.log(err)
        }
    }
    }


const styles= StyleSheet.create({
    container : {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "aquamarine",
    },
    titletext: {
      color: "black",
      fontSize: 50 , 
      alignItems: "center" , 
      fontWeight: "bold",
  
    },
    text: {
      color: "black",
      fontSize: 20,
      alignItems: "center" , 
      justifyContent: "center",
    }, 
    space: {
      marginBottom: 40 , 
    },
    input: {
        fontsize: 20,
        color: "black",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "black",
        borderWidth: 3,
        padding: 5,
        margin: 5,
    },
    background: { 
      flex: 1,
      backgroundColor: "aquamarine"
    },
    button: {
      fontSize: 20 , 
      textDecorationLine: "underline",
      color: "purple",
    },
  });