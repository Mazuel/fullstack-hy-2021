import React, { useEffect, useState } from "react";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => {
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
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const result = persons.find(({ name }) => name === newName);
    let update = false;
    if (result) {
      update = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (update) {
        personService.update(result.id, personObject).then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== result.id ? person : returnedPerson.data
            )
          );
        });
        return;
      }
    }

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
    personService.create(personObject).then((response) => {
      setMessage(`Successfully added ${personObject.name}`);
      setMessageType("Success");
      personService.getAll().then((response) => {
        setPersons(response.data);
      });
      console.log(response);
    });
  };

  const filterResults = (event) => {
    const filter = event.target.value;
    setFilterValue(filter);
  };

  const deletePerson = (person) => {
    let result = window.confirm(`Delete ${person.name} ?`);
    if (result) {
      personService
        .remove(person.id)
        .then(
          (response) =>
            setPersons(
              persons.filter(
                (filteredPerson) => person.id !== filteredPerson.id
              )
            ),
          setMessage(`Successfully removed ${person.name}`),
          setMessageType("Success")
        )
        .catch((error) => {
          console.log(error);
          setMessage(
            `Information of ${person.name} has already been removed from server`
          );
          setMessageType("Error");
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
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
      <Persons
        list={persons}
        filter={filterValue}
        onDelete={deletePerson}
      ></Persons>
    </div>
  );
};

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  let messageStyle;
  if (type === "Error") {
    messageStyle = {
      color: "red",
      background: "lightgrey",
      fontSize: "20px",
      borderStyle: "solid",
      borderRadius: "5px",
      padding: "10px",
      marginBottom: "10px",
    };
  } else {
    messageStyle = {
      color: "green",
      background: "lightgrey",
      fontSize: "20px",
      borderStyle: "solid",
      borderRadius: "5px",
      padding: "10px",
      marginBottom: "10px",
    };
  }
  return <div style={messageStyle}>{message}</div>;
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
              {person.name} {person.number}{" "}
              <button onClick={() => props.onDelete(person)}>delete</button>
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default App;
