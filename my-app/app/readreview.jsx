import { Link } from "expo-router";
import { Text, View, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";
import { useState } from "react" ; 
import { useEffect } from "react";


export default function Read() {
  return (
      <View style={[styles.text, styles.background]}>
        <Link href="/addreview" style={[styles.text, styles.button]}> Add new review </Link>
      </View>
    );
  } ; 


const styles = StyleSheet.create({
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
/*
const Reviews = () => {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchAllReviews = async () => {
      try{
        const response = await axios.get("http://localhost/index.php/user/list?limit=20")// Not sure what would go here, don't know
        //how to connect to server 
        setReviews(response.data) ; 
      } catch(err){
        console.log(err)
      }
    }
    fetchAllReviews()
  }, [])

  const handleDelete = async (id) => {
    try{
      await axios.delete("http://localhost/index.php/user/list?limit=20"+id) // Not sure what server goes here 
      window.location.reload()
    } catch(err){
      console.log(err)
    }
  }
 

  return (<View>
  <View className="Reviews">
    {reviews.map(review => (
      <View className="review" key={review.id}> 
        <h2>{review.movie}</h2>
        <h2>{review.rating}</h2>
        <p>{review.review}</p>
        <button className="delete" onClick={()=> handleDelete(review.id)}> Delete </button>
        <button className="update"> <Link to={`/update/${review.id}`}> Update </Link></button>
        </View>
    ))}
  </View> 
  </View> ); 
 

} ; 

*/