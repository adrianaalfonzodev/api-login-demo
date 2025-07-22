import { supabase } from '@/lib/api'

export async function loginUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

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

export async function registerUser(
  email: string,
  password: string,
  name: string,
  phone: string
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        phone
      }
    }
  })

  if (error) {
    const customMessage = mapSupabaseRegisterError(error.message)
    throw new Error(customMessage)
  }

  return data.user
}

function mapSupabaseRegisterError(message: string): string {
  if (message.includes('User already registered')) {
    return 'Este correo ya está registrado'
  }

  if (message.includes('Password should be at least')) {
    return 'La contraseña es demasiado corta'
  }

  return 'Ocurrió un error al crear la cuenta'
}
