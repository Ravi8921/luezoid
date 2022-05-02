const mongoose = require('mongoose');
let ObjectId= mongoose.Schema.Types.ObjectId
const subscriptionSchema = new mongoose.Schema(
    {
        
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: "Email address is required",
        },
        articleId: {
            required: "web id is required",
            type: mongoose.Schema.Types.ObjectId,
        },


    },
    { timestamps: true }
);

module.exports = mongoose.model("subscription", subscriptionSchema);
