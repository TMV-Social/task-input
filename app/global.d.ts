import { Database as DB } from '@/utils/supabase/database.types'

declare global {
  type Database = DB
  type Todos = Database['public']['Tables']['todos']['Row']
  type Users = Database['public']['Tables']['users']['Row']
}
