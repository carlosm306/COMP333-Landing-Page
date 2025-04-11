

import { Link } from "expo-router";
import { Text, View, TextInput, Button, Alert } from "react-native";
import { StyleSheet } from "react-native";
import React from "react"
import { useState } from "react" ; 
import { NavigationContainer } from "@react-navigation/native";
import {axios} from "axios"

export default function Addreview () {
    const [Review, setReview] = useState({
        movie: "",
        rating: null,
        review: "",
    }) ; 

    const Insertdata = () => {
        if ((Review.rating= null) || (Review.movie="") || (Review.review = "")) 
            return Alert.alert("Please fill out all fields") ;
        else {
        try{

            axios.post(`http://localhost/COMP333-Landing-Page/index.php/user/writereview/`, {
                username: "", // these should be replaced by inputs in the form
                movie: "",
                review: "",
                rating: null, 
              }); 
            navigation.navigate("/readreview") 

    return (
        <View className="form">
            <Text style={styles.titletext}> Add new review </Text>
            <TextInput type="text" placeholder="movie"  onChange={setReview.movie} name="movie" /> 
            <TextInput type="number" placeholder="rating" onChange={setReview.rating} name="rating" />
            <TextInput type="text" placeholder="review" onChange={setReview.review} name="Review" />
            <Button title="Add" onPress={() => Insertdata() }/>  
        </View>
        
    ) ; 

} ; 

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
        fontsize: 30,
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
