const mongoose = require("mongoose");

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: {
            type: String,
            required: [true, 'Username required']
        },
        name: String,
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: 'Email address is required',
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        password: {
            type: String,
            required: true,
            minlength: [7, "Minimum length of the password is 7"],
            maxlength: 15
        },
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ]
    })
);

module.exports = User;