'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const Movie = sequelize.define(
  'Movies',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    actors: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    director: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 10,
      },
    },
    releaseDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'movies',
    createdAt: false,
    updatedAt: false,
  },
);

module.exports = {
  Movie,
};
