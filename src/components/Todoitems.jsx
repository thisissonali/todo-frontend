import React from 'react'
import '../styles/App.css'
const Todoitems = ({title , description , isCompleted , updateHandler , deleteHandler , id}) => {
  return (
    <div className="todo">
      <div>
        <h3 className='todoItems'>{title}</h3>
        <p>{description}</p>
      </div>
      <div className='updt'>
        <input type="checkbox" checked={isCompleted} onChange={() => updateHandler(id)}/>
        <button className="delete-btn" onClick={() => deleteHandler(id)}>DELETE</button>
      </div>
    </div>
  );
}

export default Todoitems

