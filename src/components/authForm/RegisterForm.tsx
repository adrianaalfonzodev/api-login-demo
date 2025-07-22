'use client'
import {
  authStart,
  authSuccess,
  authFailure
} from '@/lib/features/auth/authSlice'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { registerUser } from '@/lib/features/auth/auth'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import AppInput from '../ui/Input'
import Image from 'next/image'
import Link from 'next/link'
import AppCheckbox from '../ui/CheckBox'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state: RootState) => state.auth.loading)
  const router = useRouter()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(authStart())
    e.preventDefault()
    try {
      const user = await registerUser(email, password, name, phone)
      dispatch(authSuccess(user))
      toast.success('Registro exitoso')
      router.push('/dashboard/home')
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message)
        dispatch(authFailure(err.message))
      }
    }
  }

  const handleGoogleRegister = () => {
    toast.info('Funcionalidad de registro con Google aún no implementada')
  }

  return (
    <div className="flex flex-col gap-4 md:p-4 relative lg:w-[540px] w-full">
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4 relative w-full"
      >
        <AppInput
          type="text"
          value={name}
          onChange={setName}
          placeholder="Nombre"
          required
        />
        <AppInput
          type="text"
          value={phone}
          onChange={setPhone}
          placeholder="Teléfono"
          required
        />
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

        <AppCheckbox
          label="Acepto los términos y condiciones"
          checked={termsAccepted}
          onChange={setTermsAccepted}
          required
        />

        <button
          type="submit"
          className={`button transition-opacity duration-200 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          Registrarse
        </button>
      </form>
      <div className="flex items-center my-2">
        <hr className="flex-grow-1 text-gray-300" />
        <span className="mx-2 text-2 text-muted">O</span>
        <hr className="flex-grow-1 text-gray-300" />
      </div>

      <button
        className="social-button relative w-full"
        onClick={handleGoogleRegister}
      >
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
        ¿Ya tienes una cuenta?{' '}
        <Link
          href="/login"
          className="text-[#E89B4C]"
        >
          Iniciar sesión
        </Link>
      </p>
    </div>
  )
}

export default RegisterForm
