import React, { useRef } from "react";
import "../styles/FormTodo.scss"

interface FormTodoProps {
  onAddTodo: (newItem: string) => void;
}

export const FormTodo: React.FC<FormTodoProps> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = textInputRef.current!.value;
    props.onAddTodo(enteredText);
    textInputRef.current!.value = "";
  };

  return (
    <>
      <form onSubmit={todoSubmitHandler} className="todoForm">
        <input
          type="text"
          ref={textInputRef}
          className="todoInput"
        />
        <label htmlFor="input" className="inputLabel">タスクを入力してください</label>
        <button type="submit" className="inputBtn">追加</button>
      </form>
    </>
  );
};
