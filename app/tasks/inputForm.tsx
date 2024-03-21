'use client'
import { useState } from 'react'

import { addTodo } from './actions'

export function InputForm({
  user,
  addTodoItem,
}: {
  user: any
  addTodoItem: (taskText: string, user: any) => Promise<void>
}) {
  const [taskText, setTaskText] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (taskText.trim().length) {
      await addTodoItem(taskText, user)
      setTaskText('') // Clear the input field on successful submission
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
