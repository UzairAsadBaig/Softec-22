
// const User=require( "../models/userModel" );
const catchAsync=require( "../utils/catchAysnc" );
const AppError=require( "../utils/appError" );
const factory=require( './FactoryHandler' );
const Clinic=require('../models/clinicModel');


//Todo:  ************************** helper functuions ******************************






// Optimize: Create  
exports.createClinic=factory.createOne(Clinic);

// Optimize: get all 
exports.getAllClinic=factory.getAll( Clinic );



// Optimize: update based on id 
//exports.updateData=factory.updateOne( Model )

// Optimize: delete  based on id 
exports.deleteClinic=factory.deleteOne( Clinic );