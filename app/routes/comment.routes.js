module.exports = app => {
    const comments = require("../controllers/comment.controller.js");

    var router = require("express").Router();

    // Create a new comment
    router.post("/", comments.create);

    // Retrieve a single comment with id
    router.get("/:id", comments.findById);


    app.use('/api/comments', router);
};