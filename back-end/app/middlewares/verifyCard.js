const db = require("../models");
const Card = db.card;

checkDuplicateCard = (req, res, next) => {
    // Username
    Card.findOne({
        number: req.body.number
    }).exec((err, card) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (card) {
            res.status(400).send({ message: "Failed! Card is already in use!" });
        }
    });

    next();
};

const verifyCard= {
    checkDuplicateCard
};

module.exports = verifyCard;