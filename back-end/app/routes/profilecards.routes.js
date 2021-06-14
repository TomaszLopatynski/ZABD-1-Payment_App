module.exports = app => {
    const cards = require("../controllers/profilecards.controller.js");

    var router = require("express").Router();

    // /api/profilecards/id: GET
    router.get("/:id", cards.findCardsByUser);

    app.use('/api/profilecards', router);
};