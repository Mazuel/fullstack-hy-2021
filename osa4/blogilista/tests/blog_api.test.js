const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');
const blogHelper = require('./test_helper');
const userHelper = require('./user_test_helper');

const linkUserAndBlogs = async () => {
  const user = await userHelper.singleUserInDb();
  const blogs = await blogHelper.blogsInDb();

  user.blogs = blogs.map((blog) => blog._id);

  user.save();
  await Blog.updateMany({}, { $set: { user: user._id } });
};

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  await Blog.insertMany(blogHelper.initialBlogs);
  await User.insertMany(userHelper.initialUsers);
  await linkUserAndBlogs();
});

describe('initial blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${await userHelper.getToken()}`)
      .expect(200);
  });

  test('there are two blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${await userHelper.getToken()}`);

    expect(response.body).toHaveLength(2);
  });

  test('should return blog identifier as id', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${await userHelper.getToken()}`);

    expect(response.body[0].id).toBeDefined();
  });
});

describe('adding new blogs', () => {
  test('should not add blog when title is not given', async () => {
    const newBlog = {
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${await userHelper.getToken()}`)
      .send(newBlog)
      .expect(400);
  });

  test('should not add blog when url is not given', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${await userHelper.getToken()}`)
      .send(newBlog)
      .expect(400);
  });

  test('should create new blog', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${await userHelper.getToken()}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${await userHelper.getToken()}`);
    const contents = response.body.map((r) => r.title);
    expect(response.body).toHaveLength(blogHelper.initialBlogs.length + 1);
    expect(contents).toContain('Go To Statement Considered Harmful');
  });

  test('should not be able to add new blog without authorization', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    };

    await api.post('/api/blogs').send(newBlog).expect(401);
  });

  test('should set likes to 0 when it is undefined', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${await userHelper.getToken()}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${await userHelper.getToken()}`);
    const contents = response.body.map((r) => r.likes);
    expect(response.body).toHaveLength(blogHelper.initialBlogs.length + 1);
    expect(contents).toContain(0);
  });
});

describe('deleting blogs', () => {
  test('should delete blog', async () => {
    const blogsInStart = await blogHelper.blogsInDb();
    const blogToBeDeleted = blogsInStart[0];
    await api
      .delete(`/api/blogs/${blogToBeDeleted.id}`)
      .set('Authorization', `Bearer ${await userHelper.getToken()}`)
      .expect(204);
    const blogsAtEnd = await blogHelper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogHelper.initialBlogs.length - 1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
