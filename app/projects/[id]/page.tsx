import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import createMarkup from '@/utils/createMarkup'
import { createClient } from '@/utils/supabase/server'

import {
  getProjectDetails,
  getProjectEntries,
  getProjectSteps,
} from '../actions'

function ProjectEntries({ entries }: { entries: any[] }) {
  return (
    <div>
      {entries.map((entry) => (
        <div id={`step-${entry.steps.id}`} key={entry.id}>
          <h4>{entry.steps.name}</h4>
          {/* Directly insert the list items into the DOM */}
          <ul dangerouslySetInnerHTML={createMarkup(entry.content)}></ul>
        </div>
      ))}
    </div>
  )
}

export default async function Project({ params }: { params: { id: any } }) {
  const projectId = params.id
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  const project = await getProjectDetails(projectId)
  const steps = await getProjectSteps(projectId)
  const entries = await getProjectEntries(projectId)

  return (
    <div className="prose dark:prose-invert">
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <h1 className="text-lg font-semibold">{project.name}</h1>
          <p>{project.description}</p>
        </div>
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex-row gap-2">
          <h4>Outline</h4>
          <ol>
            {steps.map((step) => (
              <li key={step.id}>
                {/* Use an anchor tag with href pointing to the id */}
                <a href={`#step-${step.id}`}>{step.name}</a>
              </li>
            ))}
          </ol>
        </div>
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectEntries entries={entries} />
      </Suspense>
    </div>
  )
}
