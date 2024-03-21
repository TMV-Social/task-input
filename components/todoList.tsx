import { Todo } from './todo'

export default function TodoList({
  todos,
  user,
}: {
  todos: Todos[]
  user: Users
}) {
  return (
    <ul className='list-none flex flex-col'>
      {todos.map((todo, index) => (
        <Todo key={index} todo={todo} index={index} user={user} />
      ))}
    </ul>
  )
}
