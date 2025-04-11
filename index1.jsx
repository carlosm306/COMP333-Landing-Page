import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";
import { NavigationContainer } from "@react-navigation/native";

export default function Index() {
  return (
    <View
      style={styles.container}>
      <Text style={[styles.titletext, styles.space]}> AnimalMovies</Text>
      <Text style={styles.text}> Watch and rate your favorite animal movies here, such as... </Text>
      <Text style={styles.text}> Possible Image </Text>
      <Link href="/signup" style={styles.button}> Click here to sign up </Link>
      <Link href="/login" style={styles.button}> Click here to log in </Link>
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
  button: {
    fontSize: 20 , 
    textDecorationLine: "underline",
    color: "purple",
  },
});