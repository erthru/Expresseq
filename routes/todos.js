var express = require('express');
var router = express.Router();
var model = require('../models/index');

router.get('/', async function (req, res, next) {
    try {
        res.json({
            error: false,
            data: await model.todos.findAll({
                include: [
                    {
                        model: model.users
                    }
                ],
                order: [
                    ['id', 'DESC']
                ]
            })
        });
    } catch (err) {
        res.json({
            error: true,
            data: err.message
        });
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        res.json({
            error: false,
            data: await model.todos.findByPk(req.params.id, {
                include: [
                    {
                        model: model.users
                    }
                ]
            })
        });
    } catch (err) {
        res.json({
            error: true,
            data: err.message
        });
    }
});

router.post('/', async function (req, res, next) {
    try {
        const body = {
            title: req.body.title,
            content: req.body.content,
            userId: req.body.userid
        };

        res.json({
            error: false,
            data: await model.todos.create(body)
        });
    } catch (err) {
        res.json({
            error: true,
            data: err.message
        });
    }
});

router.put('/:id', async function (req, res, next) {
    try {
        const body = {
            title: req.body.title,
            content: req.body.content,
            userId: req.body.userid
        };

        res.json({
            error: false,
            data: await model.todos.update(body, {
                where: {
                    id: req.params.id
                }
            })
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
        res.json({
            error: false,
            data: await model.todos.destroy({
                where: {
                    id: req.params.id
                }
            })
        });
    } catch (err) {
        res.json({
            error: true,
            data: err.message
        });
    }
});

module.exports = router;