'use client'
import { useState } from 'react'

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
    <form onSubmit={handleSubmit} className='w-full flex mx-auto gap-x-1'>
      <input
        type='text'
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder='Enter a task'
        className='w-full rounded-sm basis-4/5 bg-transparent border-b'
      />
      <button
        className='bg-gray-800 p-2 rounded-sm hover:bg-gray-900 basis-1/5'
        type='submit'
      >
        Add
      </button>
    </form>
  )
}
