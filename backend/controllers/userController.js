// const multer=require( 'multer' );
// const sharp=require( 'sharp' );
const User=require( "../models/userModel" );
const catchAsync=require( "../utils/catchAysnc" );
const AppError=require( "../utils/appError" );
const factory=require( './FactoryHandler' );


//Todo:  ************************** helper functuions ******************************

const filterObject=( obj, ...fields ) => {
    // eslint-disable-next-line prefer-const
    let newObj={};

    Object.keys( obj ).forEach( el => {
        if ( fields.includes( el ) ) {
            newObj[ el ]=obj[ el ];
        }
    } )
    return newObj;
}

//FIX: Image uploading functionality
// const multerStorage=multer.diskStorage( {
//     destination: ( req, file, cb ) => {
//         cb( null, 'public/img/users')
//     },
//     filename: ( req, file, cb ) => {
//         const extension = file.mimetype.split( '/' )[ 1 ];
//         cb( null, `user-${req.user._id}-${Date.now()}.${extension}` );
//     }
// })


// const multerStorage = multer.memoryStorage();

// const multerFilter=( req, file, cb ) => {
//     if ( file.mimetype.startsWith( 'image' ) ) {
//         // console.log( file );
//         req.file=file;
//         cb( null, true )
//     }
//     else {
//         cb( new AppError( "Only image file can be uploaded", 400 ),false );
//     }
// }

// const upload = multer( {
//     storage: multerStorage,
//     fileFilter:multerFilter
// } ); // save the file got from form in respective destination


//Todo:  *************************************************




//Optimize:                    ************** Route handler Functions ***************


// exports.uploadUserPhoto = upload.single( 'photo' );
// exports.resizeUserPhoto = ( req, res, next ) => {
//     // console.log( req.file );
//     if ( !req.file ) return next();

//     req.file.filename=`user-${req.user._id}-${Date.now()}.jpeg`;

//     sharp( req.file.buffer )
//         .resize( 500, 500 )
//         .toFormat( 'jpeg' )
//         .jpeg( { quality: 90 } )
//         .toFile( `public/img/users/${req.file.filename}` );

//     next();

// }


//Fix: Update curently logged in user
exports.updateMe=catchAsync( async ( req, res, next ) => {

    // console.log( req.file );
    // console.log( req.body );


    //? (1) Create error if user POSTs password data
    if ( req.body.password||req.body.passwordConfirm ) {
        return next( new AppError( "This URL is not for password updates. Please go to /updateMyPassword", 400 ) );
    }


    //? (2) Filtered out unwanted field names that are not allowed to be updated
    const filteredObj=filterObject( req.body, 'firstName', 'lastName', 'email' );
    // console.log( req.file );
    // if ( req.file ) filteredObj.photo = req.file.filename;

    //? (3) update User document
    const updatedUser=await User.findByIdAndUpdate( req.user._id, filteredObj, {
        new: true,
        runValidators: true
    } )

    res.status( 201 ).json( {
        status: "success",
        user: updatedUser
    } )

} )

//Fix: delete curently logged in user
exports.deleteMe=catchAsync( async ( req, res, next ) => {
    //? (1) get the current user document by id and set its active property to false
    await User.findByIdAndUpdate( req.user._id, {
        active: false
    } )

    //? (2) Send the delete response with 204 code
    res.status( 204 ).json( {
        status: "success",
        data: null
    } )
} )


// FIX: get all users
exports.getAllUsers=factory.getAll( User );

// FIX: get single users basaed on id
exports.getUser=factory.getOne( User );

// FIX: Create user basaed (By Admins)
exports.createUser=factory.createOne( User, { ret: true } );

// FIX: update user based on id (By Admins)  and don't update password
exports.updateUser=catchAsync( async ( req, res, next ) => {
    console.log( "param id: ", req.params.id )
    console.log( req.body )
    const data={
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        CNIC: req.body.CNIC,
    }
    const doc=await User.findByIdAndUpdate( req.params.id, data, {
        new: true,
        // runValidators: true
    } );
    console.log( doc );

    if ( !doc ) {
        return next( new AppError( `Could not found document with ID: ${req.params.id}`, 404 ) );
    }



    req.body.existingPassword=req.body.password;
    next();
} )

exports.updateUserPass=catchAsync( async ( req, res, next ) => {

    const {
        existingPassword
    }=req.body;
    //? (1) Get the user from collection
    const user=await User.findById( req.params.id ).select( '+password' );

    //? (3) If so, update the password
    user.password=req.body.password;
    user.passwordConfirm=req.body.passwordConfirm;
    await user.save()

    res.status( 200 ).json( {
        status: 'success',
        data: user
    } );

} )

// FIX: delete user based on id (By Admins)
exports.deleteUser=factory.deleteOne( User );