var express = require('express');
var router = express.Router();
var model = require('../models/index');
var sequelize = require('sequelize');

// get todos
router.get('/', async function (req, res, next) {
    try {
        const page = req.query.page == null ? 1 : parseInt(req.query.page);
        const limit = req.query.limit == null ? 10 : parseInt(req.query.limit);
        const offset = (page - 1) * limit;

        const todos = await model.todos.findAll({
            include: [
                {
                    model: model.users
                }
            ],
            order: [
                ['id', 'DESC']
            ],
            limit: limit,
            offset: offset
        });

        var countTodos = await model.todos.findAll({
            include: [
                {
                    model: model.users
                }
            ],
            attributes: [
                [sequelize.fn('count', 'id'), '_total']
            ]
        });

        countTodos = countTodos[0].dataValues._total;

        res.json({
            error: false,
            data: {
                todos: todos,
                misc: {
                    page: page,
                    limit: limit,
                    todos: {
                        totalItems: countTodos,
                        totalPages: Math.ceil(countTodos / limit)
                    }
                }
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