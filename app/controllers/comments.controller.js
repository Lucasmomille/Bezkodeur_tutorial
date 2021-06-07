const db = require('../models');
//const Tutorial = db.tutorials;
const Comment = db.comments;

exports.create = (req, res) => {

    Comment.create({
        name: req.body.name,
        text: req.body.text,
        tutorialId: req.body.tutorialId,
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

exports.findById = (req, res) => {
    const id = req.params.id;
    Comment.findByPk(id, { include: ["tutorial"] })
        .then((comment) => {
            res.send(comment);;
        })
        .catch((err) => {
            console.log(">> Error while finding comment: ", err);
        });
};