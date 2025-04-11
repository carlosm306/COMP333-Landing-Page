

import React from "react"
import { useLocation, useNavigate } from "react-router-dom";

const Addreview = () => {
    const [review, setReview] = useState({
        movie: "",
        rating: null,
        Review: ""
    }) ; 
    const navigate= useNavigate()
    const location = useLocation()
    
    const reviewId = location.pathname.split("/")[2]

    const handleChange = (e) => {
        setReview(prev => ({...prev, [e.target.name]: e.target.value }))
    }
    const handleClick = async e => {
        e.preventDefult()
        try{
            await axios.post(`http://localhost/COMP333-Landing-Page/index.php/user/writereview/`, {
                username: "yourUsername", // these should be replaced by inputs in the form
                movie: "yourMovie",
                review: "yourReview",
                rating: "yourRating"
              });
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
            <button onClick={handleClick}> Update </button>
        </div>
        
    ) ; 
} ; 

