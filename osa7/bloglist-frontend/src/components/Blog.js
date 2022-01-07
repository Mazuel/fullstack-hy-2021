import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { likeBlog, deleteBlog } from '../reducers/blogReducer';
import { showMessage } from '../reducers/notificationReducer';

const Blog = ({ blog, currentUserName }) => {
  const dispatch = useDispatch();
  const [showFullinfo, setShowFullinfo] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const addLike = () => {
    try {
      dispatch(likeBlog(blog.id, blog.likes + 1));
      dispatch(showMessage(`new like to blog ${blog.title} by ${blog.author}`));
    } catch (error) {
      dispatch(showMessage(error));
    }
  };

  const removeBlog = () => {
    const result = window.confirm(`Remove ${blog.title} by ${blog.author}`);

    if (result) {
      try {
        dispatch(showMessage(`blog ${blog.title} by ${blog.author} delete`));
        dispatch(deleteBlog(blog.id));
      } catch (error) {
        dispatch(showMessage(error));
      }
    }
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
            likes: {blog.likes} <button onClick={addLike}>like</button>
          </div>
          <div>{blog.url}</div>
          {blog.user.name === currentUserName ? (
            <div>
              <button onClick={removeBlog}>remove</button>
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
