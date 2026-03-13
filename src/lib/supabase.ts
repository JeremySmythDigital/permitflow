import { createClient, SupabaseClient } from '@supabase/supabase-js'

const getSupabaseUrl = () => process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const getSupabaseAnonKey = () => process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

let _supabase: SupabaseClient | null = null

export const supabase = new Proxy({} as SupabaseClient, {
  get(target, prop) {
    if (!_supabase) {
      _supabase = createClient(getSupabaseUrl(), getSupabaseAnonKey())
    }
    const val = _supabase[prop as keyof SupabaseClient]
    if (typeof val === 'function') {
      return val.bind(_supabase)
    }
    return val
  }
})

// Server-side admin client (use in API routes)
export const createServerClient = () => {
  return createClient(
    getSupabaseUrl(),
    process.env.SUPABASE_SERVICE_ROLE_KEY || getSupabaseAnonKey()
  )
}