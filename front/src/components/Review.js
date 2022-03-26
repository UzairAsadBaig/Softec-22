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
        <h3 className='fw-bold'>Give your review</h3>
           <Rating
            style={{ color: "orange" }}
            initialRating={rating}
            onChange={(e)=>{setrating(e)}}
            emptySymbol="fa fa-star-o fa-1x"
            fullSymbol="fa fa-star fa-1x"
          />
        <input type="text" className="form-control mt-3 mx-auto mb-3" style={{ width: "50%" }} value={comment} onChange={( e ) => { setcomment( e.target.value ) }} />
        <button className='btn btn-primary mt-2 mb-2' onClick={sendreview}>Submit Review</button>
        <h3 className='mt-3 fw-bold'>Latest Reviews</h3>
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