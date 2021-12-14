import React from 'react';
import { useDispatch } from 'react-redux';
import { updateFilter } from '../reducers/filterReducer';

const style = {
  marginBottom: 10,
};

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const filterInput = event.target.value;
    dispatch(updateFilter(filterInput));
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
