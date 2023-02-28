import React from 'react'

export const TodoStatus = ({title,status,id,changeStatus}) => {
  return (
    <div className='todo-status-wraper'>
        <div className='todo-info'>
            {status? <p className='status done'>Completed</p>
            :<p className='status pending'>Pending</p>}
            <p className='todo-title'>{title}</p>
        </div>
        <button className={`btn done-btn ${!!status?'disabled-btn':''}`} disabled={!!status} onClick={()=>changeStatus(id)}>Mark as Done</button>
    </div>
  )
}
