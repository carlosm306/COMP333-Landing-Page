import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";

export default function Index() {
  return (
    <View
      style={styles.container}>
      <Text style={[styles.titletext, styles.space]}> AnimalMovies</Text>
      <Text style={styles.text}> Watch and rate your favorite animal movies here, such as... </Text>
      <Text style={styles.text}> Possible Image </Text>
      <Link href="/login" style={styles.text}> Login Here</Link>
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