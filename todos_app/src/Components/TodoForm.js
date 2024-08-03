import React, { useState, useEffect, useRef } from "react";

function TodoForm(props) {
  //making the functionality so that when on updating the todo the update field isn't shown empty but pre filled with last filled text
  const [input, setInputs] = useState(props.edit ? props.edit.value : "");

  //adding auto focus of text blinker over our input box without clicking over it manually to enter text
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInputs(e.target.value);
  };

  // removing the page refreshing feature when we click Add todo
  const handleSubmit = (e) => {
    e.preventDefault();

    //generating a new object with a new id for the new item
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });

    setInputs("");
  };
  return (
    // adding form field for the user to add a new todo
    <form className="todo-form" onSubmit={handleSubmit}>
      {props.edit ? (
        <>
          <input
            type="text"
            placeholder="Update your item"
            value={input}
            name="text"
            className="todo-input"
            onChange={handleChange}
            ref={inputRef}
          />
          <button className="todo-button">Update</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Add a Todo"
            value={input}
            name="text"
            className="todo-input"
            onChange={handleChange}
            ref={inputRef}
          />
          <button className="todo-button">Add todo</button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
