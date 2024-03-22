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
    <form onSubmit={handleSubmit} className="mx-auto flex gap-x-1">
      <input
        type="text"
        name="todoForm"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter a task"
        className="w-full basis-4/5 rounded-sm border-b border-gray-500 bg-transparent px-4"
      />
      <button
        className={`basis-1/5 rounded-sm p-2 ${taskText.trim().length ? 'bg-blue-900 hover:bg-blue-900/90' : 'pointer-events-none bg-blue-800/45 text-white/45'}`}
        type="submit"
      >
        Add
      </button>
    </form>
  )
}
