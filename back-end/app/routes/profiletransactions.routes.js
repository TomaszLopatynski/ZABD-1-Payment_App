module.exports = app => {
    const cards = require("../controllers/profiletransactions.controller.js");

    var router = require("express").Router();

    // /api/profiletransactions/id: GET
    router.get("/:id", cards.findTransactionsByUser);

    app.use('/api/profiletransactions', router);
};