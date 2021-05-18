const express = require("express");
const router = express.Router();
/* const excelController = require("../controllers/excel.controller");


const upload = require("../middlewares/upload");

let routes = (app) => {
    router.get("/download", excelController.download);
    router.post("/upload", upload.single("file"), excelController.upload);
    router.get("/tutorials", excelController.getTutorials);

    app.use("/api/excel", router);
};

module.exports = routes; */

module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", tutorials.create);

    // Retrieve all Tutorials
    router.get("/", tutorials.findAll);

    // Retrieve all published Tutorials
    router.get("/published", tutorials.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", tutorials.findOne);

    // Update a Tutorial with id
    router.put("/:id", tutorials.update);

    // Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);

    // Delete all Tutorials
    router.delete("/", tutorials.deleteAll);

    app.use('/api/tutorials', router);
};


