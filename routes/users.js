var express = require('express');
var router = express.Router();
var model = require('../models/index');

router.get('/', async function (req, res, next) {
  try {
    res.json({
      error: false,
      data: await model.users.findAll({
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
      data: await model.users.findByPk(req.params.id, {
        include: [
          {
            model: model.todos
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
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    };

    res.json({
      error: false,
      data: await model.users.create(body)
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
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    };

    res.json({
      error: false,
      data: await model.users.update(body, {
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
      data: await model.users.destroy({
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
