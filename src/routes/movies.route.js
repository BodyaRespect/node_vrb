const express = require('express');
const moviesController = require('../controllers/movies.controller');

const moviesRouter = express.Router();

moviesRouter.get('/', moviesController.getAll);
moviesRouter.get('/:id', moviesController.getOne);
moviesRouter.post('/', moviesController.create);
moviesRouter.patch('/:id', moviesController.update);
moviesRouter.delete('/:id', moviesController.remove);

module.exports = {
  moviesRouter,
};
