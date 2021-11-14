const logger = require('./logger');
const User = require('../models/user');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    response.status(400).json({ error: error.message });
  } else if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    response.status(401).json({ error: error.message });
  } else if (error.name === 'TokenExpiredError') {
    response.status(400).json({ error: error.message });
  }
  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }
  next();
};

const userExtractor = async function (request, response, next) {
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  console.log(!token || !decodedToken.id);
  if (!token || !decodedToken.id) {
    response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);
  if (_.isUndefined(user) || _.isNull(user)) {
    response
      .status(400)
      .json({ error: 'Could not fetch user for authentication token' });
  } else {
    request.user = user;
  }
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
