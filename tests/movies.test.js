/* eslint-disable max-len */
const request = require('supertest');
const express = require('express');
const moviesService = require('../src/services/movies.service');
const moviesController = require('../src/controllers/movies.controller');

jest.mock('../src/services/movies.service.js');

const app = express();

app.use(express.json());

app.get('/movies', moviesController.getAll);
app.get('/movies/:id', moviesController.getOne);
app.post('/movies', moviesController.create);
app.patch('/movies/:id', moviesController.update);
app.delete('/movies/:id', moviesController.remove);

describe('Movies API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Service Layer', () => {
    describe('getAll', () => {
      it('should return all movies when no filters are provided', async () => {
        const mockMovies = [{ id: 1, title: 'Inception' }];

        moviesService.getAll.mockResolvedValue(mockMovies);

        const result = await moviesService.getAll({});

        expect(result).toEqual(mockMovies);
      });

      it('should return filtered movies when filters are provided', async () => {
        const mockMovies = [{ id: 1, title: 'Inception' }];

        moviesService.getAll.mockResolvedValue(mockMovies);

        const filters = { title: 'Inception', genre: 'Sci-Fi' };
        const result = await moviesService.getAll(filters);

        expect(result).toEqual(mockMovies);
      });
    });

    describe('getOne', () => {
      it('should return a movie by id', async () => {
        const mockMovie = { id: 1, title: 'Inception' };

        moviesService.getOne.mockResolvedValue(mockMovie);

        const result = await moviesService.getOne(1);

        expect(result).toEqual(mockMovie);
      });

      it('should return null if the movie does not exist', async () => {
        moviesService.getOne.mockResolvedValue(null);

        const result = await moviesService.getOne(1);

        expect(result).toBeNull();
      });
    });

    describe('create', () => {
      it('should create a new movie', async () => {
        const movieData = {
          title: 'Inception',
          description: 'A mind-bending thriller',
          actors: ['Leonardo DiCaprio'],
          director: 'Christopher Nolan',
          genre: 'Sci-Fi',
          rating: 8.8,
          releaseDate: '2010-07-16',
          image: 'image-url',
        };
        const mockMovie = { id: 1, ...movieData };

        moviesService.create.mockResolvedValue(mockMovie);

        const result = await moviesService.create(movieData);

        expect(result).toEqual(mockMovie);
      });
    });

    describe('update', () => {
      it('should update an existing movie', async () => {
        const movieData = { title: 'Inception Updated' };
        const mockMovie = { id: 1, ...movieData };

        moviesService.update.mockResolvedValue(mockMovie);

        const result = await moviesService.update(1, movieData);

        expect(result).toEqual(mockMovie);
      });

      it('should return null if the movie does not exist', async () => {
        moviesService.update.mockResolvedValue(null);

        const result = await moviesService.update(1, {
          title: 'Inception Updated',
        });

        expect(result).toBeNull();
      });
    });

    describe('remove', () => {
      it('should remove an existing movie', async () => {
        const mockMovie = { id: 1 };

        moviesService.getOne.mockResolvedValue(mockMovie);
        moviesService.remove.mockResolvedValue(mockMovie);

        const result = await moviesService.remove(1);

        expect(result).toEqual(mockMovie);
      });
    });
  });

  describe('Controller Layer', () => {
    describe('GET /movies', () => {
      it('should return all movies when no filters are provided', async () => {
        const mockMovies = [{ id: 1, title: 'Inception' }];

        moviesService.getAll.mockResolvedValue(mockMovies);

        const response = await request(app).get('/movies');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockMovies);
      });

      it('should return filtered movies when filters are provided', async () => {
        const mockMovies = [{ id: 1, title: 'Inception' }];

        moviesService.getAll.mockResolvedValue(mockMovies);

        const response = await request(app)
          .get('/movies')
          .query({ title: 'Inception', genre: 'Sci-Fi' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockMovies);
      });

      it('should handle errors from the service', async () => {
        moviesService.getAll.mockRejectedValue(new Error('Service error'));

        const response = await request(app).get('/movies');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Failed to fetch movies' });
      });
    });

    describe('GET /movies/:id', () => {
      it('should return a movie by id', async () => {
        const mockMovie = { id: 1, title: 'Inception' };

        moviesService.getOne.mockResolvedValue(mockMovie);

        const response = await request(app).get('/movies/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockMovie);
      });

      it('should return 500 if the movie does not exist', async () => {
        moviesService.getOne.mockResolvedValue(null);

        const response = await request(app).get('/movies/1');

        expect(response.status).toBe(500);
      });

      it('should handle errors from the service', async () => {
        moviesService.getOne.mockRejectedValue(new Error('Service error'));

        const response = await request(app).get('/movies/1');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Failed to fetch the movie' });
      });
    });

    describe('POST /movies', () => {
      it('should create a new movie', async () => {
        const movieData = {
          title: 'Inception',
          description: 'A mind-bending thriller',
          actors: ['Leonardo DiCaprio'],
          director: 'Christopher Nolan',
          genre: 'Sci-Fi',
          rating: 8.8,
          releaseDate: '2010-07-16',
          image: 'image-url',
        };
        const mockMovie = { id: 1, ...movieData };

        moviesService.create.mockResolvedValue(mockMovie);

        const response = await request(app).post('/movies').send(movieData);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(mockMovie);
      });

      it('should handle creation errors', async () => {
        moviesService.create.mockRejectedValue(new Error('Creation error'));

        const response = await request(app)
          .post('/movies')
          .send({ title: 'Inception' });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Failed to create the movie' });
      });
    });

    describe('PATCH /movies/:id', () => {
      it('should update an existing movie', async () => {
        const movieData = { title: 'Inception Updated' };
        const mockMovie = { id: 1, ...movieData };

        moviesService.update.mockResolvedValue(mockMovie);

        const response = await request(app).patch('/movies/1').send(movieData);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockMovie);
      });

      it('should return 404 if the movie does not exist', async () => {
        moviesService.update.mockResolvedValue(null);

        const response = await request(app)
          .patch('/movies/1')
          .send({ title: 'Inception Updated' });

        expect(response.status).toBe(404);
      });

      it('should handle update errors', async () => {
        moviesService.update.mockRejectedValue(new Error('Update error'));

        const response = await request(app)
          .patch('/movies/1')
          .send({ title: 'Inception Updated' });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Failed to update the movie' });
      });
    });

    describe('DELETE /movies/:id', () => {
      it('should remove an existing movie', async () => {
        const mockMovie = { id: 1 };

        moviesService.getOne.mockResolvedValue(mockMovie);
        moviesService.remove.mockResolvedValue(mockMovie);

        const response = await request(app).delete('/movies/1');

        expect(response.status).toBe(204);
      });

      it('should return 404 if the movie does not exist', async () => {
        moviesService.getOne.mockResolvedValue(null);

        const response = await request(app).delete('/movies/1');

        expect(response.status).toBe(404);
      });
    });
  });
});
