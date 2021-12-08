import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

test('renders blog without extra info', () => {
  const blog = {
    title: 'Programming for beginners',
    likes: 0,
    url: 'www.helowrols.com',
    author: 'Kari',
  };

  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent('Programming for beginners');

  const div = component.container.querySelector('.blog');

  expect(div).not.toHaveTextContent('likes: ');
  expect(div).not.toHaveTextContent('www.helowrols.com');
});

test('renders extra info after clicking show-button', () => {
  const blog = {
    title: 'Programming for idiots',
    likes: 0,
    url: 'www.helowrols.com',
    author: 'Kari',
    user: {
      name: 'Joona',
    },
  };

  const component = render(<Blog blog={blog} />);

  const button = component.getByText('view');
  fireEvent.click(button);

  const url = component.getByText('www.helowrols.com');
  const author = component.getByText('Kari');

  expect(url).toBeDefined();
  expect(author).toBeDefined();
});

test('liking a blog twice calls event handler twice', async () => {
  const blog = {
    title: 'Programming for idiots',
    likes: 0,
    url: 'www.helowrols.com',
    author: 'Kari',
    user: {
      name: 'Joona',
    },
  };

  const mockHandler = jest.fn();

  const component = render(<Blog blog={blog} updateBlog={mockHandler} />);

  const button = component.getByText('view');
  fireEvent.click(button);

  const likeButton = component.getByText('like');
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
