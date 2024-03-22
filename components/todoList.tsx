import Script from 'next/script'

import { Todo } from './todo'

export default function TodoList({
  todos,
  user,
}: {
  todos: Todos[]
  user: Users
}) {
  return (
    <>
      <Script id="harvest" strategy="afterInteractive">
        {`
        window._harvestPlatformConfig = {
          "applicationName": "TMV Social",
          "skipStyling": true
        };
      `}
      </Script>
      <Script
        src="https://platform.harvestapp.com/assets/platform.js"
        strategy="afterInteractive"
        async
      />
      <ul className="flex list-none flex-col">
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} user={user} />
        ))}
      </ul>
    </>
  )
}
