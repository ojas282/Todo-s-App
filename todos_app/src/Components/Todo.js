import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });
  //state for expandable todo
  const [expandedTodo, setExpandedTodo] = useState(null);

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }
  return todos.map((todo) => (
    <div
      className={`todo-row ${todo.isComplete ? "complete" : ""}`}
      key={todo.id}
    >
      <div onClick={() => completeTodo(todo.id)}>{todo.text}</div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className="delete-icon"
        />
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className="edit-icon"
        />
      </div>
      <button
        onClick={() =>
          setExpandedTodo(expandedTodo === todo.id ? null : todo.id)
        }
      >
        {expandedTodo === todo.id ? "Collapse" : "Expand"}
      </button>
      {expandedTodo === todo.id && (
        <div className="todo-details">
          <p>Description: {todo.description || "No description"}</p>
          <p>
            Last Updated:{" "}
            {todo.lastUpdate
              ? new Date(todo.lastUpdate).toLocaleString()
              : "Never"}
          </p>
        </div>
      )}
    </div>
  ));
}

export default Todo;
