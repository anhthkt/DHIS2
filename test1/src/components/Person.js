import React from "react";
const Person = (props) => {
    return (
        <div>
            <p> Name: {props.name}  Age: {props.age}</p>
            {/* <p> {props.children} </p> */}
        </div>
    )
}

export default Person;