import React from 'react'
import './../css/Profile.css'
import ClinicsTable from './ClicincsTable'
import Input from './Input'
import Review from './Review'

const Profile=() => {


  return (
    <>

      {/* reviews */}

      <div className="container mt-4">

        <div className="row">

          <div className="col-md-5">
            <div className="card profile_card" >
              <img src={require( './../img/doctor.jpg' )} className="card-img-top card_img " alt="..." />
              <div className="card-body py-4">


                <div className="row">
                  <div className="col-6  fw-bold">Name:</div>
                  <div className="col-6 name_val">Muzamil Ahmad</div>
                  <hr className='line mx-auto' />


                  <div className="col-6  fw-bold">Gender:</div>
                  <div className="col-6 gender_val">Male</div>
                  <hr className='line mx-auto' />

                  <div className="col-6  fw-bold">Contact no:</div>
                  <div className="col-6 phone_val">03161417342</div>
                  <hr className='line mx-auto' />


                  <div className="col-6  fw-bold">Specialized in:</div>
                  <div className="col-6 specialize_val">Heart, Stomach</div>
                  <hr className='line mx-auto' />

                  <div className="col-6  fw-bold">Ratings:</div>
                  <div className="col-6 rating_val">4.5/5</div>

                </div>


              </div>
            </div>

          </div>

          <div className="col-md-7 ps-2">

            <div className="card profile_card" >

              <div className="card-body" >
                <div>
                  <Review />
                </div>


              </div>
            </div>

          </div>

        </div>
      </div>


      {/* <div>
        <Review />
      </div> */}


      <div className="container mt-5">
        <h2 className='text-center profile_head'>My Clinics</h2>
        <ClinicsTable />
      </div>

    </>

  )

}

export default Profile