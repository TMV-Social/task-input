'use client'
import { useState } from 'react'

import { addTodo } from './actions'

export function InputForm(user: any) {
  const [taskText, setTaskText] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (taskText.trim().length) {
      try {
        await addTodo(taskText, user)
        setTaskText('') // Clear the input field on successful submission
      } catch (error) {
        console.error('Failed to add todo:', error)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder='Enter a task'
      />
      <button type='submit'>Add Todo</button>
    </form>
  )
}
