import React,{useState} from 'react'
import card from '../Data/card';

const Home = () => {
    const [cardDat, setCardData] = useState(card);

    //cards
    const CardAdv = () => {
    return card.map((l, i) => (
        <div  key={i} className='col-md-4'>
        <div  style={{"padding":"1rem"}}>
        <div className="card" style={{"width":"18rem"}}>
            <img className="card-img-top" src={l.image} style={{"padding":"0.1rem 1rem"}} alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">{l.name}</h5>
                <p className="card-text">Doctor Name: {l.Doc}</p>
                <p className="card-text">Speciality: {l.Specialization}</p>

                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                <div className='text-center'>
                <a href="#" className="btn btn-primary">Book Appointment</a>
                </div>
            </div>
        </div>
        </div>
        </div>
    ))
}

  return (
      <>
      <h2>Home Page</h2>
      <div className="container">
        <div className="row">
             {CardAdv()}
        </div>
      </div>
       
    </>
  )
}

export default Home