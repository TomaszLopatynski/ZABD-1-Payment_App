const mongoose = require("mongoose");

const Card = mongoose.model(
    "Card",
    new mongoose.Schema({
        number: Number,
        expDate: String,
        cvv: Number,
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    })
);

module.exports = Card;