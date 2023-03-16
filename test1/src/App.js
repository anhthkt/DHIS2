import './App.css';
import Person from './components/Person'
import Example from './components/Example';
import React, { useState } from 'react';
function App() {
    const [showPerson, setShowPerson] = useState(true);

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

    const switchNameHandler = (event) => {
        console.log(event.target.value);
        setPerson([
            { name: event.target.value, age: 7 },
            { name: "Hop", age: 33 },
            { name: "Ha", age: 34 }
        ]);
    }

    const togglePerson = () => {
        setShowPerson(!showPerson);
    }

    let personList = null;
    if (showPerson === true) {
        personList =
            <div>
                {person.map((item) => {
                    return <Person
                        click={() => changeNameHandler()}
                        changed={switchNameHandler}
                        name={item.name} age={item.age}
                    />
                })
                }


                {/* <Person click={changeNameHandler} changed={switchNameHandler} name={person[1].name} age={person[1].age} />
                <Person click={changeNameHandler} name={person[2].name} age={person[2].age} />
                <Example /> */}
            </div>
    }


    return (
        <div className="App">
            <h1>Hello Pet</h1>
            <button onClick={() => togglePerson()}>Toggle Person</button>
            {personList}

        </div>
    );
};

export default App;