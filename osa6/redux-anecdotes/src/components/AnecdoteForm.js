import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';

const AnecdoteForm = (props) => {
  const dispatch = useDispatch();
  const addNew = (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    dispatch(createAnecdote(content));
    // Display message
    // props.setNotification(`Created new anecdote: ${content}`, 5);
  };

  return (
    <form onSubmit={addNew}>
      <h2>create new</h2>
      <div>
        <input name='anecdote' />
      </div>
      <button type='submit'>create</button>
    </form>
  );
};

export default AnecdoteForm;
