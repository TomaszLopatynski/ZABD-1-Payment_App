const mongoose = require("mongoose");

const Transaction = mongoose.model(
    "Transaction",
    new mongoose.Schema({
        amount: Number,
        receiverCN: Number,
        date: Date,
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    })
);

module.exports = Transaction;