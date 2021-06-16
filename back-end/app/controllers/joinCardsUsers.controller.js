const db = require("../models");
const Card = db.card;


exports.joinCardsUsers = (req, res) => {

    Card.aggregate([
        {
            $lookup:
                {
                    from: 'users',
                    localField: 'user',
                    foreignField: '-id',
                    as: 'joined Card for users:'
                }
        }
    ])
        .then ( data => {
            if (!data)
                res.status(404).send({ message: "Not found Cards with user id:" + id });
            else res.send(data);
        });
};