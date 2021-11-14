const usersRouter = require('express').Router();
const _ = require('lodash');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

usersRouter.post(
  '/',
  body('username').not().isEmpty().trim().escape(),
  body('password').isLength({ min: 3 }),
  async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() }).end();
    }

    const body = request.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      password: passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser).end();
  }
);

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs');

  response.json(users.map((u) => u.toJSON()));
});

module.exports = usersRouter;
