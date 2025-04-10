import { Link } from "expo-router";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";
import { useState } from "react-native"
import { useEffect } from "react";

const Reviews = () => {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchAllReviews = async () => {
      try{
        const response = await axios.get("localhost")/* Not sure what would go here, don't know
        how to connect to server*/
        setReviews(response.data) ; 
      } catch(err){
        console.log(err)
      }
    }
  })

  const handleDelete = async (id) => {
    try{
      await axios.delete("localhost"+id)/* Not sure what server goes here */
      window.location.reload()
    } catch(err){
      console.log(err)
    }
  }

  return <div>
  <div className="reviews">
    {reviews.map(review => (
      <div className="review" key={review.id}> 
        <h2>{review.movie}</h2>
        <h2>{review.rating}</h2>
        <p>{review.review}</p>
        <button className="delete" onClick={()=> handleDelete(review.id)}> Delete </button>
        <button className="update"> <Link to={`/update/${review.id}`}> Update </Link></button>
        </div>
    ))}
  </div> 
  <Link href="/addreview"> Add new review </Link>
  </div> ; 

} ; 

export default Reviews