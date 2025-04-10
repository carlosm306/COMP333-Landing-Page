import { Link } from "expo-router";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";
import "index.jsx"

export default function Login() {
  return (
    <View
      style={styles.container}>
      <TextInput style={styles.input}> Please enter username </TextInput> 
      <TextInput style={styles.input}> Please enter password</TextInput>
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
      flex: 1,
      color: "black",
      fontSize: 45 , 
      alignItems: "center" , 
      fontWeight: "bold"
    },
    text: {
      flex : 3 ,
      color: "black",
      fontSize: 20,
      alignItems: "center" , 
      justifyContent: "center",
    }, 
    space: {
      marginBottom: 40 , 
    },
    input: {
        fontsize: 45,
        color: "black",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "black",
        borderWidth: 3,
        padding: 10,
        margin: 10,
    },
  });