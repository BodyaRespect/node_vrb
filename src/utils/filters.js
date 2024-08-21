const { Op } = require('sequelize');

const buildWhereClause = (filters) => {
  const whereClause = {};

  const filterMap = {
    title: (value) => ({ title: { [Op.iLike]: `%${value}%` } }),
    genre: (value) => ({ genre: { [Op.iLike]: value } }),
    minRating: (value) => ({ rating: { [Op.gte]: parseFloat(value) } }),
    maxRating: (value) => ({ rating: { [Op.lte]: parseFloat(value) } }),
  };

  Object.keys(filters).forEach((key) => {
    const filterKey = key.toLowerCase();
    const filterFunction = filterMap[filterKey];

    if (filters[key] && filterFunction) {
      Object.assign(whereClause, filterFunction(filters[key]));
    }
  });

  return whereClause;
};

module.exports = {
  buildWhereClause,
};
