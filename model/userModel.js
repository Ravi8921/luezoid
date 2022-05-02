const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            lowercase: true,
            required: "name is required"
        } ,
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: 'Email address is required',

        },
        password: {
            type: String,
            required: 'Password is required'
        }
    }, { timestamps: true }
)


module.exports = mongoose.model('user', userSchema)

