import { Link } from "expo-router";
import { Text, View, TextInput, StyleSheet, Button, Alert } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";
import { useState } from "react";
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import * as qs from 'qs'


export default function Signup() {


  

  const [User, setUser] = useState({
    username: "",
    password: "",
    cpassword: "", 
}) ; 

const Sendsignup = async() => {
    if ((User.username.trim() === "") || (User.password.trim() === "") || (User.password != User.cpassword)) 
        return Alert.alert("Please fill out all fields correctly") ;
    else {
    try{
        await axios.post(
          "https://comp333.free.nf/Controller/Api/UserController.php", qs.stringify({
          
            action: "signupAction",
            userid: User.username, // these should be replaced by inputs in the form
            password: User.password,
            confirm_password: User.cpassword,
          
          })); 
        Alert.alert("signup successful")
        router.replace("/index")
    } catch(err){
        console.log(err)
        Alert.alert("signup failed")
    }
}
}


  return (
    <View style={[styles.text, styles.background]}>
      <Link href="/" style={[styles.text, styles.button]}> Back to home page </Link>
      <Text style={styles.titletext}> Signup Here </Text>
      <TextInput style={styles.input} placeholder="Please enter username" 
      onChangeText={(text) => setUser({...User, username : text})}/> 
      <TextInput style={styles.input} placeholder="Enter password" 
      onChangeText={(text) => setUser({...User, password : text})}/> 
      <TextInput style={styles.input} placeholder="Confirm password" 
      onChangeText={(text) => setUser({...User, cpassword : text})}/> 
      <Button title="Signup" onPress={() => Sendsignup() }/>  
    </View>
  );
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
        fontSize: 20,
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