const _ = require('lodash');

const dummy = (blogs) => {
  // ...
  return 1;
};

const totalLikes = (blogs) => {
  let sum = blogs.reduce(function (previousValue, currentValue) {
    return previousValue + currentValue.likes;
  }, 0);
  return sum;
};

const favoriteBlog = (blogs) => {
  return _.maxBy(blogs, 'likes');
};

const mostLikes = (blogs) => {
  const groupedBlogs = _(blogs)
    .groupBy('author')
    .mapValues((groupedBlogs) => ({
      author: groupedBlogs[0].author,
      likes: _.sumBy(groupedBlogs, 'likes'),
    }))
    .value();
  return _.maxBy(_.values(groupedBlogs), 'likes');
};

const mostBlogs = (blogs) => {
  const groupedBlogs = _(blogs)
    .groupBy('author')
    .mapValues((groupedBlogs) => ({
      author: groupedBlogs[0].author,
      blogs: groupedBlogs.length,
    }))
    .value();
  return _.maxBy(_.values(groupedBlogs), 'blogs');
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
