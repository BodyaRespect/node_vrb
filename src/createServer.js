'use strict';

const express = require('express');
const { moviesRouter } = require('./routes/movies.route');

const createServer = () => {
  const app = express();

  app.use('/movies', express.json(), moviesRouter);

  return app;
};

module.exports = {
  createServer,
};
