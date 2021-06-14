const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const dbConfig = require("./app/config/db.config");
const path = __dirname + '/app/views/';

const app = express();

app.use(express.static(path));

var corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

app.get('/', function (req,res) {
    res.sendFile(path + "index.html");
});

require('./app/routes/auth.routes')(app);
require('./app/routes/card.routes')(app);
require('./app/routes/transaction.routes')(app);
require('./app/routes/profilecards.routes')(app);
require('./app/routes/profiletransactions.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });
        }
    });
}