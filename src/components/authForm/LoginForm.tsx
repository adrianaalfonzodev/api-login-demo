'use client'

import {
  authStart,
  authSuccess,
  authFailure
} from '@/lib/features/auth/authSlice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { loginUser } from '@/lib/features/auth/auth'
import AppInput from '../ui/Input'
import Image from 'next/image'
import Link from 'next/link'

const LoginForm = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(authStart())

    try {
      const user = await loginUser(email, password)
      dispatch(authSuccess(user))
      router.push('/dashboard')
      toast.success('Inicio de sesión exitoso')
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message)
        dispatch(authFailure(err.message))
      } else {
        toast.error('Error desconocido')
        dispatch(authFailure('Error desconocido'))
      }
    }
  }

  return (
    <div className="flex flex-col gap-4 md:p-4 relative lg:w-[540px] w-full">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 relative w-full"
      >
        <AppInput
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Correo electrónico"
          required
        />

        <AppInput
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Contraseña"
          required
        />

        <a
          href="#"
          className="text-xs mb-6 text-[#E89B4C]"
        >
          ¿Olvidaste la contraseña?
        </a>

        <button
          type="submit"
          className="button"
        >
          Iniciar sesión
        </button>
      </form>
      <div className="flex items-center my-2">
        <hr className="flex-grow-1 text-gray-300" />
        <span className="mx-2 text-2 text-muted">O</span>
        <hr className="flex-grow-1 text-gray-300" />
      </div>

      <button className="social-button relative w-full">
        <div className="w-6 h-6 absolute">
          <Image
            src="/icons/Google_Favicon_2025.png"
            alt="logo"
            fill={true}
          />
        </div>
        <span className="flex-1">Continuar con google</span>
      </button>

      <p className="text-center text-sm mt-6">
        ¿No tienes cuenta?{' '}
        <Link
          href="/register"
          className="text-[#E89B4C]"
        >
          Crear una cuenta
        </Link>
      </p>
    </div>
  )
}

export default LoginForm
