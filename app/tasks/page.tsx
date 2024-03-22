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
    <div className="mt-20 flex flex-1 flex-col items-center gap-y-20 px-4">
      <TodoForm user={user} todos={todos} />
    </div>
  )
}
