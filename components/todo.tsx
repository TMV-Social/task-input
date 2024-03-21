'use client'
import { ClockIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'

import { toggleTodo } from '@/app/tasks/actions'

export function Todo({
  todo,
  user,
  index,
}: {
  todo: Todos
  user: Users
  index: number
}) {
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
        handleHarvestReady
      )
    }
  }, [index])

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
      key={index}
      className='flex items-center justify-start gap-x-4 group max-w-[65ch] py-4 border-b'
    >
      <div className='relative'>
        <input
          type='checkbox'
          id={`todo-${index}`}
          className='w-5 h-5 border-2 cursor-pointer rounded-full appearance-none checked:bg-gray-800 checked:border-0 relative peer shrink-0'
          checked={isChecked === null ? undefined : isChecked}
          onChange={() => handleToggle(todo, user)}
        />
        <svg
          className='absolute w-4 h-4 hidden peer-checked:block pointer-events-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='4'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <polyline points='20 6 9 17 4 12'></polyline>
        </svg>
      </div>
      <label
        htmlFor={`todo-${index}`}
        className={`text-left w-full ${isChecked ? 'line-through' : ''}`}
      >
        {todo.task}
      </label>

      <div
        ref={timerRef}
        id={`todo-${index}`}
        className='harvest-timer ml-2 cursor-pointer'
        data-item={`{"id":${todo.id},"name":"${todo.task}"}`}
        data-permalink={`{"https://task-input-tmv.vercel.app/tasks#${todo.id}"}`}
      >
        <ClockIcon className='w-5 h-5 text-transparent group-hover:text-gray-400' />
      </div>
    </li>
  )
}
