import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import Search from "./Search";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // load todos from the server when the component mounts
  useEffect(() => {
    fetch("http://localhost:3001/api/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => console.error("Error fetching the todos:", error));
  }, []);

  // Function to add a todo to our todo list
  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodo = {
      ...todo,
      createdAt: new Date().toISOString(),
      removedAt: null,
    };
    fetch("http://localhost:3001/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos((prevTodos) => [data, ...prevTodos]);
      })
      .catch((error) => console.error("Error adding todo:", error));
  };

  // Function to update our pre-existing todo
  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setTodos((prev) =>
      prev.map((item) =>
        item.id === todoId
          ? {
              ...newValue,
              createdAt: item.createdAt,
              removedAt: item.removedAt,
            }
          : item
      )
    );
  };

  // function to remove a todo after its completion
  const removeTodo = (id) => {
    fetch(`http://localhost:3001/api/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      })
      .catch((error) => console.error("Error deleting todo:", error));
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

  // todo search functionality
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
