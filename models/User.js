const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type:String
    },
     following: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'user'
                }
            }
        ],
        followers: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'user'
                }
            }
        ],
         messagePrivacy: {
            type: String,
            enum: ['open', 'mutual'],
            default: 'open'
        },
        blockedUsers: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'user'
                }
            }
        ],
        isPrivate: {
            type: Boolean,
            default: false
        },
         resetPasswordOtp: {
            type: String
        },
        resetPasswordOtpExpire: {
            type: Date
        },
    data:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);