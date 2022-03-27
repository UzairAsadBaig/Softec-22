import React, { useContext, useState, useRef } from 'react'
import Rating from "react-rating"
import Api from '../Api';
import UsersContext from '../context/users/UsersContext';
import doctor from '../Data/doctor'

const Review=( props ) => {
  const { reviews }=props;


    const [rating , setrating] = useState(5)
    const [comment , setcomment] = useState('')
  const { Cookies }=useContext( UsersContext )
  const form=useRef( null )

  const handleReviewSubmit=async ( e ) => {
    e.preventDefault();
    const token=Cookies.get( 'jwt' );
    const res=await Api.post( '/reviews', {
      comment: comment,
      rating: rating,
      doctor: props.doctor,
    }, {
      headers: { Authorization: `Bearer ${token}` }
    } )

    if ( res.data.status==='success' ) {
      form.current.reset();
    }
    else {

    }


  }
  return (
    <div>
        <div className='text-center'>
        <h3 className='fw-bold'>Give your review</h3>
        <form onSubmit={handleReviewSubmit} ref={form}>
          <Rating
            style={{ color: "orange" }}
            initialRating={rating}
            onChange={( e ) => { setrating( e ) }}
            emptySymbol="fa fa-star-o fa-1x"
            fullSymbol="fa fa-star fa-1x"
          />

          <input type="text" className="form-control mt-3 mx-auto mb-3" style={{ width: "50%" }} value={comment} onChange={( e ) => { setcomment( e.target.value ) }} required />
          <button className='btn btn-primary mt-2 mb-2' type='submit'>Submit Review</button>
        </form>

        <h3 className='mt-3 fw-bold'>Latest Reviews</h3>


        {reviews&&( reviews.map( review => {
              return <div className="text-left">
                    <Rating
            style={{ color: "orange" }}
                  initialRating={review.rating}
            emptySymbol="fa fa-star-o fa-1x"
            fullSymbol="fa fa-star fa-1x"
            readonly

          />
                <p>{review.comment}</p>
                <p>By : {review.patient.name}</p>
          <hr/>
              </div>
          }))}
        </div>
    </div>
  )
}

export default Review