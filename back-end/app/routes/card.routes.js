const { verifyCard } = require("../middlewares");

module.exports = app => {
    const cards = require("../controllers/card.controller.js");

    var router = require("express").Router();

    // /api/cards: GET, POST, DELETE
    router.post("/", verifyCard.checkDuplicateCard, cards.create);
    router.get("/", cards.findAll);
    router.delete("/", cards.deleteAll);

    // /api/cards/:id: GET, DELETE
    router.get("/:id", cards.findOne);
    router.delete("/:id", cards.delete);

    app.use('/api/cards', router);
};