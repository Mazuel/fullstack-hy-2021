import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import { removeNotification } from '../reducers/notificationReducer';
import Filter from './Filter';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  console.log(filter);
  const dispatch = useDispatch();
  const vote = (id) => {
    dispatch(addVote(id));
    const content = anecdotes.find((a) => a.id === id).content;
    // Display message
    dispatch(setNotification(`You voted for: ${content}`, 5));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <div>
      <Filter />
      {anecdotes
        .filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
        .map(({ id, content, votes }) => (
          <div key={id}>
            <div>{content}</div>
            <div>
              has {votes}
              <button onClick={() => vote(id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
