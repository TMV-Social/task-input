'use client'

import Script from 'next/script'
import { useState } from 'react'

import { addTodo } from './actions'
import { InputForm } from './inputForm'
import TodoList from './todoList'

export function TodoForm({
  user,
  currentTodos,
}: {
  user: Users
  currentTodos: Todos[]
}) {
  const [todos, setTodos] = useState<Todos[]>(currentTodos)

  const addTodoItem = async (taskText: string, user: Users) => {
    try {
      const newTodo = await addTodo(taskText, user) // Assuming addTodo returns the new todo
      if (newTodo) {
        setTodos((prevTodos) => [...prevTodos, newTodo])
      } else {
        console.error('addTodo returned undefined')
      }
    } catch (error) {
      console.error('Failed to add todo:', error)
    }
  }

  return (
    <>
      <InputForm user={user} addTodoItem={addTodoItem} />
      <TodoList todos={todos} user={user} />
    </>
  )
}
