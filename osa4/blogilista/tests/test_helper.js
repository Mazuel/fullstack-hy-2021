const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', url: 'jessus' });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const singleBlogInDb = async () => {
  const initialBlogs = await blogsInDb();
  return initialBlogs[0];
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  singleBlogInDb,
};
