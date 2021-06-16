module.exports = app => {
    const cards = require("../controllers/joinCardsUsers.controller.js");

    var router = require("express").Router();

    // /api/profilecards/id: GET
    router.get("/", cards.joinCardsUsers);

    app.use('/api/cardsuser', router);
};