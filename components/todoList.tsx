import { Todo } from './todo'

export default function TodoList({
  todos,
  user,
  enableTimer,
}: {
  todos: Todos[]
  user: Users
  enableTimer: boolean
}) {
  return (
    <ul className="flex list-none flex-col">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} user={user} enableTimer={enableTimer} />
      ))}
    </ul>
  )
}
