const db = require("../models");
const Transaction = db.transaction;
const User = db.user;

exports.create = (req, res) => {
    const transaction = new Transaction({
        amount: req.body.amount,
        receiverCN: req.body.receiverCN,
        date: new Date(),
    });

    transaction.save((err, transaction) => {
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

                    transaction.users = users.map(user => user._id);
                    transaction.save(err => {
                        if (err) {
                            res.status(500).send({message: err});
                            return;
                        }

                        res.send({message: "Transaction created successfully!"});
                    });
                }
            )
        }
    });
};

exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Transaction.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Transactions."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Transaction.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Transaction with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Transaction with id=" + id });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Transaction.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Transaction with id=${id}. Transaction was not found!`
                });
            } else {
                res.send({
                    message: "Transaction was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Transaction with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Transaction.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Transactions were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Transactions."
            });
        });
};