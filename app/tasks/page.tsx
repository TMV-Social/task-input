import { redirect } from 'next/navigation'

import { TodoForm } from '@/components/TodoForm'
import { createClient } from '@/utils/supabase/server'

import { getTodoList } from './actions'

export default async function Task() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }
  const user = data.user

  const todos = await getTodoList(user)

  return (
    <div className='container px-4 gap-y-20 flex-1 w-full flex flex-col items-center'>
      <TodoForm user={user} currentTodos={todos} />
    </div>
  )
}
