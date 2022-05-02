const mongoose = require("mongoose");
const articleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: 'Title is Required',
            trim: true
        },
        body: {
            type: String,
            required: 'Title is Required',
            trim: true
        },

        Description: {
            type: String,
            trim: true
        },


    },
    { timestamps: true }
);

module.exports = mongoose.model("article", articleSchema);
