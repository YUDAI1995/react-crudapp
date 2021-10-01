import React, { useEffect, useState } from "react";
import { TodoListModel } from "./Model/todolist.model";
import { FormTodo } from "./Components/FormTodo";
import { TodoList } from "./Components/TodoList";
import { Footer } from "./Components/Footer";
import "./styles/App.scss";

const App: React.FC = () => {
  const [lists, setLists] = useState({
    todos: [{} as TodoListModel],
  });

  const apiRequest = (): Promise<TodoListModel[]> =>
    fetch("http://localhost:3001/todolist")
      .then((res) => res.json())
      .catch((err) => {
        alert("Could not get date.");
      });

  const fetchTodos = async () => {
    const todos = await apiRequest();
    setLists({ todos: [...todos] });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodoHandler = (newItem: string) => {
    fetch("http://localhost:3001/todolist", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Math.random().toString(),
        text: newItem,
        isDone: false,
      }),
    }).then(fetchTodos.bind(this));
  };

  const onDeleteHandler = (todoId: string) => {
    fetch(`http://localhost:3001/todolist/${todoId}`, {
      method: "DELETE",
    }).then(fetchTodos.bind(this));
  };

  const onCheckHandler = (todo: TodoListModel) => {
    fetch(`http://localhost:3001/todolist/${todo.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: todo.id,
        text: todo.text,
        isDone: !todo.isDone,
      }),
    }).then(fetchTodos.bind(this));
  };

  return (
    <div className="App">
      <main>
        <div className="inner">
          <FormTodo onAddTodo={addTodoHandler} />
          <TodoList
            todos={lists.todos}
            onDeleteTodo={onDeleteHandler}
            onCheckTodo={onCheckHandler}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
