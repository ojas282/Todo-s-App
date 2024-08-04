const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const filePath = path.join(__dirname, "todos.json");

// reading todos from the file
const readTodos = (callback) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }
    const jsonData = JSON.parse(data);
    callback(null, jsonData.todos);
  });
};

// writing todos to the file
const writeTodos = (todos, callback) => {
  const jsonData = { todos };
  fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
};

//to get all todos
app.get("/api/todos", (req, res) => {
  readTodos((err, todos) => {
    if (err) {
      res.status(500).send("Error reading file");
      return;
    }
    res.json(todos);
  });
});

// to add a new todo
app.post("/api/todos", (req, res) => {
  const newTodo = req.body;

  readTodos((err, todos) => {
    if (err) {
      res.status(500).send("Error reading file");
      return;
    }
    todos.push(newTodo);

    writeTodos(todos, (err) => {
      if (err) {
        res.status(500).send("Error writing file");
        return;
      }
      res.status(201).send(newTodo);
    });
  });
});

// updating a todo
app.put("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedTodo = req.body;

  readTodos((err, todos) => {
    if (err) {
      res.status(500).send("Error reading file");
      return;
    }
    const index = todos.findIndex((todo) => todo.id === id);

    if (index === -1) {
      res.status(404).send("Todo not found");
      return;
    }

    todos[index] = {
      ...todos[index],
      ...updatedTodo,
      lastUpdate: new Date().toISOString(),
    };

    writeTodos(todos, (err) => {
      if (err) {
        res.status(500).send("Error writing file");
        return;
      }
      res.status(200).json(todos[index]);
    });
  });
});
//Deleting a todo
app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  readTodos((err, todos) => {
    if (err) {
      res.status(500).send("Error reading file");
      return;
    }
    const newTodos = todos.filter((todo) => todo.id !== id);

    writeTodos(newTodos, (err) => {
      if (err) {
        res.status(500).send("Error writing file");
        return;
      }
      res.status(200).send("Todo deleted");
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
