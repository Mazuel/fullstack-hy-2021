import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newBlog,
      author: newAuthor,
      url: newUrl,
      likes: 0,
    });
    setNewBlog('');
    setNewAuthor('');
    setNewUrl('');
  };

  return (
    <form onSubmit={addBlog}>
      <label htmlFor='title'>Title:</label>
      <input id='title' value={newBlog} onChange={handleBlogChange} />
      <br />
      <label htmlFor='author'>Author</label>
      <input id='author' value={newAuthor} onChange={handleAuthorChange} />
      <br />
      <label htmlFor='url'>Url:</label>
      <input id='url' value={newUrl} onChange={handleUrlChange} />
      <br />
      <button type='submit'>create</button>
    </form>
  );
};

export default BlogForm;
