const express=require( "express" );

const {
    getAllReviews,
    createReview,
    deleteReview,
    updateReview,
    setUserId,
    getReview

}=require( `./../controllers/reviewController` );
const {
    protect,
    restrictTo
}=require( "../controllers/authController" );



//Optimize:  **************************  Routes ******************************
const reviewRouter=express.Router( {
    mergeParams: true
} );

//! Below routes are on for logged-in users 
reviewRouter.use( protect ); //protecting below routes
reviewRouter.route( '/' )
    .get( getAllReviews )
    .post( restrictTo( 'patient' ), setUserId, createReview )

reviewRouter.route( '/:id' )
    .get( getReview )
// .patch( restrictTo( 'user', 'doctor' ), updateReview )
// .delete( restrictTo( 'user', 'doctor' ), deleteReview )



module.exports=reviewRouter;
