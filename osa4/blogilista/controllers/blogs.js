const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const _ = require('lodash');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
  const body = request.body;
  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    likes: body.likes,
    url: body.url,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();
  response.status(201).json(savedBlog.toJSON()).end();
});

blogRouter.delete('/:id', async (request, response) => {
  const blogIdentifier = request.params.id;

  const user = request.user;
  const blog = await Blog.findById({ _id: blogIdentifier });

  if (_.isUndefined(blog) || _.isNull(blog)) {
    return response
      .status(400)
      .json({ error: 'Blog does not exist or is already deleted' })
      .end();
  }

  if (blog.user.toString() === user.id.toString()) {
    await Blog.deleteOne({ id: blog.id });
    response.status(204).end();
  }

  response
    .status(401)
    .json({ error: 'Cannot delete someone elses blog' })
    .end();
});

module.exports = blogRouter;
