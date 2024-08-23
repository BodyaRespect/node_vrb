# Movie Management Application - Backend

## Project Description
This project is the backend part of a web application for managing a list of movies, built with Node.js and Express. The API provides CRUD (Create, Read, Update, Delete) operations for managing movie data.

## Technologies
- Node.js
- Express
- MongoDB
- Mongoose for MongoDB integration

## Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```bash
    cd <project-directory>
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Running the Server

1. Start the server:
    ```bash
    npm start
    ```

2. The server will be available at [http://localhost:5700](http://localhost:5700).

## API Endpoints

### Resources
- `GET /movies` - Get a list of all movies
- `POST /movies` - Add a new movie
- `GET /movies/:id` - Get movie details by ID
- `PUT /movies/:id` - Update a movie by ID
- `DELETE /movies/:id` - Delete a movie by ID

## Database Schema
- `title` (String) - Movie title
- `description` (String) - Movie description
- `actors` (Array of Strings) - Actors
- `director` (String) - Director
- `genre` (String) - Genre
- `rating` (Number) - Rating
- `releaseDate` (Date) - Release date
- `image` (String) - Image URL

## Contributing
If you wish to contribute to the project, please submit a pull request or contact us via Issues.

## License
MIT License. See [LICENSE](LICENSE) for details.
