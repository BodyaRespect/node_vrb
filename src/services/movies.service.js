/* eslint-disable no-console */
const { Movie } = require('../models/Movie.model.js');
const { buildWhereClause } = require('../utils/filters.js');

const getAll = async (filters) => {
  const whereClause = buildWhereClause(filters);

  return Movie.findAll({
    attributes: [
      'id',
      'title',
      'description',
      'actors',
      'director',
      'genre',
      'rating',
      'releaseDate',
      'image',
    ],
    where: whereClause,
  });
};

const getOne = async (id) => {
  return Movie.findByPk(id);
};

const create = async (movieData) => {
  try {
    return await Movie.create(movieData);
  } catch (error) {
    console.error('Error creating movie:', error.message);
    throw new Error('Failed to create the movie');
  }
};

const update = async (id, movieData) => {
  const movie = await Movie.findByPk(id);

  if (!movie) {
    return null;
  }

  await movie.update(movieData);

  return movie;
};

const remove = async (id) => {
  const movie = await Movie.findByPk(id);

  if (!movie) {
    return null;
  }

  await movie.destroy();

  return movie;
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
