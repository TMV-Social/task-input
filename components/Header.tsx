import { createClient } from '@/utils/supabase/server'

import AuthButton from '../components/AuthButton'

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
    <nav className="container mx-auto flex h-16 flex-col items-end gap-16 border-b border-b-foreground/10 px-5">
      <div className="max-w-2xl p-3 text-sm">
        {isSupabaseConnected && <AuthButton />}
      </div>
    </nav>
  )
}
