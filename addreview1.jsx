

import React from "react"
import { useNavigate } from "react-router-dom";

const Addreview = () => {
    const [review, setReview] = useState({
        movie: "",
        rating: null,
        Review: ""
    }) ; 
    const navigate= useNavigate()
    
    const handleChange = (e) => {
        setReview(prev => ({...prev, [e.target.name]: e.target.value }))
    }
    const handleClick = async e => {
        e.preventDefult()
        try{
            await axios.post("localhost", review) /* Don't know how to connect to server */
            navigate("/readreview")
        } catch(err){
            console.log(err)
        }
    }
    return (
        <div className="form">
            <h1> Add New Review </h1>
            <input type="text" placeholder="movie" onChange={handleChange} name="movie" />
            <input type="number" placeholder="rating" onChange={handleChange} name="rating" />
            <input type="text" placeholder="review" onChange={handleChange} name="Review" />
            <button onClick={handleClick}> Add </button>
        </div>
        
    ) ; 
} ; 

