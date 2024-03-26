'use client'
import { useState } from 'react'

import TodoList from './todoList'

export default function CompletedTodoList({
  completedTodos,
  user,
}: {
  completedTodos: Todos[]
  user: Users
}) {
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <div className="mt-20 flex flex-1 flex-col">
      <button onClick={() => setIsCollapsed(!isCollapsed)}>
        Show/Hide Completed Todos
      </button>
      {!isCollapsed && (
        <TodoList todos={completedTodos} user={user} enableTimer={false} />
      )}
    </div>
  )
}
