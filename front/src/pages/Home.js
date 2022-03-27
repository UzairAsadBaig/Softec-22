import React, { useState, useContext, useEffect } from 'react'
import Api from '../Api';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import card from '../Data/card';
import './../css/Home.css'
import Rating from "react-rating"
import UsersContext from '../context/users/UsersContext';
import { Link } from 'react-router-dom';

const Home=() => {


  const [ cardDat, setCardData ]=useState( card );

  const { Cookies }=useContext( UsersContext );

  const [ doctors, setDoctors ]=useState( [] );

  const [ query, setQuery ]=useState( "" );

  const token=Cookies.get( 'jwt' );

  const getDoctors=async () => {
    console.log( "hi" )
    const res=await Api.get( 'users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    } )
    console.log( res.data.data.data );
    setDoctors( res.data.data.data )

  }

  useEffect( async () => {

    await getDoctors()

  }, [] )


  // cards
  const CardAdv=() => {

    return doctors.filter( ( i ) => i.speciality.toUpperCase().includes( query ) ).map( ( l, i ) => (
      <div key={i} className='col-md-4'>
        <div style={{ "padding": "1rem" }}>
          <div className="card" style={{ "width": "18rem" }}>
            <img className="card-img-top" src={require( './../img/doc.jpg' )} style={{ "padding": "0.1rem 1rem" }} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title"><span>Dr. </span>{l.name}</h5>
              <p className="card-text" style={{  "marginTop": "0.6rem" }}>Speciality in <span style={{ "color": "#04e9ae" }}>{l.speciality}</span></p>
              <p className='card-text' style={{ "marginBottom": "0.4rem"}}>
                <Rating
                  style={{ color: "orange" }}
                  initialRating={l.ratingsAverage}
                  emptySymbol="fa fa-star-o fa-1x"
                  fullSymbol="fa fa-star fa-1x"
                  readonly
          />
              </p>
              {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
              <div className='text-center'>

                <Link to={`/details/${l.id}`} className="btn btn-primary" style={{ "backgroundColor": "#04e9ae", "borderColor": "#04e9ae" }}>View Details</Link>

              </div>
            </div>
          </div>
        </div>
      </div>
    ) )
  }

  return (
    <>

      <Navbar />
      <div className='container mt-4'>
        <div className="row">
          <div className="col-md-12 mt-5 mb-2">
            <h1 className="font-weight-bold text-center heading-awesome m-nav text-span5">Find Your<span className='text-span'> Doctor</span> Here</h1>
            <br />
          </div>
        </div>
      </div>
      <div className='container marg-2'>
        <div className='row d-flex justify-content-center'>
          <input type="text" className='form-inp' placeholder='Search your favourite food here...' onChange={e => setQuery( e.target.value.toUpperCase() )} />
        </div>
      </div>
      <div className="container">
        <div className="row">
          {CardAdv()}
        </div>
      </div>


      <Footer />

    </>
  )
}

export default Home