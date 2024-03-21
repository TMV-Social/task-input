'use client'
import { ClockIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'

import { toggleTodo } from './actions'

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
    }
  }, [todo])

  return (
    <li
      id={`${todo.id}`}
      key={index}
      className='mb-2 flex items-center justify-start'
    >
      <input
        type='checkbox'
        id={`todo-${index}`}
        className='mr-2'
        checked={isChecked === null ? undefined : isChecked}
        onChange={() => handleToggle(todo, user)}
      />
      <label
        htmlFor={`todo-${index}`}
        className={isChecked ? 'line-through' : ''}
      >
        {todo.task}
      </label>
      <div
        ref={timerRef}
        id={`todo-${index}`}
        className='harvest-timer w-4 h-4 ml-2 cursor-pointer'
        data-item={`{"id":${todo.id},"name":"${todo.task}"}`}
        data-permalink={`{"https://task-input-tmv.vercel.app/tasks#${todo.id}"}`}
      >
        <ClockIcon />
      </div>
    </li>
  )
}
