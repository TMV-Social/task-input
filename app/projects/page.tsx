import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { createClient } from '@/utils/supabase/server'

import { getProjectList } from './actions'

export default async function Project() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }
  const user = data.user

  const projects = await getProjectList(user)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ul>
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="block"
          >
            <div className="flex items-start justify-between rounded-lg border p-4 shadow-md hover:bg-gray-900">
              <div>
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <p>{project.description}</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <button className="text-gray-400 hover:text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 15l-6-6-6 6"
                    />
                  </svg>
                </button>
                <span className="text-sm font-semibold">0</span>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 9l6 6 6-6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </Suspense>
  )
}
