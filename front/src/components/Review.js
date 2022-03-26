import React,{useState} from 'react'
import Rating from "react-rating"
import doctor from '../Data/doctor'

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
        <h2 className='mt-3'>Latest Reviews</h2>
         {doctor && (doctor.map(review=>{
              return <div className="text-left">
                    <Rating
            style={{ color: "orange" }}
            initialRating={review.rating}
            emptySymbol="fa fa-star-o fa-1x"
            fullSymbol="fa fa-star fa-1x"
            readonly

          />
          <p>{review.comment}</p>
          <p>By : {review.name}</p>
          <hr/>
              </div>
          }))}
        </div>
    </div>
  )
}

export default Review