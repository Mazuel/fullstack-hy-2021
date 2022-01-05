import React from 'react';
import { addNewAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';
import { showMessage } from '../reducers/notificationReducer';
const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addNew = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(addNewAnecdote(content));
    dispatch(showMessage(`${content} is saved.`, 3));
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
