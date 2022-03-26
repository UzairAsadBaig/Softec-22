const mongoose=require( 'mongoose' );
const validator=require( "validator" );  // 3rd part validation package
// const slugify=require( "slugify" );
// const bcrypt=require( 'bcryptjs' );
// const crypto=require( 'crypto' );



//Optimize:  ************************** Clinic Schema ******************************
const Clinic=new mongoose.Schema( {
  name: {
    type: String,
    required: [ true, "Please enter clinic name" ],
    trim: true
  },
  address: {
    type: String,
    required: [ true, "Please enter clinic address" ],
    trim: true
  },
  openingHour: {
   to:{type:String}, 
   from:{type:String}, 
  },
  opeingDays:[{
    type:String
  }]
  
  ,
  doctor:{
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Please join a doctor ID"],
  }




}, {
  // TO SEE VIRTUAL FIELDS 
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  },

} );




//Todo: ************************** Adding virtual properties ******************************
// ***** Whatever return will be set to virtual property value
// Clinic.virtual( 'nickName' ).get( function () {
//   return this.name.slice(0,3);
// } )





//Todo: ************************** Document/query/aggregation middlewares ******************************

// ******** DOCUMENT MIDDLEWARE: runs before .save() and .create()
Clinic.pre( 'save', async function ( next ) {
  // HERE 'this' keyword === current document 


  next();
} )


// ******** QUERRY MIDDLEWARE: runs before executing any find query
Clinic.pre( /^find/, async function ( next ) {
  // HERE 'this' keyword === querry Obj



  next();
} )


// ******** AGGREGATION MIDDLEWARE: runs before executing Agrregation pipepline
Clinic.pre( 'aggregate', async function ( next ) {
    // HERE 'this' keyword === aggregation Obj



  next();
} )




//TODO:  ************************** instance methods of documents ******************************


Clinic.methods.checkName=async function () {
  return ""; // return anything based on logic
}


const Clinic=mongoose.model( 'Clinic', Clinic );


module.exports=Clinic;