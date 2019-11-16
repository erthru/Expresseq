var express = require('express');
var router = express.Router();
var model = require('../models/index');

// get todos
router.get('/', async function (req, res, next) {
    try {
        const todos = await model.todos.findAll({
            include: [
                {
                    model: model.users
                }
            ],
            order: [
                ['id', 'DESC']
            ]
        });
        
        res.json({
            error: false,
            data: {
                todos: todos
            }
        });
    } catch (err) {
        res.json({
            error: true,
            data: err.message
        });
    }
});

// get todo
router.get('/:id', async function (req, res, next) {
    try {
        const todo = await model.todos.findByPk(req.params.id, {
            include: [
                {
                    model: model.users
                }
            ]
        });

        res.json({
            error: false,
            data: {
                todo: todo
            }
        });
    } catch (err) {
        res.json({
            error: true,
            data: err.message
        });
    }
});

// create todo
router.post('/', async function (req, res, next) {
    try {
        const body = {
            title: req.body.title,
            content: req.body.content,
            userId: req.body.userid
        };

        const todo = await model.todos.create(body);

        res.json({
            error: false,
            data: {
                todo: todo
            }
        });
    } catch (err) {
        res.json({
            error: true,
            data: err.message
        });
    }
});

// update todo
router.put('/:id', async function (req, res, next) {
    try {
        const body = {
            title: req.body.title,
            content: req.body.content,
            userId: req.body.userid
        };

        const updateStatus = await model.todos.update(body, {
            where: {
                id: req.params.id
            }
        });

        res.json({
            error: false,
            data: {
                status: updateStatus
            }
        });
    } catch (err) {
        res.json({
            error: true,
            data: err.message
        });
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        const deleteStatus = await model.todos.destroy({
            where: {
                id: req.params.id
            }
        });

        res.json({
            error: false,
            data: {
                status: deleteStatus
            }
        });
    } catch (err) {
        res.json({
            error: true,
            data: err.message
        });
    }
});

module.exports = router;