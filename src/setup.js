const { Movie } = require('./models/Movie.model.js');

Movie.sync({ force: true });
