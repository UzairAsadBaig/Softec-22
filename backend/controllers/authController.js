const crypto=require( 'crypto' )
const {
    promisify
}=require( 'util' );
const jwt=require( 'jsonwebtoken' );
const User=require( "../models/userModel" );
const catchAsync=require( "../utils/catchAysnc" );
const AppError=require( "../utils/appError" );
const sendEmail=require( "../utils/email" );

//Todo:  ************************** helper functuions ******************************

const createSignToken=( id ) => {
    return jwt.sign( {
        id, //payload(data to encode)
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_TIME
    } )
}

const createTokenSendResponse=( statusCode, user, res, req ) => {
    const token=createSignToken( user._id );


    const cookieOptions={
        // Cookie will expires and remove from browser in 90 days from now

        expires: new Date( Date.now()+( process.env.JWT_COOKIE_EXPIRE_TIME*24*60*60*1000 ) ),
        httpOnly: true, // cookie cannot be accessed or modified in any way by the browser and besides all this only thing browser can do is just recieve the cookie, store it and send it automatically along with every request
    }
    // Cookie will only be sent through encrypted connection(https)
    if ( process.env.NODE_ENV.trim()==='production' ) cookieOptions.secure=true;
    // res.header( 'Access-Control-Allow-Origin', req.headers.origin );
    // res.header( 'Access-Control-Allow-Credentials', true );

    res.cookie( 'jwt', token, cookieOptions )
    user.password=undefined;
    res.status( statusCode ).json( {
        status: "success",
        token,
        data: {
            user
        }
    } );
}

//Todo:  *************************************************


// FIX: Signig up the user 
exports.signUp=catchAsync( async ( req, res, next ) => {
    const newUser=await User.create( {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role||"user",
        CNIC: req.body.CNIC
        // role: req.body.role||"admin",
        // photo: req.body.photo
    } );

    // const newUser = await User.create( req.body );

    createTokenSendResponse( 201, newUser, res );


} );



// FIX: Logging in the user 
exports.logIn=catchAsync( async ( req, res, next ) => {

    const {
        email,
        password
    }=req.body;
    console.log( req.body )


    //? (1) Checking if user inputed email or password
    if ( !email||!password ) {
        return next( new AppError( "Please provide email or password!", 400 ) );
    }

    const user=await User.findOne( {
        email
    } ).select( '+password' );

    //? (3) Checking if user is a valid user
    if ( !user||!( await user.correctPassword( password, user.password ) ) ) {
        return next( new AppError( "Incorrect email or password!", 401 ) );
    }

    createTokenSendResponse( 200, user, res, req );

} )


// FIX: Logging in the user 
exports.logout=catchAsync( async ( req, res, next ) => {


    const cookieOptions={
        // Cookie will expires and remove from browser in 90 days from now
        expires: new Date( Date.now()+10*1000 ),
        httpOnly: true, // cookie cannot be accessed or modified in any way by the browser and besides all this only thing browser can do is just recieve the cookie, store it and send it automatically along with every request
    }

    res.cookie( 'jwt', "logout", cookieOptions );
    res.status( 200 ).json( { message: "Logged out" } );
} );






//Fix: Protecting the routes and asking user to log in first to excess the resource
exports.protect=catchAsync( async ( req, res, next ) => {
    console.log( "Cookies: ", req.cookies )
    console.log( "Header: ", req.headers )
    //? (1) Getting token and check of it's there
    const {
        authorization
    }=req.headers;
    let token;
    if ( authorization&&authorization.startsWith( 'Bearer' ) ) {
        token=authorization.split( ' ' )[ 1 ];
    } else if ( req.cookies.jwt ) {
        token=req.cookies.jwt;
    }

    if ( !token ) {
        return next( new AppError( 'You are not logged in, please log in first! or email is incorrect', 401 ) );
    }
    // console.log( token );

    //? (2) Verfication of token

    const decode=await promisify( jwt.verify )( token, process.env.JWT_SECRET ); //this will give us decoded payload object which in this case contains user id


    //? (3) check if user still exists
    const currentUser=await User.findById( decode.id );
    console.log( currentUser )
    if ( !currentUser ) {
        return next( new AppError( "The user belong to this token does no longer exist!, You need to sign up or log in again", 401 ) )
    }


    //? (4) Check if user changed password after the token was issued

    // if ( currentUser.changePasswordAfter( decode.iat ) ) {
    //     return next( new AppError( "User has recently changed the password!, Please log in again", 401 ) )
    // }

    // Now user have excess to protected route
    req.user=currentUser;

    next();
} )





