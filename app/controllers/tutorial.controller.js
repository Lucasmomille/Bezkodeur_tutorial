const db = require("../models");
const Tutorial = db.tutorials;
const Comment = db.comments;
const Tag = db.tags;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    console.log(req.body);
    if (!req.body.title) {
        res.status(400).send({
            message: "Title can not be empty"
        });
        return;
    }

    // Create a Tutorial
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    // Save Tutorial in the database
    Tutorial.create({
        title: tutorial.title,
        description: tutorial.description,
        published: tutorial.published ? tutorial.published : false
    }).then((tutorial) => {
        console.log(`>> Created Tutorial ${JSON.stringify(tutorial, null, 4)}`);
        res.send(tutorial);
    }).catch((err) => {
        console.error(">> Error while creating tutorial: ", err);
        res.status(500).send({
            message: err.message || "Some error occurred while creating the tutorial."
        })
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Tutorial.findAll({
        where: condition,
        include: [
            {
                model: Comment,
                as: "comments"
            },
            {
                model: Tag,
                as: "tags",
                attributes: ["id", "name"],
                through: {
                    attributes: [],
                },
            }
        ],
    }).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Find a single Tutorial with an id
exports.findById = (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id, {
        include: [
            {
                model: Comment,
                as: "comments",
            },
            {
                model: Tag,
                as: "tags",
                attributes: ["id", "name"],
                through: {
                    attributes: [],
                }
            }
        ]
    })
        .then((tutorial) => {
            res.send(tutorial);
        })
        .catch((err) => {
            console.log(">> Error while finding tutorial: ", err);
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Tutorials were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};
