import React, { useState } from 'react';

const Blog = ({ blog, updateBlog, deleteBlog, currentUserName }) => {
  const [showFullinfo, setShowFullinfo] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className='blog'>
      {showFullinfo ? (
        <div>
          <div>
            {blog.title}{' '}
            <button onClick={() => setShowFullinfo(false)}>hide</button>
          </div>
          <div>{blog.author}</div>
          <div>
            likes: {blog.likes}{' '}
            <button onClick={() => updateBlog(blog)}>like</button>
          </div>
          <div>{blog.url}</div>
          {blog.user.name === currentUserName ? (
            <div>
              <button onClick={() => deleteBlog(blog)}>remove</button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div>
          {blog.title} {blog.author}{' '}
          <button onClick={() => setShowFullinfo(true)}>view</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
