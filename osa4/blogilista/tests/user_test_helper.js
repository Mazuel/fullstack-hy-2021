const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const initialUsers = [
  {
    name: 'Initial User',
    username: 'Initialuser',
    password: '$2b$10$CB7bmkl2x9yB.9183EbnT.rQS7dfZraJIIJau/vRRLJIPFSTTM/7O',
  },
];

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const singleUserInDb = async () => {
  return await User.findOne({ username: 'Initialuser' });
};

const getToken = async () => {
  const user = await singleUserInDb();
  return jwt.sign(
    {
      username: user.username,
      id: user.id,
    },
    config.SECRET
  );
};

const notExistingId = async () => {
  const user = new User({
    name: 'Dumbo Dimbo',
    password: 'vahva',
    username: 'Dumboman',
  });
  await user.save();
  await user.remove();

  return user._id.toString();
};

module.exports = {
  initialUsers,
  usersInDb,
  singleUserInDb,
  notExistingId,
  getToken,
};
