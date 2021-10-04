import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    const result = persons.find(({ name }) => name === newName);
    if (result) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  const filterResults = (event) => {
    const filter = event.target.value;
    setFilterValue(filter);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={filterResults} />
      <h3>add a new</h3>
      <PersonForm
        name={newName}
        onNameChange={handlePersonChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
        submit={addPerson}
      />
      <h3>Numbers</h3>
      <Persons list={persons} filter={filterValue}></Persons>
    </div>
  );
};

const Filter = (props) => {
  return (
    <div>
      filter shown with <input onChange={props.onChange} />
    </div>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.submit}>
      <div>
        name: <input value={props.name} onChange={props.onNameChange} />
      </div>
      <div>
        number: <input value={props.number} onChange={props.onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = (props) => {
  return (
    <div>
      {props.list.map((person) => (
        <div>
          {person.name.toLowerCase().includes(props.filter.toLowerCase()) ? (
            <p>
              {person.name} {person.number}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default App;
