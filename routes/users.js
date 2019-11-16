var express = require('express');
var router = express.Router();
var model = require('../models/index');

// get users
router.get('/', async function (req, res, next) {
  try {
    const users = await model.users.findAll({
      order: [
        ['id', 'DESC']
      ]
    });

    res.json({
      error: false,
      data: {
        users: users
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
    const user = await model.users.findByPk(req.params.id, {
      include: [
        {
          model: model.todos
        }
      ]
    });

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
