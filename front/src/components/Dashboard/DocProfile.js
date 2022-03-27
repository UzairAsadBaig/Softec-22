import React, { useState, useEffect, useContext } from 'react'
import '../../css/Profile.css'
import doctor from '../../Data/doctor'
import ClinicsTable from '../ClicincsTable'
import moment from 'moment'
import Review from "../Review"
import { DatePicker } from 'antd'
import Navbar from "../Navbar"
import Footer from "../Footer"
import { useParams } from 'react-router-dom'
import Api from '../../Api'
import Rating from "react-rating"
import UsersContext from '../../context/users/UsersContext'


const { RangePicker }=DatePicker;



const DocProfile=() => {
  const [ doc, setDoc ]=useState( {} );

  // const { id }=useParams();

  const { Cookies, user }=useContext( UsersContext );
  const token=Cookies.get( 'jwt' );

  const getDoctorData=async ( id ) => {
    const res=await Api.get( `/users/${id}`, { headers: { Authorization: `Bearer ${token}` } } )
    console.log( res.data.data );
    setDoc( res.data.data );


  }

  useEffect( () => {

    getDoctorData( user.id );
  }, [] )



  return (
    <>
 {/* reviews */}
      <div className="container" style={{ marginTop: "6rem" }}>

        <div className="row">
          <div className="col-md-5 mt-5">
            <div className="card profile_card" >
              <div className="card-body py-4">


                <div className="row">
                  <div className="col-6  fw-bold">Name:</div>
                  <div className="col-6 name_val">{doc.name}</div>
                  <hr className='line mx-auto' />


                  <div className="col-6  fw-bold">Gender:</div>
                  <div className="col-6 gender_val">{doc.gender}</div>
                  <hr className='line mx-auto' />

                  <div className="col-6  fw-bold">Contact no:</div>
                  <div className="col-6 phone_val">{doc.phone}</div>
                  <hr className='line mx-auto' />


                  <div className="col-6  fw-bold">Specialized in:</div>
                  <div className="col-6 specialize_val">{doc.speciality}</div>
                  <hr className='line mx-auto' />

                  <div className="col-6  fw-bold">Ratings:</div>
                  <div className="col-6 rating_val">{`${doc.ratingsAverage? doc.ratingsAverage:'1'}/5`}</div>

                </div>



              </div>
            </div>

          </div>

          <div className="col-md-7 ps-5">
          <h3 className='fw-bold'>Latest Reviews</h3>

            <div className="card profile_card" style={{ maxHeight: '20rem', overflowY: 'scroll' }} >

              <div className="card-body" >
                <div>
                  {doc.reviews&&( doc.reviews.map( review => {
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
            </div>

          </div>

        </div>
      </div>
      
{/* reviews */}



                <div className="container text-center" style={{"padding":"5rem"}}>
                  <h2 className='text-center profile_head'>My Clinics</h2>
                  <ClinicsTable clinics={doc.clinics}/>
                  </div>

    </>

  )
}
export default DocProfile