import { Todo } from './todo'

export default function TodoList({
  todos,
  user,
}: {
  todos: Todos[]
  user: Users
}) {
  return (
    <ul className="flex list-none flex-col">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} user={user} />
      ))}
    </ul>
  )
}
