const mongoose=require( 'mongoose' );
const validator=require( "validator" );
const bcrypt=require( 'bcryptjs' );
const crypto=require( 'crypto' );

//Optimize:  ************************** User Modal Schema ******************************
const userSchema=new mongoose.Schema( {
    name: {
        type: String,
        required: [ true, "Please Enter name!" ],
        trim: true
    },

    address: {
        type: String,
        required: [ true, "Please Enter address!" ],
        trim: true
    },
    gender: {
        type: String,
        enum: [ "male", "female", "others" ],
        required: [ true, "Provide your gender" ]
    },
    ratingsAverage: {
        type: Number,
        min: [ 1, "Rating shouuld be greater than or equal to 1.0" ],
        max: [ 5, "Rating shouuld be less than or equal to 5.0" ],
        set: ( val ) => Number( val.toFixed( 1 ) )
    },

    ratingsQuantity: {
        type: Number,
        default: 0
    },

    // photo: {
    //     type: String,
    //     default: 'default.jpg' 
    // },

    role: {
        type: String,
        enum: [ "patient", "doctor" ],
        default: "patient"
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    phone: {
        type: String,
        required: [ true, "please provide your phone number" ],
        unique: [ true, "User already exist with this phone no!" ],
        validate: {
            validator: function ( val ) {
                console.log( ( /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/ ).test( val ) )
                return ( /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/ ).test( val )
            },
            message: "Phone No is incorrect"
        }
    },
    DOB: {
        type: String,
        required: [ true, "Provide DOB" ],

    },


    password: {
        type: String,
        required: [ true, 'Please provide your password' ],
        minLength: [ 8, "Password must be of atleast 8 characters long" ],
        select: false
    },

    passwordConfirm: {
        type: String,
        required: [ true, 'Please confirm your password' ],
        validate: {
            validator: function ( val ) {
                return val===this.password
            },
            message: "Password and Confirm-password are not same!"
        }
    },

    changePasswordAt: Date,

    passwordResetToken: String,

    passwordResetTokenExpires: Date,

    speciality: {
        type: String,

    },


},
    {
        // TO SEE VIRTUAL FIELDS 
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        },

    } );

userSchema.virtual( "appointmentPlans", {
    ref: "Appointment",
    localField: "_id",
    foreignField: "patient"
} )
userSchema.virtual( "appointmentSchedule", {
    ref: "Appointment",
    localField: "_id",
    foreignField: "doctor"
} )
userSchema.virtual( 'reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'doctor'
} )


//Todo: ************************** Document/query/aggregation middlewares ******************************
userSchema.pre( 'save', async function ( next ) {
    // Function runs only when we are modifying password field or on creating new user
    if ( !this.isModified( 'password' ) ) return next();
    // console.log( "hi from document", this )
    // Encrypting the password before saving it to database 
    this.password=await bcrypt.hash( this.password, 12 );
    this.passwordConfirm=undefined;
    next();
} )

userSchema.pre( 'save', function ( next ) {
    if ( !this.isModified( 'password' )||this.isNew ) return next();

    this.changePasswordAt=Date.now()-1000;
    next()
} )

userSchema.pre( /^find/, function ( next ) {
    this.find( {
        active: true
    } );
    next()
} )



//Fix:  ************************** instance methods of documents ******************************

//Fix:Function to check password entered by user and encrypted password in db are same
userSchema.methods.correctPassword=async function ( userPassword, encryptedPassword ) {
    return await bcrypt.compare( userPassword, encryptedPassword );
}

//Fix:Function to check if user has changed the password after sign in is generated
userSchema.methods.changePasswordAfter=function ( jwtTimestamp ) {
    if ( this.changePasswordAt ) {
        const changePasswordTimestamp=parseInt( this.changePasswordAt/1000, 10 );
        return jwtTimestamp<changePasswordTimestamp //200<300
    }
    return false;

}

//Fix:Funtion to create reset-token and put that in databse of particular user
userSchema.methods.createResetToken=function () {

    const resetToken=crypto.randomBytes( 32 ).toString( 'hex' );

    this.passwordResetToken=crypto.createHash( 'sha256' ).update( resetToken ).digest( 'hex' );
    this.passwordResetTokenExpires=Date.now()+( 10*60*1000 );
    // console.log( "the encrypted resetToken in db 😎😎: ", this.passwordResetToken )

    return resetToken;
}

const User=mongoose.model( 'User', userSchema );


module.exports=User;