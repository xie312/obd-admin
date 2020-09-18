//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const diagnostic = require('../../models/Diagnostic');

// GET HTTP sorted and paginated data
router.get('/', (req, res) => {
    diagnostic.getAll(req.query, (err, items, length) => {
        if (err) {
            res.status(501).json({
                success: false,
                message: `Failed to load all items. Error: ${err}`
            });
        } else {
            res.status(200).write(JSON.stringify({
                success: true,
                items: items,
                length: length
            }, null, 2));
            res.end();

        }
    });
});

// GET HTTP id data
router.get('/:id', (req, res) => {
    //access the parameter which is the id of the item to be deleted
    let id = req.params.id;
    diagnostic.getById(id, (err, items) => {
        if (err) {
            res.status(501).json({
                success: false,
                message: `Failed to load single task. Error: ${err}`
            });
        } else {
            res.status(200).write(JSON.stringify({
                success: true,
                items: items
            }, null, 2));
            res.end();

        }
    });
});

//POST HTTP method to add task
router.post('/', (req, res, next) => {
    let newItem = new diagnostic({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
    });

    diagnostic.add(newItem, (err, list) => {
        if (err) {
            res.status(501).json({
                success: false,
                message: `Failed to create a new task. Error: ${err}`
            });

        } else
            res.status(200).json({
                success: true,
                message: "Added successfully."
            });

    });
});

//DELETE HTTP method to delete task. Here, we pass in a param which is the object id.
router.delete('/:id', (req, res, next) => {
    //access the parameter which is the id of the item to be deleted
    let id = req.params.id;
    //Call the model method deleteListById
    diagnostic.deleteById(id, (err, list) => {
        if (err) {
            res.status(501).json({
                success: false,
                message: `Failed to delete the task. Error: ${err}`
            });
        } else if (list) {
            res.status(200).json({
                success: true,
                message: "Deleted successfully"
            });
        } else {
            res.status(501).json({
                success: false,
                message: `Failed to delete the task. Unknown Error.`
            });
        }
    });
});

//PUT HTTP method to update task. Here, we pass in id and updated task in body.
router.put('/:id', (req, res, next) => {
    let id = req.params.id;
    diagnostic.updateById(id, req.body.task, (err, updatedTask) => {
        if (err) {
            res.status(501).json({
                success: false,
                message: `Failed to update the task. Error: ${err}`
            });
        } else if (updatedTask) {
            res.status(200).json({
                success: true,
                message: "Updated successfully"
            });
        } else {
            res.status(501).json({
                success: false,
                message: `Failed to update the task. Unknown Error.`
            });
        }
    })
});

module.exports = router;