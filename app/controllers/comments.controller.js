const db = require('../models');
const Tutorial = db.tutorials;
const Comment = db.comments;

exports.create = (tutorialId, comment) => {

    Comment.create({
        name: comment.name,
        text: comment.text,
        tutorialId: tutorialId,
    }).then((comment) => {
        console.log(`>> Created Comment ${JSON.stringify(comment, null, 4)}`);
        res.send(comment);
    }).catch((err) => {
        console.error(">> Error while creating comment: ", err);
        res.status(500).send({
            message: err.message || "Some error occurred while creating the comment."
        })
    });
}

exports.findById = (id) => {
    Comment.findByPk(id, { include: ["tutorial"] })
        .then((comment) => {
            res.send(comment);;
        })
        .catch((err) => {
            console.log(">> Error while finding comment: ", err);
        });
};