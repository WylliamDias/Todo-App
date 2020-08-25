import React, { useState, useRef, useEffect } from 'react';

import { 
  AiOutlineCheck,
  AiOutlineDelete,
  AiOutlineEdit,
} from 'react-icons/ai';

import './styles.css';

function Task(props) {
  const [isSelected, setIsSelected] = useState(props.isComplete);
  const [canEdit, setCanEdit] = useState(false);
  const [inputTitle, setInputTitle] = useState(props.title);

  const todoRef = useRef({ taskID: props.taskID });

  const taskRef = useRef('');

  function handleChangeCheckBox() {
    setIsSelected(!isSelected);
    props.taskWasSelected(todoRef);
  }

  function whenUserEndTheEdit(event) {
    if (event.key === 'Enter') {
      setCanEdit(!canEdit);
      props.editTask(todoRef, inputTitle);
    }
  }

  function deleteCurrentTask() {
    const canDeleteTodo = window.confirm('Deseja realmente excluir esta tarefa?');
    if (canDeleteTodo)
      props.removeTask(todoRef, taskRef);
  }

  useEffect(() => {
    setInputTitle(props.title);
  }, [props.title]);

  useEffect(() => {
    if (isSelected) {
      const checkboxInput = document.querySelector('input[type=checkbox]')
      checkboxInput.checked = isSelected;
    }
  }, [isSelected]);

  return (
    <div ref={taskRef} className={`task-container ${isSelected ? 'complete' : ''}`}>
      <div className="task-title-container">
        <div className="task-check">
          <input 
            type="checkbox" 
            value={isSelected}
            onChange={handleChangeCheckBox}
          />
          <div>
            <AiOutlineCheck />
          </div>
        </div>
        <h1 className="task-title">
          {inputTitle}
          <input 
            type="text" 
            className="task-title-edit"
            style={{display: canEdit ? 'block' : 'none'}}
            value={inputTitle}
            onChange={event => setInputTitle(event.target.value)}
            onKeyPress={whenUserEndTheEdit}
          />
        </h1>
      </div>
      <div className="task-actions">
        <div id="edit-icon" className="action">
          <button
            onClick={() => setCanEdit(!canEdit)}
          >
            <AiOutlineEdit />
          </button>
        </div>
        <div id="delete-icon" className="action">
          <button onClick={deleteCurrentTask}>
            <AiOutlineDelete />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Task;
