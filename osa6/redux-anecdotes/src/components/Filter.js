import React from 'react';
import { connect } from 'react-redux';
import { updateFilter } from '../reducers/filterReducer';

const style = {
  marginBottom: 10,
};

const Filter = (props) => {
  const handleChange = (event) => {
    const filterInput = event.target.value;
    props.updateFilter(filterInput);
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  };
};

const mapDispatchToProps = { updateFilter };

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter);
export default ConnectedFilter;
