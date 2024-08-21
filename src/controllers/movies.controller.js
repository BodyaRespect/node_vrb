/* eslint-disable no-console */
const moviesService = require('../services/movies.service');

const getAll = async (req, res) => {
  try {
    const { title, genre, minRating, maxRating } = req.query;

    const filters = {
      title,
      genre,
      minRating,
      maxRating,
    };

    const movies = await moviesService.getAll(filters);

    res.status(200).send(movies);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch movies' });
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await moviesService.getOne(id);

    if (!movie) {
      res.status(500).send({ error: `Movie with id: ${id} does not exist` });

      return;
    }

    res.status(200).send(movie);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch the movie' });
  }
};

const create = async (req, res) => {
  try {
    const {
      title,
      description,
      actors = [],
      director,
      genre,
      rating,
      releaseDate,
      image,
    } = req.body;

    const movie = await moviesService.create({
      title,
      description,
      actors,
      director,
      genre,
      rating,
      releaseDate,
      image,
    });

    res.status(201).send(movie);
  } catch (error) {
    console.error('Error creating movie:', error);
    res.status(500).send({ error: 'Failed to create the movie' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      actors,
      director,
      genre,
      rating,
      releaseDate,
      image,
    } = req.body;

    const updatedMovie = await moviesService.update(id, {
      title,
      description,
      actors,
      director,
      genre,
      rating,
      releaseDate,
      image,
    });

    if (!updatedMovie) {
      res.sendStatus(404);

      return;
    }

    res.status(200).send(updatedMovie);
  } catch (error) {
    res.status(500).send({ error: 'Failed to update the movie' });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await moviesService.getOne(id);

    if (!movie) {
      res.sendStatus(404);

      return;
    }

    await moviesService.remove(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete the movie' });
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
