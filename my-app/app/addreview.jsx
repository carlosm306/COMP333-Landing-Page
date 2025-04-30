

import { Link } from "expo-router";
import { Text, View, TextInput, Button, Alert } from "react-native"
import { StyleSheet } from "react-native"
import React from "react"
import { useState } from "react"  
import { NavigationContainer } from "@react-navigation/native";
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';

export default function Addreview () {
    const [Review, setReview] = useState({
        movie: "",
        rating: null,
        review: "",
    }) ; 

    const navigation = useNavigation()
    
    const Insertdata = async() => {
        if ((Review.rating === null) || (Review.movie.trim() === "") || (Review.review.trim() === "")) 
            return Alert.alert("Please fill out all fields") ;
        else {
        try{
            await axios.post("http://localhost/COMP333-Landing-Page/index.php/user/writereview/", {
                username: "", // these should be replaced by inputs in the form
                movie: Review.movie,
                review: Review.review,
                rating: Review.rating, 
              }); 
            Alert.alert("submitted review successfully")
            navigation.navigate("/readreview") 
        } catch(err){
            console.log(err)
            Alert.alert("Failed to submit review")
        }
    }
    }
    return (
        <View className="form">
            <Text style={styles.titletext}> Add new review </Text>
            <TextInput type="text" placeholder="movie" name="movie" onChangeText={(text) => setReview({...Review, movie:text})} /> 
            <TextInput keyboardType="numeric" placeholder="rating" name="rating" value = {Review.rating ? String(Review.rating) : ""} 
            onChangeText={(text) => setReview({...Review, rating : parseInt(text)})}  />
            <TextInput type="text" placeholder="review" value={Review.review} 
            onChangeText={(text) => setReview({...Review, review : text})} name="Review" />
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

  /*
const handleChange = (e) => {
        setReview(prev => ({...prev, [e.target.name]: e.target.value }))
    }
    const handleClick = async e => {
        e.preventDefault()
        try{
            await axios.post("http://localhost/index.php/user/list?limit=20", review) // Don't know how to connect to server 
            Navigation.navigate("/readreview") 
        } catch(err){
            console.log(err)
        }
    }


  */