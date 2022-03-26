import React,{useState} from 'react'
import Rating from "react-rating"

const Review = () => {
    const [rating , setrating] = useState(5)
    const [comment , setcomment] = useState('')
    
    function sendreview(){
      alert(rating+comment)
    }
  return (
    <div>
        <div className='text-center'>
        <h2>Give your review</h2>
           <Rating
            style={{ color: "orange" }}
            initialRating={rating}
            onChange={(e)=>{setrating(e)}}
            emptySymbol="fa fa-star-o fa-1x"
            fullSymbol="fa fa-star fa-1x"
          />
        <input type="text" className="form-control mt-2" value={comment} onChange={(e)=>{setcomment(e.target.value)}}/>
        <button className='btn btn-primary mt-2 mb-2' onClick={sendreview}>Submit Review</button>

        </div>
    </div>
  )
}

export default Review