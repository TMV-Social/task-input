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
    <nav className='container mx-auto px-5 flex flex-col gap-16 items-end border-b border-b-foreground/10 h-16'>
      <div className='max-w-2xl p-3 text-sm'>
        {isSupabaseConnected && <AuthButton />}
      </div>
    </nav>
  )
}
