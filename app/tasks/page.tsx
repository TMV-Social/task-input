import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

import { getTodoList } from './actions'
import { TodoForm } from './TodoForm'

export default async function Task() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }
  const user = data.user

  const todos = await getTodoList(user)

  return (
    <div className='flex-1 w-full flex flex-col gap-20 items-center'>
      <TodoForm user={user} currentTodos={todos} />
    </div>
  )
}
