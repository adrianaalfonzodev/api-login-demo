import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function fetchLatestLaunch() {
  const res = await fetch('https://api.spacexdata.com/v4/launches/latest')
  if (!res.ok) throw new Error('Error fetching SpaceX launch')
  return res.json()
}
