import { supabase } from '@/lib/api'

export async function loginUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    const customMessage = mapSupabaseError(error.message)
    throw new Error(customMessage)
  }

  return data.user
}

function mapSupabaseError(message: string): string {
  if (message.includes('Invalid login credentials')) {
    return 'Correo o contraseña incorrectos'
  }

  return 'Ocurrió un error al iniciar sesión'
}