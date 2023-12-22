import React from 'react'

const Todoitems = ({title , description , isCompleted , updateHandler , deleteHandler , id}) => {
  return (
    <div className="todo">
      <div>
        <h3 className='todoItems'>{title}</h3>
        <p>{description}</p>
      </div>
      <div>
        <input type="checkbox" checked={isCompleted} onChange={() => updateHandler(id)}/>
        <button className="btn" onClick={() => deleteHandler(id)}>DELETE</button>
      </div>
    </div>
  );
}

export default Todoitems

