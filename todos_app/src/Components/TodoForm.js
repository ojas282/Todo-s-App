import React, { useState, useEffect } from "react";

function TodoForm({ onSubmit, edit }) {
  const [input, setInput] = useState(edit ? edit.value : "");

  useEffect(() => {
    if (edit) {
      setInput(edit.value);
    }
  }, [edit]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: edit ? edit.id : Math.floor(Math.random() * 10000),
      text: input,
      isComplete: edit ? edit.isComplete : false,
      createdAt: edit ? edit.createdAt : new Date().toISOString(),
      lastUpdate: new Date().toISOString(),
      removedAt: null,
    });
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={edit ? "Update your item" : "Add a todo"}
        value={input}
        name="text"
        className="todo-input"
        onChange={handleChange}
      />
      <button className="todo-button">
        {edit ? "Update Todo" : "Add Todo"}
      </button>
    </form>
  );
}

export default TodoForm;
