const db = require("../models");
const Card = db.card;
const User = db.user;

exports.create = (req, res) => {
    const card = new Card({
        number: req.body.number,
        expDate: req.body.expDate,
        cvv: req.body.cvv,
    });

    card.save((err, card) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (req.body.users) {
            User.find(
                {
                    username: { $in: req.body.users }
                },
                (err, users) => {
                    if (err) {
                        res.status(500).send({message: err});
                        return;
                    }

                    card.users = users.map(user => user._id);
                    card.save(err => {
                        if (err) {
                            res.status(500).send({message: err});
                            return;
                        }

                        res.send({message: "Card created successfully!"});
                    });
                }
            )
        }
    });
};

exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Card.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Cards."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Card.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Card with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Card with id=" + id });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Card.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Card with id=${id}. Card was not found!`
                });
            } else {
                res.send({
                    message: "Card was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Card with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Card.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Cards were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Cards."
            });
        });
};