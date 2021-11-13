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

module.exports = {
  dummy,
  totalLikes,
};
