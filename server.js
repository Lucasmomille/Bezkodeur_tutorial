const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
//app.use(express.urlencoded({ extended: true }));


const db = require("./app/models");
//db.sequelize.sync();


/* For development , you may need to drop existing 
tables and re-sync database. Just use force: true as following code */
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});


require("./app/routes/tutorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
