const db = require("../models");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Transaction = db.transaction;


exports.findTransactionsByUser = (req, res) => {
    const id = req.params.id;

    Transaction.aggregate([
        {$match:
                {
                    users: new ObjectId(id)
                }
        },
    ])
        .then ( data => {
            if (!data)
                res.status(404).send({ message: "Not found Transactions with user id:" + id });
            else res.send(data);
        });
};