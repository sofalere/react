import { useState } from 'react'

const Contacts = ({contacts}) => {
  return (
    <div>
      {contacts.map((contact) => <p key={contact.id}>{contact.name}: {contact.number}</p>)}
    </div>
  )
}

const Filter = ({newFilter, filterHandler}) => {
  return (
    <div>
      filter shown with <input
                          value={newFilter}
                          onChange={filterHandler}
                        />
    </div>
  )
};

const PersonForm = ({submitHandler, newName, nameInputHandler, newNumber, numberInputHandler}) => {
  return (
    <form onSubmit={submitHandler}>
    <div>
      name: <input 
              value={newName}
              onChange={nameInputHandler}
            />
    </div>
    <div>
      number: <input
                value={newNumber}
                onChange={numberInputHandler}
              />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
};

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '123456789', id:0 }]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  const personsToShow = newFilter === '' ? persons : 
    persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()));

  const nameInputHandler = (e) => {
    setNewName(e.target.value);
  };

  const numberInputHandler = (e) => {
    setNewNumber(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (Object.values(persons).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([...persons].concat({name: newName, number: newNumber, id: persons.length + 1}));
    }
    setNewName('');
    setNewNumber('');
  };

  const filterHandler = (e) => {
    setNewFilter(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter newFilter={newFilter} filterHandler={filterHandler}/>
      <h2>Add a new</h2>
      <PersonForm 
        submitHandler={submitHandler} 
        newName={newName} 
        nameInputHandler={nameInputHandler}
        newNumber={newNumber}
        numberInputHandler={numberInputHandler}/>
      <h2>Numbers</h2>
      <Contacts contacts={personsToShow}/>
    </div>
  )
}

export default App