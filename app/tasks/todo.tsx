'use client'

import { useState } from 'react'

import { toggleTodo } from './actions'

export function Todo({
  todo,
  user,
  index,
}: {
  todo: Todos
  user: any
  index: number
}) {
  const [isChecked, setIsChecked] = useState(todo.is_complete)

  const handleToggle = async (todo: any, user: any) => {
    setIsChecked(!isChecked) // Optimistically toggle the checkbox
    try {
      await toggleTodo(todo, user)
    } catch (error) {
      setIsChecked(isChecked) // If the toggle fails, revert the checkbox
      console.error('Failed to toggle todo:', error)
    }
  }

  return (
    <li key={index} className='mb-2 flex items-center'>
      <input
        type='checkbox'
        id={`todo-${index}`}
        className='mr-2'
        checked={isChecked === null ? undefined : isChecked}
        onChange={() => handleToggle(todo, user)}
      />
      <label
        htmlFor={`todo-${index}`}
        className={isChecked ? 'line-through' : ''}
      >
        {todo.task}
      </label>
    </li>
  )
}
