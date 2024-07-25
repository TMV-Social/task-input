import Link from 'next/link'

import { createClient } from '@/utils/supabase/server'

import AuthButton from '../components/AuthButton'

const MenuComponent = () => {
  const menuItems = [
    { name: 'Projects', path: '/projects' },
    { name: 'Tasks', path: '/tasks' },
  ]

  return (
    <nav>
      <ul className="flex w-full flex-row items-center gap-16 md:justify-end">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link href={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function Header() {
  const canInitSupabaseClient = () => {
    try {
      createClient()
      return true
    } catch (e) {
      return false
    }
  }

  const isSupabaseConnected = canInitSupabaseClient()

  return (
    <nav className="container mx-auto h-16 items-end border-b border-b-foreground/10 p-5 print:hidden">
      <ul className="flex w-full flex-col items-center md:flex-row md:justify-end md:gap-16">
        <MenuComponent />
        <li className="max-w-2xl text-sm">
          {isSupabaseConnected && <AuthButton />}
        </li>
      </ul>
    </nav>
  )
}
