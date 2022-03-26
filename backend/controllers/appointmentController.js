
// const User=require( "../models/userModel" );
const catchAsync=require( "../utils/catchAysnc" );
const AppError=require( "../utils/appError" );
const factory=require( './FactoryHandler' );
const Appointment = require("../models/appointmentModel");


//Todo:  ************************** helper functuions ******************************






// exports.greet=catchAsync( async ( req, res, next ) => {
  
//   //? (2) Send the delete response with 204 code
//   res.status( 200 ).json( {
//     status: "success",
//     data: "Hello World!"
//   } )

// } )




// Optimize: get all 
exports.getAllAppointment=factory.getAll( Appointment );

// Optimize: get single data basaed on id
exports.getSingleAppointment=factory.getOne( Appointment );

// Optimize: Create  
exports.createAppointment=factory.createOne( Appointment );

// Optimize: update based on id 
//exports.updateData=factory.updateOne( Model )

// Optimize: delete  based on id 
exports.deleteAppointment=factory.deleteOne( Appointment );