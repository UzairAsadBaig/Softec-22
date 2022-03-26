const express=require( "express" );
const { getAllClinic, createClinic, deleteClinic } = require("../controllers/clinicController");






const Router=express.Router();

//Optimize:   ************** Routes ***************


Router.route("/").get(getAllClinic).create(createClinic).delete(deleteClinic);






Router.route( "/:id" )
  // .get( getData )
  // .delete( deleteData )
  // .patch( updateData )



module.exports=Router;