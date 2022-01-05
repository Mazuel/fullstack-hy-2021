import axios from 'axios';
const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const newAnecdote = async (content) => {
  const anecdoteObj = {
    content,
    votes: 0,
  };
  const response = await axios.post(baseUrl, anecdoteObj);
  return response.data;
};

const voteAnecdote = async (anecdote) => {
  const newurl = baseUrl + `/${anecdote.id}`;
  const newAnecdote = {
    content: anecdote.content,
    votes: anecdote.votes + 1,
    id: anecdote.id,
  };
  const response = await axios.put(newurl, newAnecdote);
  return response.data;
};
export { getAll, newAnecdote, voteAnecdote };