//Fix: Check if the user is logged in 
exports.isLoggedIn=async ( req, res, next ) => {

    try {
        //? (1) Getting token and check of it's there
        const token=req.cookies.jwt;

        //? (2) Verfication of token
        if ( token ) {
            const decode=await promisify( jwt.verify )( token, process.env.JWT_SECRET ); //this will give us decoded payload object which in this case contains user id


            //? (3) check if user still exists
            const currentUser=await User.findById( decode.id );
            if ( !currentUser ) {
                return next();
            }


            //? (4) Check if user changed password after the token was issued
            if ( currentUser.changePasswordAfter( decode.iat ) ) {
                return next();
            }

            // User is logged in  
            res.locals.user=currentUser;
            return next();

        }
        next();

    } catch ( error ) {
        next();
    }

}






//Fix: function to restric resources only to admins
exports.restrictTo=function ( ...roles ) {

    return ( req, res, next ) => {

        console.log( "=>>>> ", req.user )
        console.log( "=>>>> ", roles )
        console.log( "=>>>> ", roles.includes( req.user.role ) )
        if ( !roles.includes( req.user.role ) ) {
            return next( new AppError( "You are not allowed to perform this action", 403 ) )
        }
        next();
    }
    // next();
}

// exports.restrictTo = ( req, res, next ) => {
//     if ( req.user.role !== 'admin' && req.user.role !== 'guide' ) {
//         return next( new AppError( "You are not allowed to perform this action", 403 ) )
//     }
//     next();
// }

// Fix: Forgot password implementation
exports.forgotPassword=catchAsync( async ( req, res, next ) => {

    const {
        email
    }=req.body;

    const user=await User.findOne( {
        email
    } )

    //? Checking the email entered by user is actually in database
    if ( !user ) {
        return next( new AppError( `No user found with email: ${email}`, 404 ) );
    }

    // console.log( user )
    //? GENERATING Random reset-token and saving encrypted reset-token in database
    const resetToken=user.createResetToken(); // plain reset-token


    await user.save( {
        validateBeforeSave: false
    } );
    // console.log( "after", "----------------------------------------------------------" );
    // console.log( '\n', user )
    // await user.save();


    // console.log( `resetToken(plain): ${resetToken}\n` );
    // console.log( `resetToken in database: ${user.passwordResetToken}\n` );


    //? Sending it to user's email
    const resetURL=`${req.protocol}://${req.get( 'host' )}/api/v1/users/resetPassword/${resetToken}`;

    const message=`Forgot your password? Submit a PATCH requets with your new password and passwordConfirm to :\n 
    ${resetURL}\nIf you didn't forgot your password, please ignore this email! 😊`;

    try {
        await sendEmail( {
            email: user.email,
            subject: 'Your Password Reset Token (valid only for 10 minutes)',
            message
        } )
    } catch ( error ) {
        user.passwordResetToken=undefined;
        user.passwordResetTokenExpires=undefined;
        await user.save( {
            validateBeforeSave: false
        } )
        next( new AppError( "There is an error occur in sending the email!, Please try again later", 500 ) )
    }

    res.status( 200 ).json( {
        message: "Password reset token send to your email"
    } )

} )



// Fix: Reset password implementation
exports.resetPassword=catchAsync( async ( req, res, next ) => {
    //? (1) Getting token out of the url and then => Get user based on the token
    const {
        // eslint-disable-next-line no-unused-vars
        token: resetToken
    }=req.params;

    const hashedToken=crypto.createHash( 'sha256' ).update( resetToken ).digest( 'hex' );

    // console.log( "Hashed Token:😍😍 ", hashedToken );
    const user=await User.findOne( {
        passwordResetToken: hashedToken,
        passwordResetTokenExpires: {
            $gt: Date.now()
        }
    } )

    //? (2) If token has not expired and the there is user, set the new password
    if ( !user ) {
        return next( new AppError( "Token is invalid or has expired!", 400 ) );
    }
    user.password=req.body.password;
    user.passwordConfirm=req.body.passwordConfirm;
    user.passwordResetToken=undefined;
    user.passwordResetTokenExpires=undefined;
    // console.log( user )
    await user.save();

    //? (3) Update changePasswordAt property for the user

    //  Done through pre(save) document middleware

    //? (4) Log the user in,send JWT


    createTokenSendResponse( 200, user, res );


} )


// Fix: Update User password implementation
exports.updatePassword=catchAsync( async ( req, res, next ) => {

    const {
        existingPassword
    }=req.body;
    //? (1) Get the user from collection
    const user=await User.findById( req.user._id ).select( '+password' );

    //? (2) Check if Posted password is correct
    if ( !( await user.correctPassword( existingPassword, user.password ) ) ) {
        return next( new AppError( "You have entered the wrong existing password!", 401 ) )
    }

    //? (3) If so, update the password
    user.password=req.body.newPassword;
    user.passwordConfirm=req.body.newPasswordConfirm;
    await user.save()

    //? (4) Log the user in, send JWT

    createTokenSendResponse( 200, user, res );


} )