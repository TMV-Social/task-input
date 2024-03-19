import { getAuthenticatedUser, getTodoList } from './actions'
import { InputForm } from './inputForm'
import { Todo } from './todo'

export default async function Task() {
  const user = await getAuthenticatedUser()
  const todoList = await getTodoList(user)

  return (
    <div className='flex-1 w-full flex flex-col gap-20 items-center'>
      <InputForm />
      <ul className='list-none'>
        {todoList.map((todo, index) => (
          <Todo key={index} todo={todo} index={index} user={user} />
        ))}
      </ul>
    </div>
  )
}
