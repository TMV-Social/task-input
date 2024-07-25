'use server'

import { createClient } from '@/utils/supabase/server'

export async function getProjectList(user: any) {
  const supabase = createClient()

  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching projects:', error)
    throw error
  }

  return projects
}

export async function getProjectDetails(projectId: number) {
  const supabase = createClient()

  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single()

  if (error) {
    console.error('Error fetching project details:', error)
    throw error
  }

  return project
}

export async function getProjectSteps(projectId: number) {
  const supabase = createClient()

  const { data: steps, error } = await supabase
    .from('steps')
    .select('*')
    .eq('project_id', projectId)
    .order('id', { ascending: false })

  if (error) {
    console.error('Error fetching project steps:', error)
    throw error
  }

  return steps
}

export async function getProjectEntries(projectId: number) {
  const supabase = createClient()

  const { data: entries, error } = await supabase
    .from('entries')
    .select('content, id, steps (id, name)')
    .eq('project_id', projectId)
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching project entries:', error)
    throw error
  }

  return entries
}