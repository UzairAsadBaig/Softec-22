const express=require( "express" );
const { getAllAppointment, createAppointment } = require("../controllers/appointmentController");
const { protect, restrictTo } = require("../controllers/authController");
const { setUserId } = require("../controllers/reviewController");






const Router=express.Router();

//Optimize:   ************** Routes ***************






Router.route( '/' )
  .get( getAllAppointment )
  .post(protect,restrictTo('patient'),setUserId,createAppointment )
  // .delete( deleteData )
  // .patch( updateData )



module.exports=Router;