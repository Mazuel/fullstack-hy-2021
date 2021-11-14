const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const User = require('../models/user');
const helper = require('./user_test_helper');

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(helper.initialUsers);
});

describe('create user', () => {
  test('should create new user', async () => {
    const newUser = {
      name: 'Test User',
      username: 'Testuser',
      password: 'uberuser',
    };

    await api.post('/api/users').send(newUser).expect(201);
  });

  test('should not create user when password is under 3 characters', async () => {
    const newUser = {
      name: 'Test User',
      username: 'Testuser',
      password: 'as',
    };

    await api.post('/api/users').send(newUser).expect(400);
  });

  test('should not create user when username is not given', async () => {
    const newUser = {
      name: 'Test User',
      password: 'as',
    };

    await api.post('/api/users').send(newUser).expect(400);
  });

  test('should not create user when username already exists', async () => {
    const newUser = {
      name: 'Test User',
      username: 'Initialuser',
      password: 'as',
    };

    await api.post('/api/users').send(newUser).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
