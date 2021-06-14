module.exports = app => {
    const transactions = require("../controllers/transaction.controller.js");

    var router = require("express").Router();

    // /api/bikes: GET, POST, DELETE
    router.post("/", transactions.create);
    router.get("/", transactions.findAll);
    router.delete("/", transactions.deleteAll);

    // /api/bikes/:id: GET, DELETE
    router.get("/:id", transactions.findOne);
    router.delete("/:id", transactions.delete);

    app.use('/api/transactions', router);
};