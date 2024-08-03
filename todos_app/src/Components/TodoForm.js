import React, { useState } from "react";

function TodoForm(props) {
  const [input, setInputs] = useState("");

  const handleChange = (e) => {
    setInputs(e.target.value);
  };

  // removing the page refreshing feature when we click Add todo
  const handleSubmit = (e) => {
    e.preventDefault();

    //generating a new object with a new id for the new item
    // props.onSubmit({
    //   id: Math.floor(Math.random() * 10000),
    //   text: input,
    // });

    setInputs("");
  };
  return (
    // adding form field for the user to add a new todo
    <form clasName="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a Todo"
        value={input}
        name="text"
        className="todo-input"
        onChange={handleChange}
      />
      <button className="todo-buttom">Add todo</button>
    </form>
  );
}

export default TodoForm;
