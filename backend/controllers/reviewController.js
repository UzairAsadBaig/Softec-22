const Review=require( "../models/reviewModal" )
// const catchAsync = require( './../utils/catchAysnc' );
// eslint-disable-next-line no-unused-vars
const AppError=require( "../utils/appError" );
const factory=require( './FactoryHandler' );




// Fix: Sets user and tour refrences
exports.setUserId=( req, res, next ) => {
    // req.body.tour = req.body.tour || req.params.tourId;
    req.body.patient=req.body.patient||req.user._id;
    next();
}



//Fix: Get all the reviews 
exports.getAllReviews=factory.getAll( Review, { path: 'patient' } );

//Fix: get a review based on id
exports.getReview=factory.getOne( Review, { path: 'patient' } );

//Fix: Create a review
exports.createReview=factory.createOne( Review );

// FIX: update review based on id 
exports.updateReview=factory.updateOne( Review );

// FIX: delete review based on id
exports.deleteReview=factory.deleteOne( Review );