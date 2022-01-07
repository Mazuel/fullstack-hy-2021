import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import { connect } from 'react-redux';
import { showMessage } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/blogReducer';
import { addBlog } from './reducers/blogReducer';
import PropTypes from 'prop-types';
import _ from 'lodash';

const App = (props) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [blogFormVisible, setBlogFormVisible] = useState(false);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      props.showMessage('Wrong credentials', 3);
    }
  };

  const createBlog = async (blogObject) => {
    try {
      dispatch(addBlog(blogObject));
      props.showMessage(
        `a new blog ${blogObject.title} by ${blogObject.author} has been added`,
        3
      );
    } catch (exception) {
      console.log(exception);
      props.showMessage(`failed to add new blog`, 3);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  );

  loginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  };

  const blogFrom = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' };
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>Add new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm createBlog={createBlog} />
          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  const updateBlog = async (blog) => {
    const newLikes = blog.likes + 1;
    const id = blog.id;

    const newBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user.id,
      likes: newLikes,
    };

    await blogService.update(id, newBlog);
  };

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog: ${blog.title} by ${blog.author}`)) {
      const id = blog.id;

      await blogService.remove(id);

      _.reject(blogs, function (o) {
        return o.id === id;
      });
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <h2>Login</h2>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>
          {blogFrom()}
        </div>
      )}
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          currentUserName={user?.name}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  };
};

const mapDispatchToProps = { showMessage };

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;
