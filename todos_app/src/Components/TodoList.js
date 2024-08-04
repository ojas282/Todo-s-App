import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import Search from "./Search";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //function to add a todo to our todo list
  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  //function to update our pre existing todo
  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  //function to remove a todo after its completion
  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  //todo search functionality
  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>What's the Plan for Today?</h1>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={filteredTodos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default TodoList;
