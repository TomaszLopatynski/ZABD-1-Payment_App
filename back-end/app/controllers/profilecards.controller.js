const db = require("../models");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Card = db.card;


exports.findCardsByUser = (req, res) => {
    const id = req.params.id;

    Card.aggregate([
            {$match:
                    {
                        users: new ObjectId(id)
                    }
            },
        ])
        .then ( data => {
            if (!data)
                res.status(404).send({ message: "Not found Cards with user id:" + id });
            else res.send(data);
        });
};