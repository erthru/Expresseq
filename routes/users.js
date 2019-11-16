var express = require('express');
var router = express.Router();
var model = require('../models/index');
var sequelize = require('sequelize');

// get users
router.get('/', async function (req, res, next) {
  try {
    const page = req.query.page == null ? 1 : parseInt(req.query.page);
    const limit = req.query.limit == null ? 10 : parseInt(req.query.limit);
    const offset = (page - 1) * limit;

    const users = await model.users.findAll({
      order: [
        ['id', 'DESC']
      ],
      limit: limit,
      offset: offset
    });

    var countUsers = await model.users.findAll({
      attributes: [
        [sequelize.fn('count', 'id'), '_total']
      ]
    });

    countUsers = countUsers[0].dataValues._total;

    res.json({
      error: false,
      data: {
        users: users,
        misc:{
          page: page,
          limit: limit,
          users:{
            totalItems: countUsers,
            totalPages: Math.ceil(countUsers / limit)
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

// get user
router.get('/:id', async function (req, res, next) {
  try {
    const page = req.query.page == null ? 1 : parseInt(req.query.page);
    const limit = req.query.limit == null ? 10 : parseInt(req.query.limit);
    const offset = (page - 1) * limit;

    const user = await model.users.findByPk(req.params.id, {
      include: [
        {
          model: model.todos,
          order: [
            ['id', 'DESC']
          ],
          limit: limit,
          offset: offset
        }
      ]
    });

    var countTodos = await model.users.findByPk(req.params.id, {
      include: [
        {
          model: model.todos,
          attributes: [
            [sequelize.fn('count', 'id'), '_total']
          ]
        }
      ]
    });

    countTodos = countTodos.todos[0].dataValues._total;

    res.json({
      error: false,
      data: {
        user: user,
        misc:{
          page: page,
          limit: limit,
          todos:{
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

// create user
router.post('/', async function (req, res, next) {
  try {
    const body = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    };

    const user = await model.users.create(body);

    res.json({
      error: false,
      data: {
        user: user
      }
    });
  } catch (err) {
    res.json({
      error: true,
      data: err.message
    });
  }
});

// update user
router.put('/:id', async function (req, res, next) {
  try {
    const body = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    };

    const updateStatus = await model.users.update(body, {
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
    const deleteStatus = await model.users.destroy({
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
