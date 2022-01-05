import { getAll, newAnecdote, voteAnecdote } from '../service/anecdoteService';

const asObject = (anecdote) => {
  return {
    content: anecdote.content,
    votes: anecdote.votes,
    id: anecdote.id,
  };
};

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data;

    case 'VOTE':
      const newState = state.map((anecdote) => {
        if (anecdote.id === action.data.id) {
          return { ...anecdote, votes: action.data.votes };
        } else return anecdote;
      });
      return newState;

    case 'NEW_ANECDOTE':
      const newAnecdoteObj = asObject(action.data);

      return [...state, newAnecdoteObj];

    default:
      return state;
  }
};

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT',
    data: anecdotes,
  };
};

export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newData = await voteAnecdote(anecdote);
    dispatch({
      type: 'VOTE',
      data: newData,
    });
  };
};

export const addNewAnecdote = (data) => {
  return async (dispatch) => {
    const newData = await newAnecdote(data);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newData,
    });
  };
};

export default anecdoteReducer;
