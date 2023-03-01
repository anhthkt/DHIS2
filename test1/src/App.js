import './App.css';
import Person from './components/Person'
import Example from './components/Example';
import React, { useState } from 'react';
function App() {
    const [person, setPerson] = useState([
        { name: "Han", age: 1 },
        { name: "Hop", age: 27 },
        { name: "Ha", age: 28 }
    ]);

    const changeNameHandler = (e) => {
        setPerson([
            { name: "Han", age: 7 },
            { name: "Hop", age: 33 },
            { name: "Ha", age: 34 }
        ]);
    };

    return (
        <div className="App">
            <h1>Hello Pet</h1>
            <button onClick={e => changeNameHandler(e)}>Change Name</button>
            <Person name={person[0].name} age={person[0].age} />
            <Person name={person[1].name} age={person[1].age} />
            <Person name={person[2].name} age={person[2].age} />
            <Example />
        </div>
    );
};

export default App;