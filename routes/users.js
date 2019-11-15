var express = require('express');
var router = express.Router();
var model = require('../models/index').users;

router.get('/', async function (req, res, next) {
  try {
    res.json({
      error: false,
      data: await model.findAll({})
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
      data: await model.findByPk(req.params.id)
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
      data: await model.create(body)
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
      data: await model.update(body, {
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
    await model.destroy({
      where: {
        id: req.params.id
      }
    });

    res.json({
      error: false,
      data: 1
    });
  } catch (err) {
    res.json({
      error: true,
      data: err.message
    });
  }
});

module.exports = router;
