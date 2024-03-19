'use server'

import { createClient } from '@/utils/supabase/server'

export async function getAuthenticatedUser() {
  const supabase = createClient()
  const userResponse = await supabase.auth.getUser()

  if (!userResponse.data.user) {
    throw new Error('User is not authenticated')
  }

  return userResponse.data.user
}

export async function getTodoList(user: any) {
  const supabase = createClient()

  const { data: todos, error } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', user.id)
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching todos:', error)
    throw error
  }

  return todos
}

export async function addTodo(taskText: string, user: any) {
  const supabase = createClient()
  let task = taskText.trim()
  if (task.length) {
    const { data: todo, error } = await supabase
      .from('todos')
      .insert({ task, user_id: user.id })
      .select()
      .single()

    if (error) throw error

    return todo
  }
}

export async function toggleTodo(todo: Todos, user: any) {
  const supabase = createClient()
  const isCompleted = todo.is_complete

  try {
    const { data, error } = await supabase
      .from('todos')
      .update({ is_complete: !isCompleted })
      .eq('id', todo.id)
      .eq('user_id', user.id)
      .throwOnError()
      .select()
      .single()

    if (error) throw error

    return data?.is_complete
  } catch (error) {
    throw error
  }
}
