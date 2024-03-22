'use client'

import { useState } from 'react'

import { addTodo } from '@/app/tasks/actions'

import { InputForm } from './inputForm'
import TodoList from './todoList'

export function TodoForm({ user, todos }: { user: Users; todos: Todos[] }) {
  const [todosList, setTodosList] = useState<Todos[]>(todos)

  const addTodoItem = async (taskText: string, user: Users) => {
    try {
      const newTodo = await addTodo(taskText, user) // Assuming addTodo returns the new todo
      if (newTodo) {
        setTodosList((prevTodos) => [...prevTodos, newTodo])
      } else {
        console.error('addTodo returned undefined')
      }
    } catch (error) {
      console.error('Failed to add todo:', error)
    }
  }

  return (
    <div className="flex flex-col gap-y-10">
      <InputForm user={user} addTodoItem={addTodoItem} />
      <TodoList todos={todosList} user={user} />
    </div>
  )
}
