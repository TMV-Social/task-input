'use client'
import { ClockIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'

import { toggleTodo } from '@/app/tasks/actions'

export function Todo({ todo, user }: { todo: Todos; user: Users }) {
  const [isChecked, setIsChecked] = useState(todo.is_complete)
  const timerRef = useRef(null) // Create a ref

  const handleToggle = async (todo: Todos, user: Users) => {
    setIsChecked(!isChecked) // Optimistically toggle the checkbox
    try {
      await toggleTodo(todo, user)
    } catch (error) {
      setIsChecked(isChecked) // If the toggle fails, revert the checkbox
      console.error('Failed to toggle todo:', error)
    }
  }

  // useEffect hook for when Harvest Buttons are ready
  useEffect(() => {
    const handleHarvestReady = () => {
      const event = new CustomEvent('harvest-event:timers:add', {
        detail: { element: timerRef.current },
      })
      const harvestMessaging = document.querySelector('#harvest-messaging')
      if (harvestMessaging) {
        harvestMessaging.dispatchEvent(event)
      } else {
        console.error('Element #harvest-messaging not found')
        // Try again in 1 second
        setTimeout(handleHarvestReady, 1000)
      }
    }

    document.body.addEventListener('harvest-event:ready', handleHarvestReady)

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      document.body.removeEventListener(
        'harvest-event:ready',
        handleHarvestReady,
      )
    }
  }, [todo.id])

  // useEffect hook for when a new todo is added
  useEffect(() => {
    const event = new CustomEvent('harvest-event:timers:add', {
      detail: { element: timerRef.current },
    })
    const harvestMessaging = document.querySelector('#harvest-messaging')
    if (harvestMessaging) {
      harvestMessaging.dispatchEvent(event)
    } else {
      console.error('Element #harvest-messaging not found')
      // Try again in 1 second
      setTimeout(() => {
        const harvestMessagingRetry =
          document.querySelector('#harvest-messaging')
        if (harvestMessagingRetry) {
          harvestMessagingRetry.dispatchEvent(event)
        }
      }, 1000)
    }
  }, [todo])

  return (
    <li
      id={`${todo.id}`}
      className="group flex w-full items-center justify-start gap-x-4 border-b py-4 md:w-[65ch]"
    >
      <div className="relative">
        <input
          type="checkbox"
          id={`todo-${todo.id}`}
          className="peer relative h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-full border-2 checked:border-0 checked:bg-gray-800"
          checked={isChecked === null ? undefined : isChecked}
          onChange={() => handleToggle(todo, user)}
        />
        <svg
          className="pointer-events-none absolute left-1/2 top-1/2 hidden h-4 w-4 -translate-x-1/2 -translate-y-2/3 transform text-gray-500 peer-checked:block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <label
        htmlFor={`todo-${todo.id}`}
        className={`w-full text-left ${isChecked ? 'text-gray-500 line-through' : ''}`}
      >
        {todo.task}
      </label>

      <div
        ref={timerRef}
        id={`todo-${todo.id}`}
        className="harvest-timer ml-2 cursor-pointer"
        data-item={`{"id":${todo.id},"name":"${todo.task}"}`}
        data-permalink={`{"https://task-input-tmv.vercel.app/tasks#${todo.id}"}`}
      >
        <ClockIcon className="h-5 w-5 group-hover:text-gray-400 md:text-transparent" />
      </div>
    </li>
  )
}
