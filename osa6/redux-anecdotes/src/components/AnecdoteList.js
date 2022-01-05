import React from 'react';
import { connect } from 'react-redux';
import { voteForAnecdote } from '../reducers/anecdoteReducer';
import { showMessage } from '../reducers/notificationReducer';
import Filter from './Filter';

const AnecdoteList = (props) => {
  const anecdotes = () =>
    props.anecdotes
      .filter((anecdote) => {
        return anecdote.content
          .toLowerCase()
          .includes(props.filter.toLowerCase());
      })
      .sort((a, b) => b.votes - a.votes);

  const vote = (id) => {
    const anecdote = anecdotes().find((anecdote) => anecdote.id === id);
    props.voteForAnecdote(anecdote);
    props.showMessage(`You voted for ${anecdote.content}`, 3);
  };

  return (
    <>
      <h2>Anecdotes</h2>
      <Filter />
      {anecdotes().map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  };
};

const mapDispatchToProps = { voteForAnecdote, showMessage };

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
export default ConnectedAnecdotes;
