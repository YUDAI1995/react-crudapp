import { TodoListModel } from "../Model/todolist.model";
import "../styles/TodoList.scss";

interface TodoListProps {
  todos: TodoListModel[];
  onDeleteTodo: (id: string) => void;
  onCheckTodo: (todo: TodoListModel) => void;
}

export const TodoList: React.FC<TodoListProps> = (props) => {
  return (
    <ul className="todoList">
      {props.todos.map((todo) => {
        return (
          <li key={todo.id} className="todo">
            <div onClick={props.onCheckTodo.bind(this, todo)} className="todoInner">
              <input type="checkbox" checked={todo.isDone} />
              <p>{todo.text}</p>
            </div>
            <button onClick={props.onDeleteTodo.bind(this, todo.id)} className="deleteBtn">
              削除
            </button>
          </li>
        );
      })}
    </ul>
  );
};
