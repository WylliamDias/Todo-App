import React, { useState, useEffect } from 'react';

import Task from '../../components/Task';

import './styles.css';

function Home() {
  const [allTodos, setAllTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  const [todoAddInput, setTodoAddInput] = useState('');
  
  function removeTask(task) {

    const arrayTeste = allTodos.filter(item => {
      if (item.id === task.current.taskID)
        return false;
      return true;
    });

    const arrayAcertado = arrayTeste.map((todo, index) => {
      return {
        ...todo,
        id: index
      };
    });

    setAllTodos(arrayAcertado);

  }

  function editTask(task, newTitle) {
    const newTodoList = allTodos.map(element => {
      if (element.id === task.current.taskID) 
        element.title = newTitle;
      return element;
    });

    setAllTodos(newTodoList);
  }

  function taskWasSelected(task) {

    const newTodoList = allTodos.map(element => {
      if (element.id === task.current.taskID) 
        element.isComplete = !element.isComplete;
      return element;
    });

    setAllTodos(newTodoList);
  }

  function handleAddNewTodo(event) {
    event.preventDefault();
    setAllTodos([
      ...allTodos, 
      { 
        id: allTodos.length, 
        title:  todoAddInput,
        isComplete: false
      }
    ]);
    setTodoAddInput('');
  }

  useEffect(() => {
    if (allTodos.length) {
      localStorage.setItem('todos', JSON.stringify(allTodos));
    }
  }, [allTodos]);

  return (
    <main id="home-main">
      <div className="todo-container">
        <form onSubmit={handleAddNewTodo} className="todo-input">
          <label htmlFor="add-todo">
            Adicionar um To-do
          </label>
          <input 
            value={todoAddInput}
            onChange={event => setTodoAddInput(event.target.value)}
            id="add-todo"
            placeholder="Alguma nova atividade?"
            type="text"
          />
        </form>
        <ul className="todo-list">
          {
            allTodos.map((todo, index)=> {
              return (
                <Task 
                  key={index} 
                  taskWasSelected={taskWasSelected} 
                  editTask={editTask} 
                  removeTask={removeTask} 
                  taskID={index} 
                  title={todo.title} 
                  isComplete={todo.isComplete}
                />
              )    
            })
          }
        </ul>
      </div>
    </main>
  );
}

export default Home;
