const express=require( "express" );

const {
    getAllUsers,
    getUser,
    deleteUser,
    updateMe,
    deleteMe,
    updateUser, // For admins
    createUser,
    updateUserPass, // For admins
    // uploadUserPhoto,
    // resizeUserPhoto
}=require( `./../controllers/userController` );


const {
    signUp,
    logIn,
    forgotPassword,
    resetPassword,
    updatePassword,
    protect,
    restrictTo
}=require( "../controllers/authController" );






const userRouter=express.Router();

//Optimize:                    ************** Routes ***************

//! Below routes are for Non-logged-in users
userRouter.post( '/signup', signUp );
userRouter.post( '/login', logIn );
userRouter.post( '/forgotpassword', forgotPassword );
userRouter.patch( '/resetpassword/:token', resetPassword );
userRouter.route( "/:id" )
    .get( getUser )


//! Below routes are for logged-in users
userRouter.use( protect ); // protecting routes
userRouter.patch( '/updatemypassword', updatePassword );
// userRouter.patch( '/updateMe', uploadUserPhoto, resizeUserPhoto , updateMe );
userRouter.patch( '/updateme', updateMe );
userRouter.delete( '/deleteme', deleteMe );
userRouter.get( '/me', getUser )



//! Below routes are restricted to only admins
userRouter.use( restrictTo( 'admin' ) ); // restricting routes
userRouter.route( "/" )
    .get( getAllUsers )
    .post( createUser )


userRouter.route( "/:id" )
    .delete( deleteUser )
    .patch( updateUser, updateUserPass )

module.exports=userRouter;