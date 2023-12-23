import React from 'react'
import '../styles/App.css'
const Todoitems = ({title , description , isCompleted , updateHandler , deleteHandler , id}) => {
  return (
    <div className="todo-item">
      <div className="temp">
        <div className="todotitle">
          <h3>{title}</h3>
        </div>
        <div>
          <p>{description}</p>
        </div>
      </div>
      <div className="updt">
        <div>
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => updateHandler(id)}
            className="toggleCompleted"
          />
        </div>
        <div>
          <button className="delete-btn" onClick={() => deleteHandler(id)}>
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Todoitems

