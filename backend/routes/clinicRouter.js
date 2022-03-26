const express=require( "express" );
const { getAllClinic, createClinic, deleteClinic } = require("../controllers/clinicController");






const Router=express.Router();

//Optimize:   ************** Routes ***************


Router.route("/").get(getAllClinic).post(createClinic);






Router.route( "/:id" ).delete(deleteClinic)
  // .get( getData )
  // .delete( deleteData )
  // .patch( updateData )



module.exports=Router;