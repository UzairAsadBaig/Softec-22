const mongoose=require( 'mongoose' );
const User=require( './userModel' );
// const validator = require( "validator" );
// const Tour=require( './tourModel' );




const reviewSchema=new mongoose.Schema( {
    comment: {
        type: String,
        trim: true,
        required: [ true, "Review can't be empty!" ]
    },

    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [ true, "Please provide some ratings!" ]
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

    // **** Parent refrencing
    doctor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [ true, "Review must belong to a Doctor. Maybe you are not logged in" ]
    },
    patient: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [ true, "Please add review. Maybe you are not logged in" ]
    },



}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },

} )


//! Giving indexs
reviewSchema.index( {
    // doctor: 1,
    // patient: 1
}, {
    unique: true
} ) //tour and users(combinely) must be unique





//Optimize:  ***************** Static Methods(Functions that are accesible to) *****************
//! Function to calculate the Avg. Ratings 
reviewSchema.statics.calcRatingStats=async function ( docId ) {
    const stats=await this.aggregate( [ {
        $match: {
            doctor: docId
        }
    },

    {
        $group: {
            _id: '$doctor',
            noRatings: {
                $sum: 1
            },
            averageRating: {
                $avg: '$rating'
            }
        }
    }
    ] )
    console.log( stats );
    if ( stats.length>0 ) {
        await User.findByIdAndUpdate( docId, {
            ratingsAverage: stats[ 0 ].averageRating,
            ratingsQuantity: stats[ 0 ].noRatings
        } )
    } else {
        await User.findByIdAndUpdate( docId, {
            ratingsAverage: 1,
            ratingsQuantity: 0
        } )
    }



}







//Todo: ************************** Document/query/aggregation middlewares ******************************
//! DOCUMENT MIDDLEWARE : runs before .save() and .create()
reviewSchema.post( 'save', function ( doc, next ) {
    // this.constructor => Review
    this.constructor.calcRatingStats( this.doctor );
    next();
} )



// ! QUERRY MIDDLEWARE: runs before executing any find query
reviewSchema.pre( 'find', function ( next ) {

    this.populate( { path: 'patient' } )
    next();

} )


reviewSchema.post( /^findOneAnd/, async function ( doc, next ) {

    // const ReviewModel=doc.constructor;
    // const docId=doc.doctor;
    // ReviewModel.calcRatingStats( docId );

    next()
} )



const Review=mongoose.model( "Review", reviewSchema );

module.exports=Review;